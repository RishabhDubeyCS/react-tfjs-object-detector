import { useState, useEffect, useRef } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';

export const useObjectDetector = () => {
  const [model, setModel] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const requestRef = useRef();

  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await cocoSsd.load();
      setModel(loadedModel);
    };
    loadModel();
  }, []);

  const detect = async (video) => {
    if (model && video.readyState === 4) {
      const predictions = await model.detect(video);
      setPredictions(predictions);
    }
    requestRef.current = requestAnimationFrame(() => detect(video));
  };

  return { model, predictions, detect, requestRef };
};