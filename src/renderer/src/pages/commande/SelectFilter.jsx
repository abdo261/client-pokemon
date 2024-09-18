import {
  Badge,
  Card,
  CardBody,
  CardFooter,
  Chip,
  Image,
  Input,
  Select,
  SelectItem,
  Tooltip
} from '@nextui-org/react'
import { FiSearch } from 'react-icons/fi'
import { MdOutlineCategory } from 'react-icons/md'
import tacos from '../../assets/images/tacosrm.png'
import { IoBagHandleOutline } from 'react-icons/io5'
import { useState } from 'react'
import Results from './Results'
import { checkIfSelected } from '../../utils/utils'

export const products = [
  // Existing Products
  {
    id: 1,
    name: 'Tacos mix',
    categoryId: 1,
    image: tacos,
    price: 30
  },
  {
    id: 2,
    name: 'Pizza fruit de mére',
    categoryId: 2,
    image: tacos,
    price: 40
  },
  {
    id: 3,
    name: 'Sandwich thon',
    categoryId: 3,
    image: tacos,
    price: 15
  },
  {
    id: 4,
    name: 'Pasticho fromage',
    categoryId: 4,
    image: tacos,
    price: 20
  },
  {
    id: 5,
    name: 'Salade nisoize',
    categoryId: 5,
    image: tacos,
    price: 32
  },
  {
    id: 6,
    name: "Jus d'orange",
    categoryId: 6,
    image: tacos,
    price: 10
  },
  {
    id: 7,
    name: 'Assiette poulet',
    categoryId: 7,
    image: tacos,
    price: 20
  },

  // New Fast Food Products
  // Category: Tacos
  {
    id: 8,
    name: 'Tacos poulet',
    categoryId: 1,
    image: tacos,
    price: 25
  },
  {
    id: 9,
    name: 'Tacos boeuf',
    categoryId: 1,
    image: tacos,
    price: 28
  },
  {
    id: 10,
    name: 'Tacos végétarien',
    categoryId: 1,
    image: tacos,
    price: 22
  },

  // Category: Pizza
  {
    id: 11,
    name: 'Pizza pepperoni',
    categoryId: 2,
    image: tacos,
    price: 35
  },
  {
    id: 12,
    name: 'Pizza margherita',
    categoryId: 2,
    image: tacos,
    price: 30
  },

  // Category: Sandwich
  {
    id: 13,
    name: 'Sandwich poulet',
    categoryId: 3,
    image: tacos,
    price: 18
  },
  {
    id: 14,
    name: 'Sandwich fromage',
    categoryId: 3,
    image: tacos,
    price: 14
  },

  // Category: Pasticho
  {
    id: 15,
    name: 'Pasticho viande',
    categoryId: 4,
    image: tacos,
    price: 22
  },

  // Category: Salade
  {
    id: 16,
    name: 'Salade César',
    categoryId: 5,
    image: tacos,
    price: 28
  },

  // Category: Boisson
  {
    id: 17,
    name: "Jus de pomme",
    categoryId: 6,
    image: tacos,
    price: 12
  },

  // Category: Assiette
  {
    id: 18,
    name: 'Assiette viande',
    categoryId: 7,
    image: tacos,
    price: 25
  }
]

export const categories = [
  { id: 1, name: 'Tacos', productCount: 12, image: tacos },
  { id: 2, name: 'Pizza', productCount: 0, image: tacos },
  { id: 3, name: 'Sandwich', productCount: 6, image: tacos },
  { id: 4, name: 'Pasticho', productCount: 0, image: tacos },
  { id: 5, name: 'Salade', productCount: 0, image: tacos },
  { id: 6, name: 'Boisson', productCount: 0, image: tacos },
  { id: 7, name: 'Assiette', productCount: 0, image: null }
]

const SelectFilter = () => {
  const [formData, setFormData] = useState({
    details: null,
    productsIds: [],
    totalePrice: '',
    factureId: '',
    status: ''
  })
  const [selectedCategory, setSelectedCategory] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory ? product.categoryId === selectedCategory : true) &&
      (searchQuery
        ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.id.toString().includes(searchQuery)
        : true)
  )

  const handleSelect = (id) => {
    setFormData((prev) => ({
      ...prev,
      productsIds: checkIfSelected(id, prev.productsIds)
        ? prev.productsIds.filter((p) => p !== id)
        : [...prev.productsIds, id]
    }))
  }
  

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-[60%_auto] gap-2">
      <div className="h-[600px] bg-white rounded-lg overflow-hidden overflow-y-auto p-4 dark:bg-[#242526] dark:text-white relative border-3 border-gray-600">
        <div className="w-full rounded-lg grid grid-cols-2 gap-1 md:gap-3 sticky top-0 z-20 bg-gray-200 dark:text-white dark:bg-gray-600 border-3 border-gray-600">
          <div className="my-4 ml-4">
            <Input
              isClearable
              placeholder="Rechercher par nom ou ID..."
              startContent={<FiSearch />}
              variant="faded"
              size="lg"
              className="tracking-widest"
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              onClear={() => setSearchQuery('')}
            />
          </div>
          <div className="my-4 mr-4">
            <Select
              placeholder="Filtré par catégorie"
              size="lg"
              className="tracking-widest"
              variant="faded"
              startContent={<MdOutlineCategory />}
              onChange={(e) => setSelectedCategory(parseInt(e.target.value) || '')}
              aria-label="category"
            >
              <SelectItem
                key="all"
                value=""
                className="dark:text-white"
                startContent={
                  <div className="self-center text-center">
                    <MdOutlineCategory size={40} className="self-center m-1 mx-auto" />
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
                    <div className="self-center text-center">
                      {category.image ? (
                        <img
                          src={category.image}
                          alt={category.name}
                          className="object-cover h-[50px]"
                        />
                      ) : (
                        <MdOutlineCategory size={40} className="self-center m-1 mx-auto" />
                      )}
                    </div>
                  }
                >
                  {category.name}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>

        <div className="gap-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 my-4">
          {filteredProducts.map((item, index) => (
            <Tooltip
              color="foreground"
              content={item.name}
              showArrow
              size="lg"
              closeDelay={0}
              delay={0}
              key={item.id}
            >
              <Card
                shadow="md"
                isPressable
                onPress={() => handleSelect(item.id)}
                className={`border-1 dark:border-gray-500 ${checkIfSelected(item.id, formData.productsIds) && "bg-warning"}`}
                
              >
                <CardBody className="overflow-visible p-0">
                  <Image
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    alt={item.name}
                    className="w-full object-cover h-[100px] md:h-[140px]"
                    src={item.image || tacos}
                  />
                </CardBody>

                <CardFooter className="text-sm justify-between tracking-widest">
                  <b className="flex-1 text-ellipsis whitespace-nowrap overflow-hidden text-start">
                    {item.name}
                  </b>
                  <p className="text-default-500 text-sm font-semibold">MAD {item.price}</p>
                </CardFooter>
              </Card>
            </Tooltip>
          ))}
        </div>
      </div>
      <Results formData={formData} products={products} handelSelect={handleSelect} />
    </div>
  )
}

export default SelectFilter
