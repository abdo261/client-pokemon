import { useState, useEffect } from 'react'
import Chart from 'react-apexcharts'
import { getLocalTimeZone } from '@internationalized/date'

const AreaChartHome = ({
  fromDate,
  toDate,
  orderType,
  mergeCharts = false,
  timeRange = 'hourly',
  payments
}) => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: 'area',
        height: 350,
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        type: 'datetime',
        categories: []
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm'
        },
        style: {
          fontSize: '12px',
          color: '#000'
        }
      }
    }
  })

  const [countChartData, setCountChartData] = useState({
    series: [],
    options: {
      chart: {
        type: 'bar',
        height: 350,
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: true
      },
      xaxis: {
        type: 'datetime',
        categories: []
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm'
        },
        style: {
          fontSize: '12px',
          color: '#000'
        }
      }
    }
  })

  useEffect(() => {
    updateChartData()
    updateCountChartData() // Update the count chart
  }, [fromDate, toDate, orderType, mergeCharts, timeRange])
  const updateChartData = () => {
    const filteredPayments = payments.filter((payment) => {
      const createdAt = new Date(payment.createdAt).getTime()
      const from = fromDate.toDate(getLocalTimeZone()).getTime()
      const to = toDate.toDate(getLocalTimeZone()).getTime()

      // Order type filtering logic (offline/online)
      if (orderType === 'true' && !payment.order) return false
      if (orderType === 'false' && payment.order) return false

      return createdAt >= from && createdAt <= to
    })

    const categories = []
    const totalPriceData = {}

    filteredPayments.forEach((payment) => {
      const createdAt = new Date(payment.createdAt)

      let key
      if (timeRange === 'hourly') {
        key = createdAt.toISOString().slice(0, 13) // Group by hour (YYYY-MM-DDTHH)
      } else if (timeRange === 'daily') {
        key = createdAt.toISOString().slice(0, 10) // Group by day (YYYY-MM-DD)
      } else if (timeRange === 'monthly') {
        key = createdAt.toISOString().slice(0, 7) // Group by month (YYYY-MM)
      }

      if (!totalPriceData[key]) {
        totalPriceData[key] = 0
        categories.push(key) // Add key as a category for the x-axis
      }

      // Parse the `totalePrice` as a number before adding it
      totalPriceData[key] += parseFloat(payment.totalePrice || 0)
    })

    const totalPrices = categories.map((key) => totalPriceData[key])

    setChartData({
      series: [{ name: 'Total Prix', data: totalPrices }],
      options: {
        ...chartData.options,
        xaxis: {
          categories: categories.map((category) => {
            if (timeRange === 'hourly') return `${category}:00:00Z`
            if (timeRange === 'daily') return `${category}T00:00:00Z`
            if (timeRange === 'monthly') return `${category}-01T00:00:00Z`
            return category
          })
        }
      }
    })
  }

  const updateCountChartData = () => {
    const paymentCounts = {}
    const categories = []

    const filteredPayments = payments.filter((payment) => {
      const createdAt = new Date(payment.createdAt).getTime()
      const from = fromDate.toDate(getLocalTimeZone()).getTime()
      const to = toDate.toDate(getLocalTimeZone()).getTime()

      // Apply the orderType filter based on the isLocal property
      if (orderType === 'true' && !payment.isLocal) return false // Filter out offline payments when orderType is 'true' (local)
      if (orderType === 'false' && payment.isLocal) return false // Filter out online payments when orderType is 'false' (offline)

      return createdAt >= from && createdAt <= to
    })

    filteredPayments.forEach((payment) => {
      const createdAt = new Date(payment.createdAt)

      let key
      if (timeRange === 'hourly') {
        key = createdAt.toISOString().slice(0, 13) // Group by hour (YYYY-MM-DDTHH)
      } else if (timeRange === 'daily') {
        key = createdAt.toISOString().slice(0, 10) // Group by day (YYYY-MM-DD)
      } else if (timeRange === 'monthly') {
        key = createdAt.toISOString().slice(0, 7) // Group by month (YYYY-MM)
      }

      if (!paymentCounts[key]) {
        paymentCounts[key] = 0
        categories.push(key) // Add key as a category for the x-axis
      }
      paymentCounts[key]++
    })

    const seriesData = [
      { name: 'Commandes', data: categories.map((key) => paymentCounts[key]) }
    ]

    setCountChartData({
      series: seriesData,
      options: {
        ...countChartData.options,
        xaxis: {
          categories: categories.map((category) => {
            if (timeRange === 'hourly') return `${category}:00:00Z`
            if (timeRange === 'daily') return `${category}T00:00:00Z`
            if (timeRange === 'monthly') return `${category}-01T00:00:00Z`
            return category
          })
        }
      }
    })
  }
console.log({Totale_Prix : chartData.series})
  return (
    <div className="chart-container">
      {/* Existing total price chart */}
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="area"
        height={350}
        width="100%"
      />

      {/* New count chart for payment counts */}
      <div style={{ marginTop: '30px' }}>
        <Chart
          options={countChartData.options}
          series={countChartData.series}
          type="bar"
          height={350}
          width="100%"
        />
      </div>
    </div>
  )
}

export default AreaChartHome
