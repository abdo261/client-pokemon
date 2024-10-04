import { Button, Chip, Input, Pagination, Spinner } from '@nextui-org/react'
import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence } from 'framer-motion' // Import AnimatePresence
import Create from './Create' // Create product component
import { LuPanelTopOpen, LuPanelBottomOpen } from 'react-icons/lu'
import { MdCompress, MdFastfood } from 'react-icons/md'
import { BiSolidEdit, BiTrash } from 'react-icons/bi'
import { FiEye, FiSearch } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { deleteProduct, getProducts } from '../../redux/api/productApi' // Replace with actual API
import { useDispatch, useSelector } from 'react-redux'
import swal from 'sweetalert'
import ErrorAlert from '../../components/ErrorAlert'
import { formatDateToDDMMYY, formatMoney, formatTimestamp } from '../../utils/utils'
import { IoBagHandleOutline } from 'react-icons/io5'
import { FaBan } from 'react-icons/fa6'
import defaultImage from '../../assets/images/dfault-image.png'
import { imageURI } from '../../utils/axios'
import { GiBarbecue } from 'react-icons/gi'
import { PiOvenFill } from 'react-icons/pi'
const productTypes = [
  { value: 'CHARBON', label: 'Charbon', icon: <GiBarbecue size={18} /> },
  { value: 'PANINI', label: 'Panini', icon: <MdCompress size={18} /> },
  { value: 'FOUR', label: 'Four', icon: <PiOvenFill size={18} /> }
]
const List = () => {
  const [showCreate, setShowCreate] = useState(false)
  const [isLOadingDelete, seIsLoadingDelete] = useState(false)

  const dispatch = useDispatch()
  const { products, loadingGet, error } = useSelector((state) => state.product)

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  const [searchItem, setSearchItem] = useState('')
  const [page, setPage] = useState(1)
  const rowsPerPage = 8

  const filteredProducts = useMemo(() => {
    return products?.filter((p) => p.name.toLowerCase().includes(searchItem.toLowerCase()))
  }, [searchItem, products])

  const { totalFilteredProducts, pages } = useMemo(() => {
    const filteredProducts = products?.filter((p) =>
      p.name.toLowerCase().includes(searchItem.toLowerCase())
    )

    const totalFilteredProducts = filteredProducts?.length
    const pages = Math.ceil(totalFilteredProducts / rowsPerPage)

    return { totalFilteredProducts, pages, filteredProducts }
  }, [searchItem, products, rowsPerPage])

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage
    return filteredProducts?.slice(start, end)
  }, [page, filteredProducts, rowsPerPage])

  const [itemToDelete, setItemToDelete] = useState(null)

  useEffect(() => {
    if (itemToDelete) {
      swal({
        title: 'Êtes-vous sûr de vouloir supprimer ce produit?',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      }).then((isOk) => {
        if (isOk) {
          seIsLoadingDelete(true)
          dispatch(deleteProduct(itemToDelete, () => seIsLoadingDelete(false)))
        } else {
          setItemToDelete(null)
          seIsLoadingDelete(false)
        }
      })
    }
  }, [itemToDelete, dispatch])
  console.log(products)
  return (
    <section className="w-full flex flex-col gap-3">
      <div className="w-full flex items-center justify-between pb-2">
        <h1 className="text-4xl font-bold underline flex gap-2">
          <MdFastfood /> Produits :
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
            placeholder="Rechercher par nom..."
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
      {products && (
        <Table
          items={items}
          total={totalFilteredProducts}
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
      <div className="my-4 w-full flex">
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

const Table = ({ items, total, setItemToDelete, isLOadingDelete, itemToDelete }) => {
  return (
    <div className="rounded-lg h-[450px] w-full mt-4">
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
                Type
              </th>
              <th className="whitespace-nowrap px-2 py-1 text-gray-900 dark:text-white font-semibold">
                Prix
              </th>
              <th className="whitespace-nowrap px-2 py-1 text-gray-900 dark:text-white font-semibold">
                Disponible
              </th>
              <th className="whitespace-nowrap px-2 py-1 text-gray-900 dark:text-white font-semibold">
                Catégorie
              </th>
              <th className="whitespace-nowrap px-2 py-1 text-gray-900 dark:text-white font-semibold">
                Commandes
              </th>
              <th className="whitespace-nowrap px-2 py-1 text-gray-900 dark:text-white font-semibold">
                Crée le
              </th>
              <th className="whitespace-nowrap px-2 py-1 text-gray-900 dark:text-white">
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
              items.map((p) => (
                <tr className="hover:bg-blue-200 dark:hover:bg-gray-900" key={p.id}>
                  <td className="whitespace-nowrap px-2 py-1 font-medium text-gray-900 dark:text-white w-auto text-start">
                    <div className="self-center text-center">
                      {p.imageFile ? (
                        <img src={`${imageURI}${p.imageFile}`} alt={p.imageFile} className="w-10" />
                      ) : (
                        <img src={defaultImage} alt={p.name} className=" w-20 " />
                      )}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-2 py-1 font-medium text-gray-900 dark:text-white w-auto text-start">
                    <div>{p.name}</div>
                  </td>
                  <td className="whitespace-nowrap px-2 py-1 font-medium text-gray-900 dark:text-white w-auto text-start">
                    <Chip
                      color={p.type ? 'secondary' : 'default'}
                      variant={p.type ? 'bordered' : 'dot'}
                      startContent={p.type ? productTypes.find((t) => t.value === p.type).icon : ''}
                    >
                      {p.type ? productTypes.find((t) => t.value === p.type).label : 'No Type'}
                    </Chip>
                  </td>
                  <td className="whitespace-nowrap px-2 py-1 text-gray-700 dark:text-gray-200 w-auto text-lg font-semibold tracking-widest">
                    {formatMoney(p.price)}
                  </td>
                  <td className="whitespace-nowrap px-2 py-1 text-gray-700 dark:text-gray-200 w-auto text-lg text-center">
                    <Chip color={p.isPublish ? 'success' : 'danger'}>
                      {p.isPublish ? 'oui' : 'non'}
                    </Chip>
                  </td>
                  <td className="whitespace-nowrap px-2 py-1 font-medium text-gray-900 dark:text-white w-auto text-center">
                    <Chip
                      size="lg"
                      variant="bordered"
                      color={p.category ? 'default' : 'danger'}
                      endContent={
                        p.category && (
                          <div
                            className="size-4 rounded-full  mx-auto "
                            style={{ background: p.category.color }}
                          ></div>
                        )
                      }
                    >
                      {p.category ? p.category.name : <FaBan />}
                    </Chip>
                  </td>
                  <td className="whitespace-nowrap px-2 py-1 font-medium text-gray-900 dark:text-white w-auto text-center">
                    <Chip
                      size="lg"
                      variant="bordered"
                      color={p._count.payments === 0 ? 'danger' : 'primary'}
                      endContent={<IoBagHandleOutline size={20} />}
                    >
                      {p._count.payments}
                    </Chip>
                  </td>
                  <td className="whitespace-nowrap px-2 py-1 font-medium text-gray-900 dark:text-white w-auto text-center">
                    {formatTimestamp(p.createdAt)}
                  </td>
                  <td className="whitespace-nowrap px-2 py-1 text-gray-700 dark:text-gray-200 w-full">
                    <div className="flex justify-center w-full items-center gap-2">
                      <Button
                        size="sm"
                        isIconOnly
                        radius="md"
                        className="text-xl"
                        color="warning"
                        variant="ghost"
                        as={Link}
                        to={`/products/update/${p.id}`}
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
                        onPress={() => setItemToDelete(p.id)}
                        isLoading={p.id === itemToDelete ? isLOadingDelete : false}
                        spinner={isLOadingDelete && <Spinner color="danger" size="sm" />}
                      >
                        <BiTrash className=" text-danger group-hover:text-white" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center">
                  <div className="flex items-center justify-center font-semibold text-lg py-5 text-red-500">
                    Aucun produit trouvé
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
