import { useState, useEffect } from 'react'

export function ClockCm() {
  const getCurrentDateTime = () => {
    const now = new Date()
    const time = now.toLocaleTimeString()
    const date = now.toLocaleDateString('en-GB')
    const dayName = now.toLocaleDateString('fr-FR', { weekday: 'long' })
    return { time, date, dayName }
  }

  const [{ time, date, dayName }, setDateTime] = useState(getCurrentDateTime())

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime(getCurrentDateTime())
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className='text-small md:text-medium overflow-hidden'>
      <h1 className="tracking-widest">{time}</h1>
      <h2 className="tracking-widest whitespace-nowrap overflow-hidden text-ellipsis">
        <span className="capitalize">{dayName}</span> : {date}
      </h2>
    </div>
  )
}
