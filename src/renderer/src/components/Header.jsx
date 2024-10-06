import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { RiMenu3Line } from 'react-icons/ri'

import ToggleThem from './ToggleThem'
import { Link } from 'react-router-dom'
import { ClockCm } from './Clock'

const Header = ({ toggleSideBare, open }) => {
 
  const [dark, setDark] = useState(() => {
    const storedDarkMode = localStorage.getItem('dark');
    return storedDarkMode !== null ? JSON.parse(storedDarkMode) : false;
  });
  
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
    <header
      className={`fixed top-0 right-0  z-[100] ${
        open ? 'left-16' : 'left-0'
      } duration-500 ease-in-out  h-16 bg-white  flex justify-between px-3 items-center dark:bg-[#242526] dark:text-white`}
    >
      <div className="flex items-center gap-2">
        <Button isIconOnly size="sm" variant="bordered" onClick={toggleSideBare}>
          <motion.span
            animate={{ rotate: open ? '0deg' : '180deg' }}
            className=" text-lg"
            transition={{ duration: 0.7 }}
          >
            <RiMenu3Line />
          </motion.span>
        </Button>
        <ClockCm />
      </div>
      <div className={`flex gap-3 items-center ${open && 'hidden sm:flex'} `}>
        <Dropdown placement="bottom-end" closeOnSelect={false}>
          <div className="flex items-center gap-2">
            <Link to="/" className="flex flex-col items-end ">
              <span className="text-xs sm:text-medium font-semibold    ">abdellah ait bachikh</span>
              <span className="text-[10px] sm:text-sm font-semibold text-gray-400">@Admin</span>
            </Link>
            <DropdownTrigger>
              <Avatar isBordered className="flex-shrink-0" />
            </DropdownTrigger>
          </div>
          <DropdownMenu>
            <DropdownItem key="theme" onPress={toggleDark}>
              <div className="flex items-center gap-2">
                <ToggleThem className="cursor-none" dark={dark} /> <span className=' dark:text-white text-gray-900'> {dark ? "light mode":"dark mode"} </span>
              </div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </header>
  )
}

export default Header
