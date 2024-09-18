import { Button, Chip, Input, Pagination, Select, SelectItem } from '@nextui-org/react'
import { useMemo, useState } from 'react'
import { AnimatePresence } from 'framer-motion' // Import AnimatePresence
import Create from './Create'
import { LuPanelTopOpen, LuPanelBottomOpen } from 'react-icons/lu'
import { MdFastfood, MdOutlineCategory } from 'react-icons/md'
import { BiSolidEdit, BiTrash } from 'react-icons/bi'
import { FiEye, FiSearch } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import tacos from '../../assets/images/tacosrm.png'
import { PiMoneyWavy } from 'react-icons/pi'

const categories = [
  { id: 1, name: 'Tacos', productCount: 12, image: tacos },
  { id: 2, name: 'Pizza', productCount: 0, image: tacos },
  { id: 3, name: 'Sandwich', productCount: 6, image: tacos },
  { id: 4, name: 'Pasticho', productCount: 0, image: tacos },
  { id: 5, name: 'Salade', productCount: 0, image: tacos },
  { id: 6, name: 'Boisson', productCount: 0, image: tacos },
  { id: 7, name: 'Assiette', productCount: 0, image: null },
  { id: 8, name: 'Assiette', productCount: 0, image: null },
  { id: 9, name: 'Assiette', productCount: 0, image: null }
]
const products = [
  {
    id: 1,
    name: 'Tacos mix',
    category: { id: 1, name: 'Tacos', productCount: 12, image: tacos },
    image: tacos,
    price: 30
  },
  {
    id: 2,
    name: 'Pizza fruit de mére',
    category: { id: 2, name: 'Pizza', productCount: 0, image: tacos },
    image: tacos,
    price: 40
  },
  {
    id: 3,
    name: 'Sandwich thon',
    category: { id: 3, name: 'Sandwich', productCount: 6, image: tacos },
    image: tacos,
    price: 15
  },
  {
    id: 4,
    name: 'Pasticho fromage',
    category: { id: 4, name: 'Pasticho', productCount: 0, image: tacos },
    image: tacos,
    price: 20
  },
  {
    id: 5,
    name: 'Salade nisoize',
    category: { id: 5, name: 'Salade', productCount: 0, image: tacos },
    image: tacos,
    price: 32
  },
  {
    id: 6,
    name: "juis d'orange ",
    category: { id: 6, name: 'Boisson', productCount: 0, image: tacos },
    image: tacos,
    price: 10
  },
  {
    id: 7,
    name: 'Assiette polet',
    category: { id: 7, name: 'Assiette', productCount: 0, image: null },
    image: tacos,
    price: 20
  },
  {
    id: 8,
    name: 'Assiette polet',
    category: { id: 8, name: 'Assiette', productCount: 0, image: null },
    image: tacos,
    price: 20
  },
  {
    id: 9,
    name: 'Assiette polet',
    category: { id: 9, name: 'Assiette', productCount: 0, image: null },
    image: tacos,
    price: 20
  }
]
const List = () => {
  const [showCreate, setShowCreate] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)

  const [searchItem, setSearchItem] = useState('')
  const [page, setPage] = useState(1)
  const rowsPerPage = 6

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchItem.toLowerCase())
      const matchesCategory = selectedCategory ? product.category.id === selectedCategory : true
      return matchesSearch && matchesCategory
    })
  }, [searchItem, selectedCategory, products])

  const { totalFilteredProducts, pages } = useMemo(() => {
    const filteredProducts = products?.filter((c) =>
      c.name.toLowerCase().includes(searchItem.toLowerCase())
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

  return (
    <section className="w-full flex flex-col gap-3">
      <div className="w-full flex items-center justify-between pb-2">
        <h1 className="text-4xl font-bold underline flex gap-2">
          <MdOutlineCategory /> Produits :
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
        <Input
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
        <Select
          placeholder="filtré par categorie"
          size="lg"
          className="tracking-widest"
          variant="faded"
          startContent={<MdOutlineCategory />}
          onChange={(e) => setSelectedCategory(parseInt(e.target.value))}
          aria-label="sategory"
        >
          <SelectItem
            key="all"
            value={''}
            className="dark:text-white"
            startContent={
              <div className=" self-center  text-center">
                <MdOutlineCategory MdFastfood size={40} className="self-center m-1 mx-auto " />
              </div>
            }
          >
            Tous
          </SelectItem>
          {categories.map((category) => (
            <SelectItem
              key={category.id}
              value={category.id}
              className="dark:text-white"
              startContent={
                <div className=" self-center  text-center">
                  {category.image ? (
                    <img src={category.image} alt="tacos" className="object-cover h-[50px]" />
                  ) : (
                    <MdOutlineCategory MdFastfood size={40} className="self-center m-1 mx-auto" />
                  )}
                </div>
              }
            >
              {category.name}
            </SelectItem>
          ))}
        </Select>
      </div>
      {items ? <Table items={items} totale={totalFilteredProducts} /> : 'loading'}
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

const Table = ({ items, totale }) => {
  return (
    <div className="rounded-lg  h-[450px]   w-full   mt-4 ">
      <div className="overflow-x-auto rounded-t-lg w-full justify-center shadow-[0px_0px_7px_-2px_rgba(0,0,0,0.75)]">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white  dark:divide-gray-700 dark:bg-[#43474b] text-xl ">
          <thead className="ltr:text-left rtl:text-right text-2xl">
            <tr className="font-normal ">
              <th className="whitespace-nowrap px-4 py-2  text-gray-900 dark:text-white font-semibold">
                Image
              </th>
              <th className="whitespace-nowrap px-4 py-2  text-gray-900 dark:text-white font-semibold">
                Nom
              </th>
              <th className="whitespace-nowrap px-4 py-2  text-gray-900 dark:text-white font-semibold">
                Category
              </th>

              <th className="whitespace-nowrap px-4 py-2  text-gray-900 dark:text-white font-semibold">
                Price
              </th>
              <th className="whitespace-nowrap px-4 py-2  text-gray-900 dark:text-white ">
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
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white w-auto text-start  ">
                    <div className=" self-center  text-center">
                      {f.image ? (
                        <img src={f.image} alt="tacos" className="object-cover h-[50px]" />
                      ) : (
                        <MdFastfood size={40} className="self-center mx-auto" />
                      )}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white w-auto text-start ">
                    <div className="text-xl">{f.name}</div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200 w-auto ">
                    <Chip
                      size="lg"
                      variant="bordered"
                      startContent={<MdOutlineCategory />}
                      endContent={
                        <div
                          className="size-4 rounded-full border-1 border-gray-800"
                          style={{ backgroundColor: 'chocolate' }}
                        ></div>
                      }
                    >
                      <span className="font-semibold "> {f.category.name}</span>
                    </Chip>
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white w-auto text-center">
                    <Chip
                      size="lg"
                      variant="flat"
                      startContent={<PiMoneyWavy color="green" />}
                      endContent={<span>MAD</span>}
                      color={f.price == 0 ? 'danger' : 'default'}
                    >
                      <span className="font-semibold "> {f.price}</span>
                    </Chip>
                  </td>

                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200 w-full ">
                    <div className="flex justify-center w-full items-center gap-2">
                      <Button
                        size="sm"
                        isIconOnly
                        radius="md"
                        className="text-xl"
                        color="primary"
                        variant="ghost"
                        as={Link}
                        to={`/products/show/${f.id}`}
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
                        to={`/products/update/${f.id}`}
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
                        // onClick={() => setItemToDelete(f.id)}
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
