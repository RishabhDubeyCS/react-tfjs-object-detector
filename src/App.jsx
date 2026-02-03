import React, { useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { useObjectDetector } from "./hooks/useObjectDetector";
import { drawRect } from "./utils/drawUtils";
import PredictionList from "./components/PredictionList";
import "./App.css"; // Niche wala CSS yahan kaam aayega

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const { model, predictions, detect, isLoading } = useObjectDetector();

  useEffect(() => {
    if (model && webcamRef.current?.video) {
      detect(webcamRef.current.video);
    }
  }, [model, detect]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 640, 480);
    drawRect(predictions, ctx);
  }, [predictions]);

  return (
    <div className="app-container">
      {/* Header Section */}
      <header className="app-header">
        <h1>Vision AI <span className="badge">Real-time</span></h1>
        <div className="status-container">
          <div className={`status-dot ${model ? 'ready' : 'loading'}`}></div>
          <span>{model ? "System Active" : "Loading Model..."}</span>
        </div>
      </header>

      <main className="main-content">
        {/* Viewfinder Section */}
        <div className="viewfinder">
          <Webcam
            ref={webcamRef}
            muted={true}
            className="webcam-feed"
            videoConstraints={{
              width: 640,
              height: 480,
              facingMode: "user",
            }}
          />
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