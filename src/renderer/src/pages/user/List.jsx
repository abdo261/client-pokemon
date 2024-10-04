import { Avatar, Button, Chip, Input, Pagination, Spinner } from '@nextui-org/react'
import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Create from './Create'
import { LuPanelTopOpen, LuPanelBottomOpen } from 'react-icons/lu'
import { BiSolidEdit, BiTrash } from 'react-icons/bi'
import { FiEye, FiSearch } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import swal from 'sweetalert'
import { FaUserShield } from 'react-icons/fa6'
import { getRoleColor, getRoleIcon, getRoleLabel } from '../../utils/utils'
import { getUsers, deleteUser } from '../../redux/api/userApi' // Assuming you have these APIs
import ErrorAlert from '../../components/ErrorAlert'

const List = () => {
  const [showCreate, setShowCreate] = useState(false)
  const [isLOadingDelete, seIsLoadingDelete] = useState(false)

  const [searchItem, setSearchItem] = useState('')
  const [page, setPage] = useState(1)
  const rowsPerPage = 6
  const dispatch = useDispatch()

  // Fetching users from redux store
  const { users,error,loadingGet } = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(getUsers()) // Fetch users on component mount
  }, [dispatch])

  // Filtering users based on search
  const filteredUsers = useMemo(() => {
    return users?.filter((user) => user.userName.toLowerCase().includes(searchItem.toLowerCase()))
  }, [searchItem, users])

  // Calculate pagination details
  const { totalFilteredUsers, pages } = useMemo(() => {
    const totalFilteredUsers = filteredUsers?.length
    const pages = Math.ceil(totalFilteredUsers / rowsPerPage)
    return { totalFilteredUsers, pages }
  }, [filteredUsers, rowsPerPage])

  // Slice the users to display based on pagination
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage
    return filteredUsers?.slice(start, end)
  }, [page, filteredUsers])

  // Handle user deletion
  const [itemToDelete, setItemToDelete] = useState(null)
  useEffect(() => {
    if (itemToDelete) {
      swal({
        title: 'Are you sure you want to delete this user?',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      }).then((isOk) => {
        if (isOk) {
          seIsLoadingDelete(true)
          dispatch(deleteUser(itemToDelete, () => seIsLoadingDelete(false))) // Assuming deleteUser is the API action
        }
        else {
          setItemToDelete(null)
          seIsLoadingDelete(false)
        }
      })
    }
  }, [itemToDelete, dispatch])

  return (
    <section className="w-full flex flex-col gap-3">
      <div className="w-full flex items-center justify-between pb-2">
        <h1 className="text-4xl font-bold underline flex gap-2">
          <FaUserShield /> Utilisateurs:
        </h1>
        <Button
          color="primary"
          className="font-bold"
          variant="flat"
          onClick={() => setShowCreate(!showCreate)}
          isIconOnly
        >
          {showCreate ? <LuPanelBottomOpen size={25} /> : <LuPanelTopOpen size={25} />}
        </Button>
      </div>
      <AnimatePresence>
        {showCreate && <Create onClose={() => setShowCreate(false)} />}
      </AnimatePresence>
      <div className="flex justify-between gap-3 items-center bg-white shadow-[0px_0px_7px_-2px_rgba(0,0,0,0.75)] p-3 rounded-lg mt-4 dark:bg-[#43474b] dark:text-white">
        <div className="w-full sm:max-w-[44%]">
          <Input
            fullWidth
            isClearable
            placeholder="Search by name..."
            startContent={<FiSearch />}
            variant="faded"
            onChange={(e) => setSearchItem(e.target.value)}
            value={searchItem}
            onClear={() => setSearchItem('')}
          sm
            className="tracking-widest"
          />
        </div>
      </div>
      {loadingGet && (
        <div className="py-5 w-full flex justify-center">
          <Spinner size="lg" label="Chargement ..." />
        </div>
      )}
      {error && <ErrorAlert message={error} />}
      {users &&
        (items ? (
          <Table items={items} total={totalFilteredUsers} setItemToDelete={setItemToDelete} itemToDelete={itemToDelete}
          isLOadingDelete={isLOadingDelete} />
        ) : (
          'Loading...'
        ))}
      <div className="my-4 w-full flex justify-center">
        {pages > 1 && (
          <Pagination
            showControls
            isCompact
            total={pages}
            page={page}
            onChange={(page) => setPage(page)}
            showShadow
          />
        )}
      </div>
    </section>
  )
}

export default List

const Table = ({ items, totale, setItemToDelete ,isLOadingDelete, itemToDelete}) => {
  return (
    <div className="rounded-lg  h-[450px]  w-full   mt-4 ">
      <div className="overflow-x-auto rounded-t-lg w-full justify-center shadow-[0px_0px_7px_-2px_rgba(0,0,0,0.75)]">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white  dark:divide-gray-700 dark:bg-[#43474b]  ">
          <thead className="ltr:text-left rtl:text-right ">
            <tr className="font-normal ">
              <th className="whitespace-nowrap px-2 py-1  text-gray-900 dark:text-white font-semibold">
                Image
              </th>
              <th className="whitespace-nowrap px-2 py-1  text-gray-900 dark:text-white font-semibold">
                Nom
              </th>
              <th className="whitespace-nowrap px-2 py-1  text-gray-900 dark:text-white font-semibold">
                Téléphone
              </th>
              <th className="whitespace-nowrap px-2 py-1  text-gray-900 dark:text-white font-semibold">
                Email
              </th>

              <th className="whitespace-nowrap px-2 py-1  text-gray-900 dark:text-white font-semibold">
                Role
              </th>
              <th className="whitespace-nowrap px-2 py-1  text-gray-900 dark:text-white ">
                <div className="w-full flex justify-end">
                  {true && (
                    <Chip variant="flat" color="success" size="lg">
                      Total <span className="font-semibold"> {totale}</span>
                    </Chip>
                  )}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700 font-sans tracking-wide">
            {items.length > 0 ? (
              items.map((f) => (
                <tr className="hover:bg-blue-200 dark:hover:bg-gray-900" key={f.id}>
                  <td className="whitespace-nowrap px-2 py-1 font-medium text-gray-900 dark:text-white w-auto text-start  ">
                    <div className=" self-center  text-center">
                      {f.image ? (
                        <img src={f.image} alt="tacos" className="object-cover h-[50px]" />
                      ) : (
                        <Avatar size='sm' />
                      )}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-2 py-1 font-medium text-gray-900 dark:text-white w-auto text-start ">
                    <div className="">{f.userName}</div>
                  </td>
                  <td className="whitespace-nowrap px-2 py-1 font-medium text-gray-900 dark:text-white w-auto text-start ">
                    <div className="">{f.phone}</div>
                  </td>
                  <td className="whitespace-nowrap px-2 py-1 text-gray-700 dark:text-gray-200 w-auto ">
                    {f.email}
                  </td>
                  <td className="whitespace-nowrap px-2 py-1 font-medium text-gray-900 dark:text-white w-auto text-center">
                    <Chip
                      size="sm"
                      variant="flat"
                      startContent={getRoleIcon(f.role)}
                      color={getRoleColor(f.role)}
                    >
                      {getRoleLabel(f.role)}
                    </Chip>
                  </td>

                  <td className="whitespace-nowrap px-2 py-1 text-gray-700 dark:text-gray-200 w-full ">
                    <div className="flex justify-center w-full items-center gap-2">
                     
                      <Button
                        size="sm"
                        isIconOnly
                        radius="md"
                        className="text-xl"
                        color="warning"
                        variant="ghost"
                        as={Link}
                        to={`/users/update/${f.id}`}
                      >
                        <BiSolidEdit />
                      </Button>
                      <Button
                        size="sm"
                        isIconOnly
                        radius="md"
                        className="text-xl group"
                        color="danger"
                        variant="ghost"
                        onClick={() => setItemToDelete(f.id)}
                        isLoading={f.id === itemToDelete ? isLOadingDelete : false}
                        spinner={isLOadingDelete && <Spinner color="danger" size="sm" />}
                      >
                        <BiTrash className="text-danger group-hover:text-white" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>
                  <div className="flex itesm-center justify-center font-semibold text-lg py-5 text-red-500">
                    aucun Utilisateur trouvé
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
