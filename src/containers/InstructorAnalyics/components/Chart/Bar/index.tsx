import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface BarChartProps {
    data: number[];
    label?: string;
    showTotal?: boolean
}

const BarChart: React.FC<BarChartProps> = ({ data, label, showTotal = true }) => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const ctx = chartRef.current?.getContext('2d');

        if (!ctx) {
            return;
        }

        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    {
                        label: label || 'Accounts',
                        data: data.length ? data : Array(12).fill(0),
                        backgroundColor: 'rgba(255, 29, 29, 0.8)',
                        borderColor: 'rgba(255, 29, 29, 1)',
                        borderWidth: 1,
                        barThickness: 15,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                return `${label || 'Accounts'}: ${context.raw}`;
                            },
                        },
                    },
                },
                scales: {
                    x: {
                        beginAtZero: true,
                    },
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });

        return () => {
            myChart.destroy();
        };
    }, [data, label]);

    // Calculate the total of the data array
    const total = data.reduce((acc: number, cur: number) => acc + cur, 0);

    return (
        <div>
            <h2>
                {showTotal && 'Total accounts: '} 
                {total}
            </h2>
            <p>{label || 'Accounts'}</p>
            <canvas ref={chartRef} />
        </div>
    );
};

export default BarChart;
