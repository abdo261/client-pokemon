import React, { useEffect, useState } from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Spinner
} from '@nextui-org/react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserById, getUsers } from '../redux/api/userApi'
import { getRoleColor, getRoleIcon, getRoleLabel } from '../utils/utils'
import io from 'socket.io-client'
import { FaWifi } from 'react-icons/fa'
import { FiWifiOff } from 'react-icons/fi'

const columns = [
  { name: 'USERNAME', uid: 'userName' },
  { name: 'ROLE', uid: 'role' },
  { name: 'STATUS', uid: 'status' }
]

// const users = [
//   {
//     id: 5,
//     userName: 'ABDELLAH',
//     email: '3322@gmail.com',
//     image: null,
//     role: 'RESPONSABLE'
//   },
//   {
//     id: 4,
//     userName: 'abdellah',
//     email: 'abdellah.basketeur2018@gmail.com',
//     image: null,
//     role: 'ADMIN'
//   },
//   {
//     id: 2,
//     userName: 'abdellah',
//     email: 'abdellah.basketeur2018@gmail.com',
//     image: null,
//     role: 'ADMIN'
//   },
//   {
//     id: 1,
//     userName: 'abdellah',
//     email: 'abdellah.basketeur2018@gmail.com',
//     image: null,
//     role: 'ADMIN'
//   }
// ]
const SOCKET_SERVER_URL = import.meta.env.VITE_API_URL_PUR

export default function UserTable() {
  const dispatch = useDispatch()
  const { users, loadingGet, user } = useSelector((state) => state.user)
  const { user: loginUser } = useSelector((state) => state.auth)

  useEffect(() => {
    if (loginUser) {
      dispatch(getUserById(loginUser.id))
      dispatch(getUsers())
    }
  }, [dispatch, loginUser])
  const token = localStorage.getItem('session_user')
    ? JSON.parse(localStorage.getItem('session_user')).token
    : null

  const [connectedClients, setConnectedClients] = useState([])
  useEffect(() => {
    if (token) {
      const newSocket = io(SOCKET_SERVER_URL)
      newSocket.on('connect', () => {
        newSocket.emit('conectCLintId', token)
      })
      newSocket.on('connectedClients', (clients) => {
        setConnectedClients(clients)
      })

      return () => {
        newSocket.close()
      }
    }
  }, [token])
  console.log(connectedClients)

  return (
    <>
      {loadingGet && (
        <div className="flex items-center justify-center col-span-1 h-[300px] sm:col-span-2">
          <Spinner size="lg" label="Charegement D'etulisateures" />
        </div>
      )}
      {user && loginUser && users && (
        <Table
          isHeaderSticky
          aria-label="User Table"
          className="border-3 border-gray-400 rounded-lg col-span-1 h-[300px]   lg:max-h-[352px] lg:h-fit sm:col-span-2 overflow-y-auto "
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.uid} align="start">
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody
            items={users}
            emptyContent={
              <span className="font-semibold text-danger ">Aucain utilisateurs trouver</span>
            }
          >
            {users.map((u) => (
              <TableRow key={u.id}>
                <TableCell>
                  {' '}
                  <User
                    avatarProps={{ radius: 'lg', src: u.image || undefined }}
                    description={u.email}
                    name={u.userName}
                    className="dark:text-white"
                  />
                </TableCell>

                <TableCell align="center">
                  {' '}
                  <Chip
                    size="sm"
                    variant="flat"
                    startContent={getRoleIcon(u.role)}
                    color={getRoleColor(u.role)}
                  >
                    {getRoleLabel(u.role)}
                  </Chip>
                </TableCell>
                <TableCell align="center">
                  {' '}
                  <Chip variant="bordered">
                    {connectedClients.includes(u.id) ? (
                      <span className="capitalize text-success">
                        <FaWifi size="18" />
                      </span>
                    ) : (
                      <span className="capitalize text-danger">
                        <FiWifiOff size="18" />
                      </span>
                    )}
                  </Chip>
                </TableCell>
              </TableRow>
            ))}
            {/* {(item) => (
             
                {(columnKey) => }
             
            )} */}
            {/* {users.length === 0 && (
              <TableRow>
                <TableCell colSpan='3'>
                 
                </TableCell>
              </TableRow>
            )} */}
          </TableBody>
        </Table>
      )}
    </>
  )
}
