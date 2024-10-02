import { useEffect, useRef, useState } from 'react'
import Sidebare from '../components/Sidebare'
import Header from '../components/Header'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { IoIosArrowBack } from 'react-icons/io'
import { motion } from 'framer-motion'
import { Button, NextUIProvider, Tooltip } from '@nextui-org/react'
import pokeemon from '../assets/images/pokeemon-01.png'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const Layout = () => {
  const usePreviousRoute = () => {
    const location = useLocation()
    const previousPath = useRef(null)
    const currentPath = location.pathname

    useEffect(() => {
      previousPath.current = currentPath
    }, [currentPath])

    return previousPath.current
  }

  const navigate = useNavigate()
  const { pathname } = useLocation()
  const prevRoute = usePreviousRoute()
  const [open, setOpen] = useState(true)

  const toggleSideBare = () => setOpen(!open)

  const handelNavigate = () => {
    if (prevRoute && pathname !== '/') {
      navigate(-1)
    } else {
      navigate('/')
    }
  }

  const showBackButton = pathname !== '/'

  return (
    <NextUIProvider locale="fr-CA">
      <div
        className={`min-h-screen pr-4 pb-4 ${
          open ? 'pl-[5rem]' : 'pl-3'
        } duration-500 ease-in-out pt-[5rem] dark:bg-[#18191A] bg-gray-200`}
      >
        <Sidebare open={open} />
        <section className="text-black dark:text-gray-100 grid grid-cols-1 h-full">
          <Header toggleSideBare={toggleSideBare} open={open} />
          <main className="h-full flex flex-col gap-5 w-full">
            <div className="flex items-start justify-center relative">
              {' '}
              <div className="size-[32px] absolute left-0">
                {showBackButton && (
                  <Tooltip
                    content="Précédent"
                    placement="right"
                    showArrow
                    color="foreground"
                    delay={0}
                    closeDelay={0}
                  >
                    <span className="w-fit">
                      <motion.span
                        transition={{ duration: 0.7 }}
                        whileTap={{ scale: 0.7 }}
                        className="mb-8"
                      >
                        <Button
                          isIconOnly
                          size="sm"
                          variant="bordered"
                          className="text-lg"
                        
                          onClick={handelNavigate}
                        >
                          <IoIosArrowBack />
                        </Button>
                      </motion.span>
                    </span>
                  </Tooltip>
                )}
              </div>
              <div className="w-full flex justify-center ">
                {' '}
                <div className="w-[150px] sm:w-[250px]">
                  <img src={pokeemon} alt="alwarda logo" className="w-full" />
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col items-stretch overflow-clip md:px-3 px-1">
              <Outlet />
            </div>
          </main>
        </section>
      </div>
      <ToastContainer theme="colored" position="top-center" />
    </NextUIProvider>
  )
}

export default Layout
