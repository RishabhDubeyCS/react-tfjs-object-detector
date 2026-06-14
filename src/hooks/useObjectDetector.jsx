import { useState, useEffect, useRef, useCallback } from 'react';

export const useObjectDetector = (initialConfig = {}) => {
  const [model, setModel] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRunning, setIsRunning] = useState(true);
  
  // Settings
  const [threshold, setThreshold] = useState(initialConfig.threshold || 0.60);
  const thresholdRef = useRef(threshold);

  const requestRef = useRef();
  const videoRef = useRef(null);

  // Keep ref in sync for the animation frame loop without triggering re-renders
  useEffect(() => {
    thresholdRef.current = threshold;
  }, [threshold]);

  useEffect(() => {
    const loadModel = async () => {
      setIsLoading(true);
      try {
        // Dynamically import TFJS to code-split and reduce main bundle size
        await import('@tensorflow/tfjs');
        const cocoSsd = await import('@tensorflow-models/coco-ssd');
        
        const loadedModel = await cocoSsd.load({ base: 'mobilenet_v2' });
        setModel(loadedModel);
      } catch (err) {
        console.error("Failed to load COCO-SSD model", err);
        setError("Failed to load AI model. Please check your internet connection.");
      } finally {
        setIsLoading(false);
      }
    };
    loadModel();
  }, []);

  const runDetection = useCallback(async () => {
    const video = videoRef.current;
    if (!video || !isRunning) {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      return;
    }

    if (model && video.readyState === 4) {
      try {
        const results = await model.detect(video, 20, thresholdRef.current);
        setPredictions(results);
      } catch (err) {
        console.error("Detection error:", err);
      }
    }

    requestRef.current = requestAnimationFrame(runDetection);
  }, [model, isRunning]);

  const startDetection = useCallback((videoElement) => {
    if (videoElement) {
      videoRef.current = videoElement;
    }
    setIsRunning(true);
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    requestRef.current = requestAnimationFrame(runDetection);
  }, [runDetection]);

  const stopDetection = useCallback(() => {
    setIsRunning(false);
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = null;
    }
  }, []);

  // Handle active state changes
  useEffect(() => {
    if (isRunning) {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      requestRef.current = requestAnimationFrame(runDetection);
    } else {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isRunning, runDetection]);

  return { 
    model, 
    predictions, 
    startDetection, 
    stopDetection, 
    isLoading, 
    error,
    isRunning,
    threshold,
    setThreshold
  };
};