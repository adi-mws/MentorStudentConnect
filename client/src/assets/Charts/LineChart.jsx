import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

function LineChart() {
  const student = { name: "Rohan Raj", score: 98 };

  const data = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
    datasets: [{
      label: "your Progress",
      data: [45, 32, 58, 64, 78],
      borderColor: '#4bc0c0',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      fill: true,
      tension: 0.3
    }]
  };

  const options = {
    scales: {
      y: { 
        beginAtZero: true, 
        title: { display: true, text: 'Score' },
        max: 100
      },
      x: { 
        title: { display: true, text: 'Weeks' }
      }
    },
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: `${student.name}'s Score Progress` }
    }
  };

  return (
    <div className="container py-4">
      <link 
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" 
        rel="stylesheet" 
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" 
        crossOrigin="anonymous" 
      />
      <h2 className="text-center mb-4">Your Progress</h2>
      <div className="chart-container" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export default LineChart;