import { useEffect, useRef } from "react";

const ObjectCanvas = ({ predictions }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    
    // 1. Clear the entire canvas before redrawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2. Set global styles outside the loop for performance
    ctx.font = "16px sans-serif";
    ctx.textBaseline = "top";

    predictions.forEach((p) => {
      const [x, y, w, h] = p.bbox;
      const label = `${p.class} ${Math.round(p.score * 100)}%`;

      // Draw the Bounding Box
      ctx.strokeStyle = "#00FF00";
      ctx.lineWidth = 3;
      ctx.strokeRect(x, y, w, h);

      // Draw Label Background (makes text readable)
      const textWidth = ctx.measureText(label).width;
      ctx.fillStyle = "#00FF00";
      ctx.fillRect(x, y - 25, textWidth + 10, 25);

      // Draw Label Text
      ctx.fillStyle = "#000000";
      ctx.fillText(label, x + 5, y - 20);
    });
  }, [predictions]); // Re-run every time predictions update

  return (
    <canvas
      ref={canvasRef}
      width="640"
      height="480"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 10, // Ensure it sits on top of the webcam
        pointerEvents: "none" // Allows clicking "through" the canvas to the video
      }}
    />
  );
};

export default ObjectCanvas;