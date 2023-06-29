import React, { useEffect, useRef } from "react";

interface ColumnGraphProps {
  data: { date: string; value: number }[];
  barColor: string;
  axisColor: string;
  labelColor: string;
}

const ColumnGraph: React.FC<ColumnGraphProps> = ({
  data,
  barColor,
  axisColor,
  labelColor,
}) => {
  const graphRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (graphRef.current) {
      // Calculate the maximum value to set the scaling of the graph
      const max = Math.max(...data.map((item) => item.value));

      // Canvas dimensions
      const canvasWidth = 400;
      const canvasHeight = 300;

      // Padding and bar spacing
      const padding = 40;
      const barSpacing = 20;

      // Calculate the width and height of each bar
      const barWidth =
        (canvasWidth - 2 * padding - (data.length - 1) * barSpacing) /
        data.length;
      const scaleFactor = (canvasHeight - 2 * padding) / max;

      // Get the canvas context
      const ctx = graphRef.current.getContext("2d");

      // Clear the canvas
      if (ctx) {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        // Draw the axes
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvasHeight - padding);
        ctx.lineTo(canvasWidth - padding, canvasHeight - padding);
        ctx.strokeStyle = axisColor;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw the y-axis title
        ctx.fillStyle = labelColor;
        ctx.font = "16px Arial";
        ctx.textAlign = "center";

        // Draw the x-axis title
        ctx.fillStyle = labelColor;
        ctx.font = "16px Arial";
        ctx.textAlign = "center";

        // Draw the bars and labels
        data.forEach((item, index) => {
          const { date, value } = item;
          const barHeight = value * scaleFactor;
          const x = padding + index * (barWidth + barSpacing);
          const y = canvasHeight - padding - barHeight;

          // Draw the bars
          ctx.fillStyle = barColor;
          ctx.fillRect(x, y, barWidth, barHeight);

          // Draw the labels for the bars
          ctx.fillStyle = labelColor;
          ctx.font = "12px Arial";
          ctx.textAlign = "center";
          ctx.fillText(value.toString(), x + barWidth / 2, y - 5);

          // Draw the dates below the x-axis
          ctx.fillStyle = labelColor;
          ctx.font = "12px Arial";
          ctx.textAlign = "center";
          ctx.fillText(date, x + barWidth / 2, canvasHeight - padding + 15);
        });
      }
    }
  }, [data, barColor, axisColor, labelColor]);

  return <canvas ref={graphRef} width={400} height={300} />;
};

export default ColumnGraph;
