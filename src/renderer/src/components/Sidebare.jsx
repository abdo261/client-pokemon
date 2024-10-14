import { IoSettingsOutline } from 'react-icons/io5'
import { MdOutlineCategory, MdOutlineShop2 } from 'react-icons/md'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { IoIosLogOut } from 'react-icons/io'
import { Tooltip } from '@nextui-org/react'
import { FaUserShield } from 'react-icons/fa6'
import { FaHandHoldingUsd } from 'react-icons/fa'
import { IoDocumentTextOutline } from 'react-icons/io5'
import { FaHome } from 'react-icons/fa'
import { FaCalendarDays } from 'react-icons/fa6'
import { BiSolidOffer } from 'react-icons/bi'

import { MdFastfood } from 'react-icons/md'
import pokeemon from '../assets/images/pokeemon-01.png'
import swal from 'sweetalert'
import { useEffect, useState } from 'react'
import { FaChartPie } from 'react-icons/fa'
import { logoutUser } from '../redux/api/authApi'
import { useDispatch } from 'react-redux'

const Links = [
  { name: 'Accueil', href: '/', icon: <FaHome /> },
  { name: 'Journée ', href: '/days', icon: <FaCalendarDays /> },
  { name: 'Catégories', href: '/categories', icon: <MdOutlineCategory /> },
  { name: 'Produits', href: '/products', icon: <MdFastfood /> },
  { name: 'Packes', href: '/offers', icon: <BiSolidOffer /> },
  { name: 'Paiements', href: '/commandes', icon: <FaHandHoldingUsd /> },
  { name: 'Factures', href: '/invoices', icon: <IoDocumentTextOutline /> },
  { name: 'Commandes', href: '/orders', icon: <MdOutlineShop2 /> }
]

const AdminLinks = [
  {
    name: 'Utilisateurs',
    href: '/users',
    icon: <FaUserShield />,
    isShow: true
  },
  {
    name: 'Paramètres',
    href: '/settings',
    icon: <IoSettingsOutline />,
    isShow: true
  },
  {
    name: 'Statistiques',
    href: '/sharts',
    icon: <FaChartPie />,
    isShow: true
  }
]

const Sidebare = ({ open }) => {
  const navigate = useNavigate()
  const [isLogout, setIsLogout] = useState(false)
  const handelLogout = () => {
    setIsLogout(true)
  }
  const dispatch = useDispatch()
  useEffect(() => {
    if (isLogout) {
      swal({
        title: 'Êtes-vous sûr por déconnecter ?',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      }).then((isOk) => {
        if (isOk) {
          dispatch(
            logoutUser(() => {
              setIsLogout(false)
              navigate('/')
            })
          )
        }
        setIsLogout(false)
      })
    }
  }, [isLogout, navigate])
  return (
    <aside
      className={`flex h-screen  ${
        open ? 'w-16' : 'w-0  '
      } overflow-hidden duration-500 ease-in-out  flex-col justify-between border-e dark:border-gray-800 dark:bg-[#242526] dark:text-white bg-white fixed top-0 left-0 `}
    >
      <div className=" flex-1 flex flex-col max-h-screen">
        <div className="inline-flex size-16 items-center justify-center">
          <Link to="/" className="grid size-10 place-content-center ">
            <div className="w-14">
              <img src={pokeemon} alt="alwarda logo" className="w-full" />
            </div>
          </Link>
        </div>
        <div className="custom-scroll flex flex-1 flex-col overflow-y-auto h-full pb-20">
          <div>
            <div className="px-2">
              <ul className="space-y-1  pb-1 pt-4">
                {Links.map((l, i) => (
                  <Tooltip
                    content={l.name}
                    showArrow
                    placement="right"
                    size="lg"
                    color="foreground"
                    radius="sm"
                    delay={0}
                    closeDelay={0}
                    key={i}
                  >
                    <li>
                      <NavLink
                        to={l.href}
                        className="group relative flex justify-center rounded p-2  text-gray-500 hover:bg-gray-100 hover:text-gray-700  text-2xl"
                      >
                        {l.icon}
                      </NavLink>{' '}
                    </li>
                  </Tooltip>
                ))}
              </ul>
            </div>
          </div>
          <div className=" px-2  space-y-1 ">
            {AdminLinks.map(
              (l, i) =>
                l.isShow && (
                  <Tooltip
                    content={l.name}
                    showArrow
                    placement="right"
                    size="lg"
                    color="foreground"
                    radius="sm"
                    delay={0}
                    closeDelay={0}
                    key={i}
                  >
                    <NavLink
                      to={l.href}
                      className={` group relative flex justify-center rounded p-2  text-gray-500 hover:bg-gray-100 hover:text-gray-700 text-2xl `}
                    >
                      {l.icon}
                    </NavLink>
                  </Tooltip>
                )
            )}
          </div>
        </div>
      </div>

      <div className="sticky bg-gradient-to-r from-red-300 to-red-50 dark:from-red-700  inset-x-0 bottom-0 border-t border-gray-100 p-2">
        <div>
          <Tooltip
            content={'Déconnecter'}
            showArrow
            placement="right"
            size="lg"
            color="foreground"
            className="bg-red-400 "
            radius="sm"
            delay={0}
            closeDelay={0}
          >
            <span>
              <button
                onClick={handelLogout}
                type="submit"
                className="group relative flex w-full justify-center rounded-lg p-2 text-gray-500  dark:text-gray-300 hover:bg-red-400  hover:text-white text-2xl"
              >
                <IoIosLogOut />

                {/* <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-red-400 px-2 py-1.5 text-lg  text-white group-hover:visible">
                Logout
              </span> */}
              </button>
            </span>
          </Tooltip>
        </div>
      </div>
    </aside>
  )
}

export default Sidebare
