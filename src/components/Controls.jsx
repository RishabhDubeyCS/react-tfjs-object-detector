import { useState } from "react";

const Controls = ({
  isRunning,
  setIsRunning,
  threshold,
  setThreshold,
  takeScreenshot,
}) => {

  const [show, setShow] = useState(true);

  return (
    <div
      style={{
        marginTop: 10,
        padding: 10,
        border: "1px solid #ccc",
        borderRadius: 8,
        maxWidth: 640,
        margin: "auto",
        background: "#0f172a",
        color: "white",
      }}
    >
      <h3 onClick={() => setShow(!show)} style={{ cursor: "pointer" }}>
        ⚙ Controls {show ? "▲" : "▼"}
      </h3>

      {show && (
        <>
          {/* Start / Stop */}
          <div style={{ marginBottom: 10 }}>
            <button
              onClick={() => setIsRunning(!isRunning)}
              style={{ padding: "6px 12px" }}
            >
              {isRunning ? "⏸ Stop Detection" : "▶ Start Detection"}
            </button>
          </div>

          {/* Confidence Slider */}
          <div style={{ marginBottom: 10 }}>
            <label>
              Confidence Threshold: {Math.round(threshold * 100)}%
            </label>

            <input
              type="range"
              min="0.1"
              max="0.9"
              step="0.05"
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              style={{ width: "100%" }}
            />
          </div>

          {/* Screenshot */}
          <div>
            <button onClick={takeScreenshot}>
              📸 Capture Frame
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Controls;
