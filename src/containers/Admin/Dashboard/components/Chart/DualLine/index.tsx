import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface DualLineChartProps {
    newVisitors: number[];
    returningVisitors: number[];
    newVisitorsLabel?: string;
    returningVisitorsLabel?: string;
    labels: string[]
}

const DualLineChart: React.FC<DualLineChartProps> = ({
    newVisitors,
    returningVisitors,
    newVisitorsLabel,
    labels,
    returningVisitorsLabel
}) => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const ctx = chartRef.current?.getContext('2d');

        if (!ctx) {
            return;
        }

        const myChart = new Chart(ctx, {
            type: 'line', // Keep as line chart
            data: {
                labels,
                datasets: [
                    {
                        label: newVisitorsLabel || 'New Visitors',
                        data: newVisitors || Array(labels.length).fill(0), // Default to zero if no data is provided
                        borderColor: 'rgba(255, 29, 29, 0.8)', // Line color for new visitors dataset
                        borderWidth: 2,
                        fill: false, // Fill the area under the new visitors line
                        tension: 0.4, // Set tension to 0.4 for smoother curves
                    },
                    {
                        label: returningVisitorsLabel || 'Returning Visitors',
                        data: returningVisitors || Array(labels.length).fill(0), // Default to zero if no data is provided
                        borderColor: 'rgba(237, 235, 0, 0.8)', // Line color for returning visitors dataset
                        borderWidth: 2,
                        fill: false, // Fill the area under the returning visitors line
                        tension: 0.4, // Set tension to 0.4 for smoother curves
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true, // Show legend for datasets
                    },
                    tooltip: {
                        callbacks: {
                            title: (tooltipItems) => {
                                const item = tooltipItems[0];
                                const month = labels[item.dataIndex]; // Tháng hiện tại
                                return `Month: ${month}`;
                            },
                            label: function (context) {
                                return `${context.dataset.label}: ${context.raw}`;
                            },
                        },
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });

        return () => {
            myChart.destroy();
        };
    }, [newVisitors, returningVisitors, labels, newVisitorsLabel, returningVisitorsLabel]);

    return (
        <div>
            <h2>
                Total Visitors:{' '}
                {newVisitors.reduce((acc, cur) => acc + cur, 0) + returningVisitors.reduce((acc, cur) => acc + cur, 0)}
            </h2>
            <p>Monthly Visitors</p>
            <canvas ref={chartRef} />
        </div>
    );
};

export default DualLineChart;
