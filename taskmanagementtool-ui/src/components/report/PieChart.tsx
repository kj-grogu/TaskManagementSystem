import React, { useEffect, useRef } from "react";

interface PieChartProps {
  data: { label: string; value: number }[];
  colors: string[];
  labelColors: { [key: string]: string };
}

const PieChart: React.FC<PieChartProps> = ({ data, colors, labelColors }) => {
  const graphRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (graphRef.current) {
      const canvasWidth = 400;
      const canvasHeight = 300;
      const radius = Math.min(canvasWidth, canvasHeight) / 2;
      const centerX = canvasWidth / 2;
      const centerY = canvasHeight / 2;

      const ctx = graphRef.current.getContext("2d");

      if (ctx) {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        const total = data.reduce((acc, { value }) => acc + value, 0);

        let startAngle = 0;

        data.forEach(({ label, value }, index) => {
          const sectorAngle = (value / total) * (2 * Math.PI);
          ctx.fillStyle = colors[index % colors.length];
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.arc(
            centerX,
            centerY,
            radius,
            startAngle,
            startAngle + sectorAngle
          );
          ctx.closePath();
          ctx.fill();
          startAngle += sectorAngle;

          const legendX = 10;
          const legendY = 20 * (index + 1);

          ctx.fillStyle = colors[index % colors.length];
          ctx.fillRect(legendX, legendY - 8, 10, 10);
          ctx.fillStyle = labelColors[label] || "black";
          ctx.font = "12px Arial";
          ctx.textAlign = "start";
          ctx.fillText(`${label} (${value})`, legendX + 15, legendY);
        });
      }
    }
  }, [data, colors, labelColors]);

  return <canvas ref={graphRef} width={400} height={300} />;
};

export default PieChart;
