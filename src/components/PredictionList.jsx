import React from "react";

const PredictionList = ({ predictions }) => {
  return (
    <div className="prediction-card">
      <h3>Detected Objects</h3>
      <div className="list-container">
        {predictions.map((p, i) => (
          <div key={i} className="prediction-item">
            <span className="class-label">{p.class}</span>
            <span className="score-badge">{Math.round(p.score * 100)}%</span>
          </div>
        ))}
        {predictions.length === 0 && (
          <div className="scanning-placeholder">
            <div className="scanner-line"></div>
            Scanning view...
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictionList;