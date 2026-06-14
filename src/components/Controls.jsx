import React, { useState } from "react";

const Controls = ({
  isRunning,
  onToggleRun,
  threshold,
  setThreshold,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="glass-card controls-card">
      <div 
        className="controls-header" 
        onClick={() => setIsExpanded(!isExpanded)}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsExpanded(!isExpanded);
          }
        }}
      >
        <h3 className="controls-title">
          <span className="icon">⚙️</span> Control Panel
        </h3>
        <span className={`chevron ${isExpanded ? 'expanded' : ''}`}>
          ▼
        </span>
      </div>

      {isExpanded && (
        <div className="controls-content">
          {/* Engine State */}
          <div className="control-group">
            <button
              onClick={onToggleRun}
              className={`primary-button ${isRunning ? 'stop' : 'start'}`}
            >
              <span className="icon">{isRunning ? "⏸" : "▶"}</span>
              {isRunning ? "Pause Engine" : "Start Engine"}
            </button>
          </div>

          {/* Threshold Slider */}
          <div className="control-group">
            <div className="slider-header">
              <label htmlFor="threshold-slider">Confidence Threshold</label>
              <span className="slider-value">{Math.round(threshold * 100)}%</span>
            </div>
            <input
              id="threshold-slider"
              type="range"
              min="0.1"
              max="0.9"
              step="0.05"
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              className="styled-slider"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Controls;