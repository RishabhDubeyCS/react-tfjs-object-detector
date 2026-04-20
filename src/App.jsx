import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import { useObjectDetector } from "./hooks/useObjectDetector";
import { drawRect } from "./utils/drawUtils";
import PredictionList from "./components/PredictionList";
import "./App.css";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [cameraError, setCameraError] = useState(false);
  const { model, predictions, startDetection, isLoading, error: modelError } = useObjectDetector();

  useEffect(() => {
    if (model && webcamRef.current?.video) {
      startDetection(webcamRef.current.video);
    }
  }, [model, startDetection]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawRect(predictions, ctx);
  }, [predictions]);

  const handleUserMediaError = () => {
    setCameraError(true);
  };

  return (
    <div className="app-container">
      {/* Header Section */}
      <header className="app-header">
        <h1>Vision AI <span className="badge">Real-time</span></h1>
        <div className="status-container">
          <div className={`status-dot ${model ? 'ready' : (modelError ? 'error' : 'loading')}`}></div>
          <span>{model ? "System Active" : (modelError ? "System Offline" : "Loading Model...")}</span>
        </div>
      </header>

      {(modelError || cameraError) && (
        <div className="error-banner">
          {modelError || "Camera access denied. Please enable camera to use the app."}
        </div>
      )}

      <main className="main-content">
        {/* Viewfinder Section */}
        <div className="viewfinder">
          {!cameraError && (
            <Webcam
              ref={webcamRef}
              muted={true}
              className="webcam-feed"
              onUserMediaError={handleUserMediaError}
              videoConstraints={{
                width: 640,
                height: 480,
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
            width="640"
            height="480"
            className="overlay-canvas"
          />

          {isLoading && <div className="loader-overlay">Initialising Neural Network...</div>}
        </div>

        {/* Sidebar Section */}
        <aside className="sidebar">
          <div className="stats-card">
            <h3>Detection Feed</h3>
            <p>Objects found: <strong>{predictions.length}</strong></p>
          </div>
          <PredictionList predictions={predictions} />
        </aside>
      </main>
    </div>
  );
}

export default App;