import React, { useRef, useEffect, useState, useCallback } from "react";
import Webcam from "react-webcam";
import { useObjectDetector } from "./hooks/useObjectDetector";
import { drawRect } from "./utils/drawUtils";
import PredictionList from "./components/PredictionList";
import Controls from "./components/Controls";
import "./App.css";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [cameraError, setCameraError] = useState(false);
  
  const { 
    model, 
    predictions, 
    startDetection, 
    stopDetection, 
    isLoading, 
    error: modelError,
    isRunning,
    threshold,
    setThreshold
  } = useObjectDetector({ threshold: 0.60 });

  useEffect(() => {
    if (model && webcamRef.current?.video) {
      startDetection(webcamRef.current.video);
    }
  }, [model, startDetection]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = webcamRef.current?.video;
    
    if (!canvas || !video || video.readyState < 2) return;

    // Sync canvas internal resolution to video's intrinsic resolution.
    // This allows CSS to fluidly resize both elements without breaking coordinates.
    if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    }

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Only draw if we have valid predictions, canvas dimensions, and engine is running
    if (canvas.width > 0 && canvas.height > 0 && isRunning) {
      drawRect(predictions, ctx);
    }
  }, [predictions, isRunning]);

  const handleUserMediaError = () => {
    setCameraError(true);
  };

  const handleToggleRun = useCallback(() => {
    if (isRunning) {
      stopDetection();
    } else {
      if (webcamRef.current?.video) {
        startDetection(webcamRef.current.video);
      }
    }
  }, [isRunning, startDetection, stopDetection]);

  return (
    <div className="app-container">
      {/* Header Section */}
      <header className="app-header">
        <h1 className="app-title">Vision AI <span className="badge">Real-time</span></h1>
        <div className="status-container">
          <div className={`status-dot ${model ? (isRunning ? 'ready' : 'loading') : (modelError ? 'error' : 'loading')}`}></div>
          <span>{model ? (isRunning ? "System Active" : "System Paused") : (modelError ? "System Offline" : "Loading Model...")}</span>
        </div>
      </header>

      {(modelError || cameraError) && (
        <div className="error-banner">
          <span className="error-icon">⚠️</span>
          {modelError || "Camera access denied. Please enable camera to use the app."}
        </div>
      )}

      <main className="main-content">
        {/* Viewfinder Section */}
        <div className="viewfinder-wrapper">
          <div className="viewfinder">
            {!cameraError && (
              <Webcam
                ref={webcamRef}
                muted={true}
                className="webcam-feed"
                onUserMediaError={handleUserMediaError}
                videoConstraints={{
                  facingMode: "user",
                }}
              />
            )}

            {cameraError && (
              <div className="camera-error-placeholder">
                <span className="error-icon">⚠️</span>
                <p>Camera source unavailable</p>
              </div>
            )}

            <canvas
              ref={canvasRef}
              className="overlay-canvas"
            />

            {isLoading && <div className="loader-overlay">Initialising Neural Network...</div>}
          </div>
        </div>

        {/* Sidebar Section */}
        <aside className="sidebar">
          <div className="stats-card glass-card">
            <h3>Detection Feed</h3>
            <p>Objects found: <strong>{isRunning ? predictions.length : 0}</strong></p>
          </div>
          
          <Controls 
            isRunning={isRunning}
            onToggleRun={handleToggleRun}
            threshold={threshold}
            setThreshold={setThreshold}
          />

          <PredictionList predictions={isRunning ? predictions : []} />
        </aside>
      </main>
    </div>
  );
}

export default App;