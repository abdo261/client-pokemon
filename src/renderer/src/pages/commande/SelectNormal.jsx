import { Accordion, AccordionItem, Checkbox, Input, Select, SelectItem } from '@nextui-org/react'
import React, { useState } from 'react'
import tacos from '../../assets/images/tacosrm.png'
import { products } from './SelectFilter'
import { checkIfSelected } from '../../utils/utils'
import Results from './Results'
import { FiSearch } from 'react-icons/fi'
import { MdOutlineCategory } from 'react-icons/md'

const categories = [
  { id: 1, name: 'Tacos', productCount: 12, image: tacos },
  { id: 2, name: 'Pizza', productCount: 0, image: tacos },
  { id: 3, name: 'Sandwich', productCount: 6, image: tacos },
  { id: 4, name: 'Pasticho', productCount: 0, image: tacos },
  { id: 5, name: 'Salade', productCount: 0, image: tacos },
  { id: 6, name: 'Boisson', productCount: 0, image: tacos },
  { id: 7, name: 'Assiette', productCount: 0, image: null }
]

const SelectNormal = () => {
  const [formData, setFormData] = useState({
    details: null,
    productsIds: [],
    totalePrice: '',
    factureId: '',
    status: ''
  })
  const [selectedCategory, setSelectedCategory] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  // Filter products based on the selected category and search query
  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory ? product.categoryId === selectedCategory : true) &&
      (searchQuery
        ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.id.toString().includes(searchQuery)
        : true)
  )

  // Filter categories based on whether they have any matching products
  const filteredCategories = categories.filter((category) =>
    filteredProducts.some((product) => product.categoryId === category.id)
  )

  const handelSelect = (id) => {
    setFormData((prev) => ({
      ...prev,
      productsIds: checkIfSelected(id, prev.productsIds)
        ? prev.productsIds.filter((p) => p !== id)
        : [...prev.productsIds, id]
    }))
  }

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-[60%_auto] gap-2 relative">
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
        <div className="mt-2">
          <Accordion
            selectionMode="multiple"
            defaultExpandedKeys={categories.map((c) => c.id + '')}
            variant="bordered"
            className="w-full"
          >
            {filteredCategories.map((c) => (
              <AccordionItem
                key={c.id + ''}
                aria-label={c.name}
                startContent={
                  <div className="size-10 md:size:16 lg:size-24 ">
                    <img src={tacos} className="w-full object-cover" />
                  </div>
                }
                subtitle={`${filteredProducts.filter((p) => p.categoryId === c.id).length} Produits`}
                title={c.name}
                className="w-full"
              >
                <div className="w-full flex flex-col gap-1">
                  {filteredProducts
                    .filter((p) => p.categoryId === c.id)
                    .map((p) => (
                      <div
                        className="border-1 rounded-lg p-2 cursor-pointer shadow flex items-center justify-between"
                        key={p.id}
                        onClick={() => handelSelect(p.id)}
                      >
                        <Checkbox
                          aria-label={c.name}
                          isSelected={checkIfSelected(p.id, formData.productsIds)}
                          onClick={() => handelSelect(p.id)}
                        >
                          <span className="text-small lg:text-lg">{p.name}</span>
                        </Checkbox>
                        <span className="text-small lg:text-lg">{p.price}</span>
                      </div>
                    ))}
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      <Results formData={formData} products={products} handelSelect={handelSelect} />
    </div>
  )
}

export default SelectNormal
