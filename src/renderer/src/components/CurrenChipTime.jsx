import { Chip } from '@nextui-org/react'
import  { useEffect, useState } from 'react'

const CurrenChipTime = () => {
    const [currentHour, setCurrentHour] = useState(new Date().getHours())
    const [currentMinute, setCurrentMinute] = useState(new Date().getMinutes())
    const [currentSecond, setCurrentSecond] = useState(new Date().getSeconds())
  
    useEffect(() => {
      const updateTime = () => {
        const now = new Date()
        setCurrentHour(now.getHours())
        setCurrentMinute(now.getMinutes())
        setCurrentSecond(now.getSeconds())
      }
  
      updateTime()
      const intervalId = setInterval(updateTime, 1000)
      return () => clearInterval(intervalId)
    }, [])
  return (
    <Chip variant="shadow" color="default" radius="sm">
                <span className="font-[500]">{`${currentHour}h ${currentMinute}m ${currentSecond}s`}</span>
              </Chip>
  )
}

export default CurrenChipTime