import { useEffect, useState } from 'react'
import { FaRegMoon } from 'react-icons/fa'
import { MdOutlineLightMode } from 'react-icons/md'
import { Button } from '@nextui-org/react'

const ToggleThem = ({ size = 'sm' }) => {
  const [dark, setDark] = useState(JSON.parse(localStorage.getItem('dark')) || false)
  const toggleDark = () => setDark(!dark)
  useEffect(() => {
    localStorage.setItem('dark', dark)
    if (dark) {
      document.body.className = 'dark'
    } else {
      document.body.className = ''
    }
  }, [dark])
  return (
    <span className="cursor-none">
      <Button
        isIconOnly
        className="text-lg cursor-pointer"
        radius="full"
        variant="bordered"
        size={size}
        onClick={toggleDark}
      >
        {dark ? <FaRegMoon /> : <MdOutlineLightMode />}
      </Button>

    </span>
  )
}

export default ToggleThem
