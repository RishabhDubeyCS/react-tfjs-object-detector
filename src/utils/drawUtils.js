export const drawRect = (predictions, ctx) => {

  // Clear previous styles
  ctx.save();

  predictions.forEach(prediction => {
    const [x, y, width, height] = prediction.bbox;
    const text = `${prediction.class} (${Math.round(prediction.score * 100)}%)`;

    // Styling
    const color = "#00FF00";
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 2;
    ctx.font = "16px Arial";

    // Draw bounding box
    ctx.strokeRect(x, y, width, height);

    // ===== Label Background =====
    const textWidth = ctx.measureText(text).width;
    const textHeight = 16;

    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.fillRect(
      x,
      y > 20 ? y - 20 : y + 5,
      textWidth + 6,
      textHeight + 4
    );

    // ===== Label Text =====
    ctx.fillStyle = "#00FF00";
    ctx.fillText(
      text,
      x + 3,
      y > 20 ? y - 5 : y + 20
    );
  });

  ctx.restore();
};
