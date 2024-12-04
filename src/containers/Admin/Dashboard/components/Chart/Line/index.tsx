import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface LineChartProps {
    salesData: number[]; // Array of sales data for the week
    salesLabel?: string; // Optional label for sales dataset
    tension?: number;
    fill?: boolean | string;
    labels?: string[];
    label?: string;
    title?: string; // Custom title for the chart
    description?: string; // Custom description for the chart
    showTitle?: boolean; // Optional prop to show title
    showDescription?: boolean;
}

const LineChart: React.FC<LineChartProps> = (
    { salesData,
        salesLabel,
        tension,
        fill,
        labels,
        label,
        title,
        description,
        showTitle = false,
        showDescription = false
    }) => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const ctx = chartRef.current?.getContext('2d');

        if (!ctx) {
            return;
        }

        const myChart = new Chart(ctx, {
            type: 'line', // Line chart type
            data: {
                labels: labels,
                datasets: [
                    {
                        label: salesLabel, // Label for the dataset
                        data: salesData || Array(7).fill(0), // Sales data or default to zeros
                        backgroundColor: 'rgba(255, 218, 199, 0.8)', //
                        borderColor: 'rgba(255, 107, 29, 0.8)', // Line color for sales
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
                                let rawValue = context.raw;

                                let value: number;
                                if (typeof rawValue === 'number') {
                                    value = rawValue;
                                } else if (typeof rawValue === 'string') {
                                    value = parseInt(rawValue, 10); 
                                } else {
                                    value = 0; 
                                }

                                // Định dạng giá trị theo VND
                                const formattedValue = value.toLocaleString('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND',
                                });

                                // Tính tổng
                                const totalSales = context.chart.data.datasets.reduce((sum, dataset) => {
                                    const dataPoint = dataset.data[context.dataIndex];
                                    if (typeof dataPoint === 'number') {
                                        return sum + dataPoint;
                                    } else if (typeof dataPoint === 'string') {
                                        return sum + parseInt(dataPoint, 10);
                                    }
                                    return sum;
                                }, 0);

                                const formattedTotal = totalSales.toLocaleString('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND',
                                });

                                return `${context.dataset.label}: ${formattedValue} (Total: ${formattedTotal})`;
                            },
                        },
                    },

                },
                scales: {
                    y: {
                        beginAtZero: true, // Start y-axis at zero
                        ticks: {
                            stepSize: 10000, // Set Y-axis interval to 1000
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
            {showTitle && title && <h2>{title}: {totalSales.toLocaleString('vi-VN')}đ</h2>}
            {showDescription && description && <p>{description}</p>}
            <canvas ref={chartRef} />
        </div>
    );
};

export default LineChart;
