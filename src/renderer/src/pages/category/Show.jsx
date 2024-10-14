import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getCategoryById } from '../../redux/api/categoryApi'
import { Chip, Input, Pagination, Spinner } from '@nextui-org/react'
import ErrorAlert from '../../components/ErrorAlert'
import { MdOutlineCategory } from 'react-icons/md'
import { FiEye, FiSearch } from 'react-icons/fi'
import { imageURI } from '../../utils/axios'
import defaultImage from '../../assets/images/dfault-image.png'
import { formatMoney, formatTimestamp, productTypes } from '../../utils/utils'
import { IoBagHandleOutline } from 'react-icons/io5'

const Show = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { category, loadingGet, error } = useSelector((state) => state.category)
  useEffect(() => {
    dispatch(getCategoryById(id))
  }, [])
  const [searchItem, setSearchItem] = useState('')
  const [page, setPage] = useState(1)
  const rowsPerPage = 8

  const filteredProducts = useMemo(() => {
    return category?.products?.filter((c) =>
      c.name.toLowerCase().includes(searchItem.toLowerCase())
    )
  }, [searchItem, category?.products])

  const { totalFilteredProducts, pages } = useMemo(() => {
    const filteredProducts = category?.products?.filter((c) =>
      c.name.toLowerCase().includes(searchItem.toLowerCase())
    )

    const totalFilteredProducts = filteredProducts?.length
    const pages = Math.ceil(totalFilteredProducts / rowsPerPage)

    return { totalFilteredProducts, pages, filteredProducts }
  }, [searchItem, category?.products, rowsPerPage])

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage
    return filteredProducts?.slice(start, end)
  }, [page, filteredProducts, rowsPerPage])
  console.log(category)
  return (
    <div className="w-full">
      {
        <section className="w-full flex flex-col gap-3">
          <div className="w-full flex items-center justify-between pb-2">
            <h1 className="text-4xl font-bold underline flex gap-2 capitalize">
              <FiEye />
              {loadingGet ? <Spinner size="sm" /> :(category &&  category.name)}:
            </h1>
          </div>

          <div className="flex justify-between gap-3 items-center bg-white  shadow-[0px_0px_7px_-2px_rgba(0,0,0,0.75)] p-3 rounded-lg mt-4 dark:bg-[#43474b] dark:text-white">
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
          {category && items && <Table items={items} totale={totalFilteredProducts} />}
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
        </section>
      }
    </div>
  )
}
const Table = ({ items, total }) => {
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
                    <div className="capitalize">
                      {p.category ? p.category.name + ' ' + p.name : p.name}
                    </div>
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
                      color={p._count.payments === 0 ? 'danger' : 'primary'}
                      endContent={<IoBagHandleOutline size={20} />}
                    >
                      {p._count.payments}
                    </Chip>
                  </td>
                  <td className="whitespace-nowrap px-2 py-1 font-medium text-gray-900 dark:text-white w-auto text-center">
                    {formatTimestamp(p.createdAt)}
                  </td>
                  <td className="whitespace-nowrap px-2 py-1 text-gray-700 dark:text-gray-200 w-full"></td>
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
export default Show
