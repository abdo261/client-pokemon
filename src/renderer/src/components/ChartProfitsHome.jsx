import React, { useState } from 'react'
import { DatePicker, Select, SelectItem } from '@nextui-org/react'
import { parseAbsoluteToLocal, getLocalTimeZone, today } from '@internationalized/date'
import AreaChartHome from './AreaChartHome'

const ChartProfitsHome = () => {
  const [fromDate, setFromDate] = useState(
    parseAbsoluteToLocal(new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
  )
  const [toDate, setToDate] = useState(parseAbsoluteToLocal(new Date().toISOString()))
  const [orderType, setOrderType] = useState('') // State for selected order type
  // const [mergeCharts, setMergeCharts] = useState(false) // State for merging charts

  const handleFromChange = (date) => {
    if (date) {
      setFromDate(date)
      if (date > toDate) {
        setToDate(date)
      }
    }
  }

  const isDateUnavailable = (date) => {
    const now = parseAbsoluteToLocal(new Date().toISOString())
    return date.compare(now) > 0 // Disable future dates
  }

  const isDateToUnavailable = (date) => {
    const now = parseAbsoluteToLocal(new Date().toISOString())
    return date.compare(fromDate) < 0 || date.compare(now) > 0 // Disable dates before fromDate
  }

  const handleTypeChange = (e) => {
    console.log(e.target.value)
    setOrderType(e.target.value) // Update selected order type
  }

  // const handleMergeChange = (e) => {
  //   console.log(e.target.value)

  //   setMergeCharts(e.target.value === 'true')
  // }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <DatePicker
          label="De"
          value={fromDate}
          onChange={handleFromChange}
          showMonthAndYearPickers
          isDateUnavailable={isDateUnavailable}
          maxDate={today(getLocalTimeZone())}
        />
        <DatePicker
          label="Jusqu'à"
          value={toDate}
          onChange={setToDate}
          minDate={fromDate}
          showMonthAndYearPickers
          isDateUnavailable={isDateToUnavailable}
        />
        <Select
          label="Type"
          placeholder="Sélectionnez le type de Commande"
          value={orderType}
          onChange={handleTypeChange}
        >
          {[
            { label: 'Tous les Commandes', value: '' },
            { label: 'Hors ligne', value: 'false' }, // Updated value
            { label: 'En ligne', value: 'true' } // Updated value
          ].map((e) => (
            <SelectItem key={e.value} value={e.value}>
              {e.label}
            </SelectItem>
          ))}
        </Select>
        {/* <Select
          label="Mélanger les graphiques"
          placeholder="Mélanger les graphiques"
          value={mergeCharts == true ? "true"  : "false"}
          onChange={handleMergeChange}
        >
          <SelectItem value={'false'} key={'false'}>
            Séparer
          </SelectItem>
          <SelectItem value={'true'} key={'true'}>
            {' '}
            Fusionner
          </SelectItem>
        </Select> */}
      </div>
      <AreaChartHome
        fromDate={fromDate}
        toDate={toDate}
        orderType={orderType}
        // mergeCharts={mergeCharts} // Pass mergeCharts to AreaChartHome
      />
    </div>
  )
}

export default ChartProfitsHome
