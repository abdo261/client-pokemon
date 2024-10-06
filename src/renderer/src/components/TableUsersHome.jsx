import React, { useEffect } from 'react'
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
import { getUsers } from '../redux/api/userApi'
import { getRoleColor, getRoleIcon, getRoleLabel } from '../utils/utils'

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

export default function UserTable() {
  const dispatch = useDispatch()
  const { users, loadingGet } = useSelector((state) => state.user)
  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])
  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey]

    switch (columnKey) {
      case 'userName':
        return (
          <User
            avatarProps={{ radius: 'lg', src: user.image || undefined }}
            description={user.email}
            name={cellValue}
            className="dark:text-white"
          />
        )
      case 'status':
        return (
          <Chip variant="bordered">
            <span className="capitalize text-success">online</span>
          </Chip>
        )
      default:
        return (
          <Chip
            size="sm"
            variant="flat"
            startContent={getRoleIcon(cellValue)}
            color={getRoleColor(cellValue)}
          >
            {getRoleLabel(cellValue)}
          </Chip>
        )
    }
  }, [])

  return (
    <>
      {loadingGet && (
        <div className="flex items-center justify-center col-span-1 h-[300px] sm:col-span-2">
          <Spinner size="lg" label="Charegement D'etulisateures" />
        </div>
      )}
      {users && (
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
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
              </TableRow>
            )}
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
