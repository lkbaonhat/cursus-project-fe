import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface LineChartProps {
  salesData: number[]; // Array of sales data for the week
  salesLabel?: string; // Optional label for sales dataset
  tension?: number;
  fill?: boolean | string;
  labels?: string[];
  label?: string;
  showTotal?: boolean;
}

const LineChart: React.FC<LineChartProps> = ({
  salesData,
  salesLabel,
  tension,
  fill,
  labels,
  label,
  showTotal = true,
}) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const ctx = chartRef.current?.getContext("2d");

    if (!ctx) {
      return;
    }

    const myChart = new Chart(ctx, {
      type: "line", // Line chart type
      data: {
        labels: labels,
        datasets: [
          {
            label: salesLabel, // Label for the dataset
            data: salesData || Array(7).fill(0), // Sales data or default to zeros
            backgroundColor: "rgba(255, 218, 199, 0.8)", //
            borderColor: "rgba(255, 107, 29, 0.8)", // Line color for sales
            borderWidth: 3, // Line width
            fill: fill, // No fill under the line
            tension: tension || 0, // Smoother curves
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true, // Show legend
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `${context.dataset.label}: $${context.raw} (Total: $${totalSales})`; // Tooltip format
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true, // Start y-axis at zero
            ticks: {
              stepSize: 1000, // Set Y-axis interval to 1000
            },
          },
        },
      },
    });

    return () => {
      myChart.destroy(); // Cleanup chart on unmount
    };
  }, [salesData, salesLabel, label]);

  // Calculate the total sales
  const totalSales = salesData.reduce((acc, curr) => acc + curr, 0);
  return (
    <div>
      <h2>
        {showTotal && 'Total Sales:'}
        {totalSales.toLocaleString()} VND
      </h2>
      <p>{label || "Weekly Sales"}</p>
      <canvas ref={chartRef} />
    </div>
  );
};

export default LineChart;
