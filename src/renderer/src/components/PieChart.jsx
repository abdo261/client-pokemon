import React from 'react'
import Chart from 'react-apexcharts'

const PieChart = ({ data }) => {
  const categories = data.map((item) => item.name)
  const counts = data.map((item) => item.productCount)
  const colors = data.map((item) => item.color)

  const chartOptions = {
    chart: {
      type: 'donut'
    },
    colors: colors,
    labels: categories,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 350
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ],
    plotOptions: {
      pie: {
        donut: {
          size: '55%' // Adjust this for inner radius
        }
      }
    }
  }

  return (
    <div className="w-full  flex justify-start items-center h-full">
      <Chart options={chartOptions} series={counts} type="donut" width="360" />
    </div>
  )
}

export default PieChart
