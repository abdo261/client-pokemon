import {
  Button,
  Chip,
  Input,
  Pagination,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner
} from '@nextui-org/react'
import { useEffect, useMemo, useState } from 'react'
import pokeemon from '../assets/images/pokeemon-01.png'
import { MdPhoneInTalk } from 'react-icons/md'
import { BiSolidEdit, BiTrash } from 'react-icons/bi'
import { FiEye, FiSearch } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import swal from 'sweetalert'
import ErrorAlert from '../components/ErrorAlert'
import { IoPrintOutline } from 'react-icons/io5'
import { MdOutlineShop2 } from 'react-icons/md'
import { GiShop } from 'react-icons/gi'

import { formatMoney } from '../utils/utils'
import { PiInvoice } from 'react-icons/pi'
import { deletePayment, getPayments } from '../redux/api/paymentApi'
const ProductInvoice = () => {
  const dispatch = useDispatch()
  const [isLOadingDelete, seIsLoadingDelete] = useState(false)

  const { payments,loadingGet, error  } = useSelector((state) => state.payment)
  const [searchItem, setSearchItem] = useState('')
  const [page, setPage] = useState(1)
  const rowsPerPage = 8

  const filteredPayments = useMemo(() => {
    return payments?.filter((c) => c.id.toString().includes(searchItem))
  }, [searchItem, payments])

  const { totalFilteredPayments, pages } = useMemo(() => {
    const filteredPayments = payments?.filter((c) => c.id.toString().includes(searchItem))

    const totalFilteredPayments = filteredPayments?.length
    const pages = Math.ceil(totalFilteredPayments / rowsPerPage)

    return { totalFilteredPayments, pages, filteredPayments }
  }, [searchItem, payments, rowsPerPage])

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage
    return filteredPayments?.slice(start, end)
  }, [page, filteredPayments, rowsPerPage])
  const [itemToDelete, setItemToDelete] = useState(null)

  useEffect(() => {
    if (itemToDelete) {
      swal({
        title: "Êtes-vous sûr de vouloir supprimer l'utilisateur ?",
        icon: 'warning',
        buttons: true,
        dangerMode: true
      }).then((isOk) => {
        if (isOk) {
          seIsLoadingDelete(true)
          dispatch(deletePayment(itemToDelete, () => seIsLoadingDelete(false)))
        } else {
          setItemToDelete(null)
          seIsLoadingDelete(false)
        }
      })
    }
  }, [itemToDelete, dispatch])
  useEffect(() => {
    dispatch(getPayments())
  }, [])

  return (
    <>
      <div className="flex justify-between gap-3 items-center bg-white  shadow-[0px_0px_7px_-2px_rgba(0,0,0,0.75)] p-3 rounded-lg mt-4 dark:bg-[#43474b] dark:text-white">
        <div className="w-full sm:max-w-[44%]">
          <Input
            fullWidth
            isClearable
            placeholder="Rechercher par N°..."
            startContent={<FiSearch />}
            variant="faded"
            onChange={(e) => setSearchItem(e.target.value)}
            value={searchItem}
            onClear={() => setSearchItem('')}
            size="lg"
            className="tracking-widest"
          />
        </div>
      </div>
      {payments && items && (
        <Table
          items={items}
          totale={totalFilteredPayments}
          setItemToDelete={setItemToDelete}
          itemToDelete={itemToDelete}
          isLOadingDelete={isLOadingDelete}
        />
      )}
      {loadingGet && (
        <div className="py-5 w-full flex justify-center">
          <Spinner size="lg" label="Chargement ..." />
        </div>
      )}
      {error && (
        <div className="w-full ">
          <ErrorAlert message={error} />
        </div>
      )}
      <div className="my-4  w-full flex ">
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
    </>
  )
}

export default ProductInvoice

const Table = ({ items, totale, setItemToDelete, isLOadingDelete, itemToDelete }) => {
  return (
    <div className="rounded-lg  h-[450px]  w-full   mt-4 ">
      <div className="overflow-x-auto rounded-t-lg w-full justify-center shadow-[0px_0px_7px_-2px_rgba(0,0,0,0.75)] rounded-lg">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white  dark:divide-gray-700 dark:bg-[#43474b]  ">
          <thead className="ltr:text-left rtl:text-right ">
            <tr className="font-normal ">
              <th className="whitespace-nowrap px-2 py-1  text-gray-900 dark:text-white font-semibold">
                N°
              </th>
              <th className="whitespace-nowrap px-2 py-1  text-gray-900 dark:text-white font-semibold">
                Prix
              </th>

              <th className="whitespace-nowrap px-2 py-1  text-gray-900 dark:text-white font-semibold">
                Method
              </th>
              {/* <th className="whitespace-nowrap px-2 py-1  text-gray-900 dark:text-white font-semibold">
                  Type
                </th> */}
              <th className="whitespace-nowrap px-2 py-1  text-gray-900 dark:text-white font-semibold">
                Details
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
                    #{f.id}
                  </td>
                  <td className="whitespace-nowrap px-2 py-1 font-medium text-gray-900 dark:text-white w-auto text-start ">
                    <div className="">{formatMoney(f.totalePrice)}</div>
                  </td>
                  <td className="whitespace-nowrap px-2 py-1 font-medium text-gray-900 dark:text-white w-auto text-center">
                    <Chip
                      startContent={f.order ? <MdOutlineShop2 size={18} /> : <GiShop size={18} />}
                      variant="faded"
                      color={f.order ? 'success' : 'danger'}
                    >
                      <span className="font-semibold">{f.order ? 'onligne' : 'offline'}</span>
                    </Chip>
                  </td>
                  {/* <td className="whitespace-nowrap px-2 py-1 font-medium text-gray-900 dark:text-white w-auto text-center">
                      <Chip
                        variant="shadow"
                        classNames={{
                          base:
                            f.type === 'offre'
                              ? 'bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30'
                              : 'bg-gradient-to-br from-orange-700 to-yellow-500 border-small border-white/50 shadow-warning-500/30',
                          content: 'drop-shadow shadow-black text-white'
                        }}
                      >
                        {f.type}
                      </Chip>
                    </td> */}
                  <td className="whitespace-nowrap px-2 py-1 text-gray-700 dark:text-gray-200 w-auto ">
                    <Popover placement="top">
                      <PopoverTrigger>
                        <Button color="default" isIconOnly size="sm" variant="faded">
                          <PiInvoice size={20} />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <div className="px-3 py-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-300  rounded-md w-[320px] md:w[450px] text-sm font-mono">
                          <div className=" mx-auto w-[100px] h-fit">
                            <img src={pokeemon} className="w-full object-cover" />
                          </div>

                          <p className="text-center text-xs">
                            123 Adresse de la rue Tan-Tan, Maroc
                          </p>
                          <p className=" text-xs mb-2 flex items-center gap-2 w-fit mx-auto">
                            <MdPhoneInTalk /> <span> 06 66 66 66 66</span>
                          </p>

                          <div className="border-t border-gray-300 my-2"></div>

                          <p className="text-xs">
                            Date : {new Date(f.createdAt).toLocaleDateString()} à{' '}
                            {new Date(f.createdAt).toLocaleTimeString()}
                          </p>
                          <p className="text-xs mb-2">Facture #{f.id}</p>

                          <div className="border-t border-gray-300 my-2"></div>

                          {/* Table Headers */}
                          <table className="table-auto w-full border-collapse border border-gray-300 text-xs">
                            <thead className="dark:text-black">
                              <tr className="bg-gray-200">
                                <th className="border border-gray-300 px-2 py-1 font-bold">
                                  Article
                                </th>
                                <th className="border border-gray-300 px-2 py-1 font-bold">Qté</th>
                                <th className="border border-gray-300 px-2 py-1 font-bold">Prix</th>
                              </tr>
                            </thead>

                            <tbody>
                              {JSON.parse(f.details)?.map((item) => (
                                <tr key={item.id}>
                                  <td className="border border-gray-300 px-2 py-1 truncate w-full">
                                    {item.name}
                                  </td>
                                  <td className="border border-gray-300 px-2 py-1 text-center">
                                    {item.q}
                                  </td>
                                  <td className="border border-gray-300 px-2 py-1  text-right">
                                    <span className="whitespace-nowrap">
                                      {item.totalePrice} MAD
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>

                            {/* Totals as Footer */}
                            <tfoot>
                              <tr className="font-semibold">
                                <td className="border-t border-gray-300 px-1 py-1 text-left">
                                  Total
                                </td>
                                <td
                                  colSpan="2"
                                  className="border-t border-gray-300 px-1 py-1 text-right"
                                >
                                  {formatMoney(f.totalePrice)}
                                </td>
                              </tr>
                            </tfoot>
                          </table>

                          <div className="border-t border-gray-300 my-2"></div>

                          <p className="text-xs text-center">Merci pour votre achat !</p>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </td>
                  <td className="whitespace-nowrap px-2 py-1 text-gray-700 dark:text-gray-200 w-full ">
                    <div className="flex justify-center w-full items-center gap-2">
                      <Button
                        size="sm"
                        isIconOnly
                        radius="md"
                        className="text-xl"
                        color="secondary"
                        variant="ghost"
                      >
                        <IoPrintOutline />
                      </Button>
                      <Button
                        size="sm"
                        isIconOnly
                        radius="md"
                        className="text-xl"
                        color="primary"
                        variant="ghost"
                        as={Link}
                        to={`/Payments/show/${f.id}`}
                      >
                        <FiEye />
                      </Button>
                      <Button
                        size="sm"
                        isIconOnly
                        radius="md"
                        className="text-xl"
                        color="warning"
                        variant="ghost"
                        as={Link}
                        to={`/Payments/update/${f.id}`}
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
                    aucun Categorie trouvé
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
