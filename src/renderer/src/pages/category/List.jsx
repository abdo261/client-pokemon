import { Button, Chip, Input, Pagination, Spinner } from '@nextui-org/react'
import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence } from 'framer-motion' 
import Create from './Create'
import { LuPanelTopOpen, LuPanelBottomOpen } from 'react-icons/lu'
import { MdFastfood, MdOutlineCategory } from 'react-icons/md'
import { BiSolidEdit, BiTrash } from 'react-icons/bi'
import { FiEye, FiSearch } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { deleteCategory, getCategories } from '../../redux/api/categoryApi'
import { useDispatch, useSelector } from 'react-redux'
import swal from 'sweetalert'
import ErrorAlert from '../../components/ErrorAlert'
import defaultImage from '../../assets/images/dfault-image.png'
import { imageURI } from '../../utils/axios'

const List = () => {
  const [showCreate, setShowCreate] = useState(false)
  const dispatch = useDispatch()
  const { categories, loadingGet, error } = useSelector((state) => state.category)
  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])
  const [searchItem, setSearchItem] = useState('')
  const [page, setPage] = useState(1)
  const rowsPerPage = 8
  const [isLOadingDelete, seIsLoadingDelete] = useState(false)

  const filteredCategories = useMemo(() => {
    return categories?.filter((c) => c.name.toLowerCase().includes(searchItem.toLowerCase()))
  }, [searchItem, categories])

  const { totalFilteredCategories, pages } = useMemo(() => {
    const filteredCategories = categories?.filter((c) =>
      c.name.toLowerCase().includes(searchItem.toLowerCase())
    )

    const totalFilteredCategories = filteredCategories?.length
    const pages = Math.ceil(totalFilteredCategories / rowsPerPage)

    return { totalFilteredCategories, pages, filteredCategories }
  }, [searchItem, categories, rowsPerPage])

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage
    return filteredCategories?.slice(start, end)
  }, [page, filteredCategories, rowsPerPage])
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
          dispatch(deleteCategory(itemToDelete,() => seIsLoadingDelete(false)))
        }else {
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
          <MdOutlineCategory /> Catégories :
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
      {categories && items && (
        <Table items={items} totale={totalFilteredCategories} setItemToDelete={setItemToDelete}    
        itemToDelete={itemToDelete}
        isLOadingDelete={isLOadingDelete} />
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
    </section>
  )
}

export default List

const Table = ({ items, totale, setItemToDelete, isLOadingDelete, itemToDelete }) => {
  return (
    <div className="rounded-lg  h-[450px]  w-full   mt-4 ">
      <div className="overflow-x-auto rounded-t-lg w-full justify-center shadow-[0px_0px_7px_-2px_rgba(0,0,0,0.75)] rounded-lg">
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
                Couleur
              </th>

              <th className="whitespace-nowrap px-2 py-1  text-gray-900 dark:text-white font-semibold">
                Produits
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
                    {f.imageFile ? (
                      <img src={`${imageURI}${f.imageFile}`} alt={f.imageFile} className="w-10" />
                    ) : (
                      <img src={defaultImage} alt={f.name} className=" w-20 " />
                    )}
                  </td>
                  <td className="whitespace-nowrap px-2 py-1 font-medium text-gray-900 dark:text-white w-auto text-start ">
                    <div className="capitalize">{f.name}</div>
                  </td>
                  <td className="whitespace-nowrap px-2 py-1 text-gray-700 dark:text-gray-200 w-auto ">
                    <div
                      className="size-6 rounded-full  mx-auto border-1 border-black"
                      style={{ background: f.color }}
                    ></div>
                  </td>
                  <td className="whitespace-nowrap px-2 py-1 font-medium text-gray-900 dark:text-white w-auto text-center">
                    <Chip
                      size="lg"
                      variant="flat"
                      startContent={<MdFastfood />}
                      color={f?._count?.products == 0 ? 'danger' : 'default'}
                    >
                      <span className="font-semibold "> {f?._count?.products}</span>
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
                        to={`/categories/show/${f.id}`}
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
                        to={`/categories/update/${f.id}`}
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
