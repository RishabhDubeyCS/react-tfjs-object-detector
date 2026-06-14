export const drawRect = (predictions, ctx) => {
  ctx.save();

  const primaryColor = "#00f2ff"; // Matches var(--color-primary)
  const glowColor = "rgba(0, 242, 255, 0.5)";

  predictions.forEach(prediction => {
    const [x, y, width, height] = prediction.bbox;
    const text = `${prediction.class} (${Math.round(prediction.score * 100)}%)`;

    // Drawing Bounding Box
    ctx.strokeStyle = primaryColor;
    ctx.lineWidth = 2;
    
    // Add glow effect
    ctx.shadowColor = glowColor;
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    // Use roundRect if available (modern browsers)
    if (ctx.roundRect) {
      ctx.beginPath();
      ctx.roundRect(x, y, width, height, [8]);
      ctx.stroke();
    } else {
      ctx.strokeRect(x, y, width, height);
    }

    // Semi-transparent fill for the bounding box
    ctx.fillStyle = "rgba(0, 242, 255, 0.05)";
    if (ctx.roundRect) {
      ctx.fill();
    } else {
      ctx.fillRect(x, y, width, height);
    }

    // Label Styling
    ctx.font = "600 14px 'Inter', system-ui, sans-serif";
    const textWidth = ctx.measureText(text).width;
    const paddingX = 8;
    const paddingY = 6;
    const labelHeight = 14 + (paddingY * 2);
    
    // Position label above box if space allows, otherwise inside top
    const labelY = y > labelHeight ? y - labelHeight - 5 : y + 5;

    // Remove glow for text readability
    ctx.shadowBlur = 0;

    // Label Background (Glassy effect)
    ctx.fillStyle = "rgba(15, 23, 42, 0.85)"; // Dark slate background
    
    if (ctx.roundRect) {
      ctx.beginPath();
      ctx.roundRect(x, labelY, textWidth + (paddingX * 2), labelHeight, [4]);
      ctx.fill();
      
      // Label Border
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(0, 242, 255, 0.3)";
      ctx.stroke();
    } else {
      ctx.fillRect(x, labelY, textWidth + (paddingX * 2), labelHeight);
      ctx.strokeStyle = "rgba(0, 242, 255, 0.3)";
      ctx.strokeRect(x, labelY, textWidth + (paddingX * 2), labelHeight);
    }

    // Label Text
    ctx.fillStyle = primaryColor;
    ctx.textBaseline = "middle";
    ctx.fillText(text, x + paddingX, labelY + (labelHeight / 2));
  });

  ctx.restore();
};