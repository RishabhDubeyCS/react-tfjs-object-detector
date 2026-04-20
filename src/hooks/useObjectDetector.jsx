import { useState, useEffect, useRef, useCallback } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';

export const useObjectDetector = () => {
  const [model, setModel] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const requestRef = useRef();
  const videoRef = useRef(null);

  useEffect(() => {
    const loadModel = async () => {
      setIsLoading(true);
      try {
        // Use 'mobilenet_v2' for higher accuracy compared to the default 'lite_mobilenet_v2'
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
    if (!video) return;

    if (model && video.readyState === 4) {
      try {
        // maxNumBoxes = 20, minScore = 0.60 (default is 0.50)
        // Increasing minScore filters out low confidence 'ghost' predictions
        const results = await model.detect(video, 20, 0.60);
        setPredictions(results);
      } catch (err) {
        console.error("Detection error:", err);
      }
    }

    requestRef.current = requestAnimationFrame(runDetection);
  }, [model]);

  const startDetection = useCallback((videoElement) => {
    videoRef.current = videoElement;
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    requestRef.current = requestAnimationFrame(runDetection);
  }, [runDetection]);

  const stopDetection = useCallback(() => {
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = null;
    }
    videoRef.current = null;
  }, []);

  useEffect(() => {
    return () => stopDetection();
  }, [stopDetection]);

  return { model, predictions, startDetection, stopDetection, isLoading, error };
};