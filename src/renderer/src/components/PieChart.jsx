// PieChart.js
import  { useState } from 'react';
import Chart from 'react-apexcharts';

const PieChart = ({ data }) => {
  const series = Object.values(data);
  const labels = Object.keys(data);
  const total = series.reduce((acc, value) => acc + value, 0);
  
  const [selectedSlice, setSelectedSlice] = useState(null);
  
  const chartOptions = {
    chart: {
      type: 'pie',
      events: {
        dataPointSelection: (event, chartContext, { dataPointIndex }) => {
          // Stop propagation to prevent Swiper from intercepting the click
          event.stopPropagation();
          // Toggle selection
          setSelectedSlice(selectedSlice === dataPointIndex ? null : dataPointIndex);
        },
      },
    },
    labels: labels,
    tooltip: {
      enabled: true,
      y: {
        formatter: function (value) {
          const percentage = ((value / total) * 100).toFixed(2);
          return `${value} (${percentage}%)`;
        },
      },
    },
    legend: {
      show: false,
    },
  };
console.log(selectedSlice)
  return (
    <div className="w-full h-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
      <Chart options={chartOptions} series={series} type="pie" width="320" />
      
      {selectedSlice !== null && (
        <div className="mt-2 text-center">
          <h3 className="font-semibold">{labels[selectedSlice]}: {series[selectedSlice]}</h3>
          <p>Percentage: {((series[selectedSlice] / total) * 100).toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
};

export default PieChart;
