import {
  Button,
  Chip,
  Pagination,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner
} from '@nextui-org/react'
import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Create from './Create'
import { LuPanelTopOpen, LuPanelBottomOpen } from 'react-icons/lu'
import { BiSolidEdit, BiTrash } from 'react-icons/bi'
import { FiEye } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { deleteOffer, getOffers } from '../../redux/api/offerApi'
import { useDispatch, useSelector } from 'react-redux'
import swal from 'sweetalert'
import ErrorAlert from '../../components/ErrorAlert'
import defaultImage from '../../assets/images/dfault-image.png'
import { imageURI } from '../../utils/axios'
import { MdFastfood } from 'react-icons/md'

import { productTypes } from '../../utils/utils'

const List = () => {
  const [showCreate, setShowCreate] = useState(false)
  const dispatch = useDispatch()
  const { offers, loadingGet, error } = useSelector((state) => state.offer)

  useEffect(() => {
    dispatch(getOffers())
  }, [dispatch])

  const [page, setPage] = useState(1)
  const rowsPerPage = 8

  const { totalFilteredOffers, pages } = useMemo(() => {
    const totalFilteredOffers = offers?.length // No filtering now
    const pages = Math.ceil(totalFilteredOffers / rowsPerPage)
    return { totalFilteredOffers, pages }
  }, [offers, rowsPerPage])

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage
    return offers?.slice(start, end)
  }, [page, offers, rowsPerPage])

  const [itemToDelete, setItemToDelete] = useState(null)

  useEffect(() => {
    if (itemToDelete) {
      swal({
        title: "Êtes-vous sûr de vouloir supprimer l'offre ?",
        icon: 'warning',
        buttons: true,
        dangerMode: true
      }).then((isOk) => {
        if (isOk) {
          dispatch(deleteOffer(itemToDelete))
        }
        setItemToDelete(null)
      })
    }
  }, [itemToDelete, dispatch])

  return (
    <section className="w-full flex flex-col gap-3">
      <div className="w-full flex items-center justify-between pb-2">
        <h1 className="text-4xl font-bold underline flex gap-2">Packes :</h1>
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
      {offers && items && (
        <Table items={items} total={totalFilteredOffers} setItemToDelete={setItemToDelete} />
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
      <div className="my-4 w-full flex ">
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

const Table = ({ items, total, setItemToDelete }) => {
  return (
    <div className="rounded-lg h-[450px] w-full mt-4 ">
      <div className="overflow-x-auto rounded-t-lg w-full justify-center shadow-[0px_0px_7px_-2px_rgba(0,0,0,0.75)] rounded-lg">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white dark:divide-gray-700 dark:bg-[#43474b]">
          <thead className="ltr:text-left rtl:text-right">
            <tr className="font-normal">
              <th className="whitespace-nowrap px-2 py-1 text-gray-900 dark:text-white font-semibold">
                Image
              </th>
              <th className="whitespace-nowrap px-2 py-1 text-gray-900 dark:text-white font-semibold">
                Nom
              </th>
              <th className="whitespace-nowrap px-2 py-1 text-gray-900 dark:text-white font-semibold">
                Produits
              </th>
              <th className="whitespace-nowrap px-2 py-1 text-gray-900 dark:text-white font-semibold">
                Prix
              </th>
              <th className="whitespace-nowrap px-2 py-1 text-gray-900 dark:text-white font-semibold">
                Disponible
              </th>
              <th className="whitespace-nowrap px-2 py-1 text-gray-900 dark:text-white ">
                <div className="w-full flex justify-end">
                  {true && (
                    <Chip variant="flat" color="success" size="lg">
                      Total <span className="font-semibold">{total}</span>
                    </Chip>
                  )}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700 font-sans tracking-wide">
            {items.length > 0 ? (
              items.map((o) => (
                <tr className="hover:bg-blue-200 dark:hover:bg-gray-900" key={o.id}>
                  <td className="whitespace-nowrap px-2 py-1 font-medium text-gray-900 dark:text-white w-auto text-start">
                    {o.imageFile ? (
                      <img src={`${imageURI}${o.imageFile}`} alt={o.imageFile} className="w-10" />
                    ) : (
                      <img src={defaultImage} alt={o.name} className="w-20" />
                    )}
                  </td>
                  <td className="whitespace-nowrap px-2 py-1 text-gray-700 dark:text-gray-200 w-auto capitalize">
                    {o.name}
                  </td>
                  <td className="whitespace-nowrap px-2 py-1 font-medium text-gray-900 dark:text-white w-auto text-center">
                    <Popover placement="right-end" showArrow={true}>
                      <PopoverTrigger>
                        <Button isIconOnly color="warning" variant="shadow">
                          <MdFastfood size={20} />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="border-gray-400 border-2">
                        <div className="flex flex-col items-start dark:text-white gap-1">
                          {o.products &&
                            o.products.map((p) => (
                              <div
                                className=" flex items-center justify-start gap-2 w-full rounded-lg border-1 p-1 border-gray-300 "
                                key={p.id}
                              >
                                {p.imageFile ? (
                                  <img
                                    src={`${imageURI}${p.imageFile}`}
                                    alt={p.imageFile}
                                    className="w-14"
                                  />
                                ) : (
                                  <img src={defaultImage} alt={p.name} className=" w-12 " />
                                )}
                                <p>
                                  <p className="text-lg font-semibold capitalize">
                                    {p.category.name + ' ' + p.name}
                                  </p>{' '}
                                  <Chip
                                    size="sm"
                                    color={p.type ? 'secondary' : 'default'}
                                    variant={p.type ? 'bordered' : 'dot'}
                                    startContent={
                                      p.type
                                        ? productTypes.find((t) => t.value === p.type).icon
                                        : ''
                                    }
                                  >
                                    {p.type
                                      ? productTypes.find((t) => t.value === p.type).label
                                      : 'No Type'}
                                  </Chip>
                                </p>
                              </div>
                            ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </td>{' '}
                  <td className="whitespace-nowrap px-2 py-1 text-gray-700 dark:text-gray-200 w-auto">
                    <Chip>{o.price} DH</Chip>
                  </td>{' '}
                  <td className="whitespace-nowrap px-2 py-1 text-gray-700 dark:text-gray-200 w-auto text-lg text-center">
                    <Chip color={o.isPublish ? 'success' : 'danger'}>
                      {o.isPublish ? 'oui' : 'non'}
                    </Chip>
                  </td>
                  <td className="whitespace-nowrap px-2 py-1 text-gray-700 dark:text-gray-200 w-full ">
                    <div className="flex justify-center w-full items-center gap-2">
                      <Button
                        size="sm"
                        isIconOnly
                        radius="md"
                        className="text-xl"
                        color="primary"
                        variant="ghost"
                        as={Link}
                        to={`/offers/show/${o.id}`}
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
                        to={`/offers/update/${o.id}`}
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
                        onClick={() => setItemToDelete(o.id)}
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
