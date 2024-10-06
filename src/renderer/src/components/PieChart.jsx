// PieChart.js
import React from 'react'
import Chart from 'react-apexcharts'

const PieChart = ({ data }) => {
  // Prepare data for the chart
  const series = Object.values(data)
  const labels = Object.keys(data)

  // Calculate the total sum of the data series for percentage calculation
  const total = series.reduce((acc, value) => acc + value, 0)

  const chartOptions = {
    chart: {
      type: 'pie'
    },
    labels: labels,
    tooltip: {
      enabled: true,
      y: {
        formatter: function (value) {
          // Calculate percentage
          const percentage = ((value / total) * 100).toFixed(2)
          return `${value}  (${percentage}%)` // Show value and percentage in tooltip
        }
      }
    },
    legend: {
      show: false
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ]
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Chart options={chartOptions} series={series} type="pie" width="350" />
    </div>
  )
}

export default PieChart
