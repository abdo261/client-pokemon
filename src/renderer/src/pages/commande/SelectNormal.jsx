import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Chip,
  Image,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  Tab,
  Tabs
} from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { checkIfSelected } from '../../utils/utils'
import Results from './Results'
import { motion } from 'framer-motion'
import { FaCheck } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from '../../redux/api/categoryApi'
import { getProducts } from '../../redux/api/productApi'
import defaultImage from '../../assets/images/dfault-image.png'
import ErrorAlert from '../../components/ErrorAlert'
import { imageURI } from '../../utils/axios'
import SelectOffer from './SelectOffer'
import { BiSolidOffer } from 'react-icons/bi'
import { MdFastfood } from 'react-icons/md'

const SelectNormal = () => {
  const [formData, setFormData] = useState({
    details: null,
    productsIds: [],
    totalePrice: '',
    isPayed: true,
    isLocal: true,
    type: ''
  })

  const dispatch = useDispatch()
  const {
    products,
    loadingGet: loadingGetProducts,
    error: errorProducts
  } = useSelector((state) => state.product)
  const {
    categories,
    loadingGet: loadingGetCategories,
    error: errorCategories
  } = useSelector((state) => state.category)

  useEffect(() => {
    dispatch(getCategories())
    dispatch(getProducts())
  }, [])

  const handelSelect = (id) => {
    setFormData((prev) => ({
      ...prev,
      productsIds: checkIfSelected(id, prev.productsIds)
        ? prev.productsIds.filter((p) => p !== id)
        : [id, ...prev.productsIds]
    }))
  }

  return (
    <>
      <Tabs aria-label="Options" size="lg">
        <Tab
          key="produits"
          title={
            <div className="flex items-center space-x-2">
              <MdFastfood size={20} />
              <span>Produits</span>
            </div>
          }
          className="w-full"
        >
          <div className="w-full grid grid-cols-1 lg:grid-cols-[auto_440px] gap-2 relative">
            {' '}
            <div className="h-fit  rounded-lg overflow-hidden  p-2 relative bg-white dark:bg-[#242526] dark:text-white  border-1 border-gray-600">
              {(errorCategories || errorProducts) && (
                <div className="flex justify-center items-center">
                  <ErrorAlert
                    className="w-full"
                    error={errorProducts ? errorProducts : errorCategories}
                  />
                </div>
              )}
              {(loadingGetProducts || loadingGetCategories) && (
                <div className="flex justify-center items-center">
                  <Spinner size="lg" label="Changement Encoure ..." />
                </div>
              )}
              {categories && products && (
                <div className="flex flex-col gap-2">
                  {categories &&
                    products &&
                    categories.map((c) => (
                      <div
                        className="flex items-start gap-1 border p-1 rounded-lg h-fit"
                        key={c.id}
                      >
                        <span className="font-semibold flex-shrink-0 flex items-center flex-col  ">
                          <span>
                            {c.imageFile ? (
                              <img
                                src={`${imageURI}${c.imageFile}`}
                                className="w-20 object-cover"
                              />
                            ) : (
                              <img src={defaultImage} className="w-20 object-cover" />
                            )}
                          </span>
                          <span>{c.name}</span>
                        </span>
                        <span className="flex flex-wrap flex-grow gap-2 items-start ">
                          {products && products.filter((p) => p.categoryId === c.id).length > 0 ? (
                            products
                              .filter((p) => p.categoryId === c.id)
                              .filter((p) => p.isPublish)
                              .map((p) =>
                                checkIfSelected(p.id, formData?.productsIds) ? (
                                  <Badge
                                    content={<FaCheck size={12} />}
                                    color={'success'}
                                    shape="circle"
                                    isOneChar
                                    key={p.id}
                                  >
                                    <span>
                                      {' '}
                                      <Chip
                                        className={`cursor-pointer w-fit  ${checkIfSelected(p.id, formData.productsIds) ? 'dark:text-black' : 'dark:text-gray-400'}  `}
                                        key={p.id}
                                        color={
                                          checkIfSelected(p.id, formData.productsIds)
                                            ? 'success'
                                            : 'default'
                                        }
                                        onClick={() => handelSelect(p.id)}
                                        variant="solid"
                                      >
                                        {' '}
                                        <div className=" flex items-center">
                                          <span
                                            className={` text-xs lg:text-small  font-semibold ${checkIfSelected(p.id, formData.productsIds) ? 'dark:text-black' : 'dark:text-gray-300'}`}
                                          >
                                            {p.name}
                                          </span>{' '}
                                          <span
                                            className={`text-small  lg:text-l w-fit  underline underline-offset-2 ms-1 flex items-center${checkIfSelected(p.id, formData.productsIds) ? 'dark:text-black' : 'dark:text-gray-300'}`}
                                          >
                                            <span>{p.price}</span>
                                          </span>
                                        </div>{' '}
                                      </Chip>
                                    </span>
                                  </Badge>
                                ) : (
                                  <motion.span
                                    whileHover={{ scale: 1.07 }}
                                    transition={{
                                      type: 'tween', // You can use 'tween' for a smoother effect
                                      duration: 0.2 // Use seconds, not milliseconds
                                    }}
                                    className="w-fit h-fit p-0 "
                                    key={p.id}
                                  >
                                    <Chip
                                      className={`cursor-pointer w-fit  ${checkIfSelected(p.id, formData.productsIds) ? 'dark:text-black' : 'dark:text-gray-400'}  `}
                                      key={p.id}
                                      color={
                                        checkIfSelected(p.id, formData.productsIds)
                                          ? 'success'
                                          : 'default'
                                      }
                                      onClick={() => handelSelect(p.id)}
                                      variant="solid"
                                    >
                                      {' '}
                                      <div className=" flex items-center">
                                        <span
                                          className={` text-xs lg:text-small  font-semibold ${checkIfSelected(p.id, formData.productsIds) ? 'dark:text-black' : 'dark:text-gray-300'}`}
                                        >
                                          {p.name}
                                        </span>{' '}
                                        <span
                                          className={`text-small  lg:text-l w-fit  underline underline-offset-2 ms-1 flex items-center${checkIfSelected(p.id, formData.productsIds) ? 'dark:text-black' : 'dark:text-gray-300'}`}
                                        >
                                          <span>{p.price}</span>
                                        </span>
                                      </div>{' '}
                                    </Chip>
                                  </motion.span>
                                )
                              )
                          ) : (
                            <div className="w-full  flex items-center justify-center  py-4">
                              <Chip color="danger" variant="flat">
                                <span className="font-extrabold "> Aucun Produits</span>
                              </Chip>
                            </div>
                          )}
                        </span>
                      </div>
                    ))}

                  <div className="flex items-start gap-1 border p-1 rounded-lg h-fit">
                    <span className="font-semibold flex-shrink-0 flex items-center flex-col">
                      <span>
                        <img
                          src={defaultImage}
                          className="w-20 object-cover"
                          alt="Non-Catégorisés"
                        />
                      </span>
                      <span>Non-Catégorisés</span>
                    </span>
                    <span className="flex flex-wrap flex-grow gap-2 items-start">
                      {products &&
                        products
                          .filter((p) => !p.categoryId)
                          .filter((p) => p.isPublish)
                          .map((p) =>
                            checkIfSelected(p.id, formData.productsIds) ? (
                              <Badge
                                content={<FaCheck size={12} />}
                                color={'success'}
                                shape="circle"
                                isOneChar
                                key={p.id}
                              >
                                <span>
                                  <Chip
                                    key={p.id}
                                    className={`cursor-pointer w-fit ${checkIfSelected(p.id, formData.productsIds) ? 'dark:text-black' : 'dark:text-gray-400'}`}
                                    color={
                                      checkIfSelected(p.id, formData.productsIds)
                                        ? 'success'
                                        : 'default'
                                    }
                                    onClick={() => handelSelect(p.id)}
                                    variant="solid"
                                  >
                                    <div className="flex items-center">
                                      <span
                                        className={`text-xs lg:text-small font-semibold ${checkIfSelected(p.id, formData.productsIds) ? 'dark:text-black' : 'dark:text-gray-300'}`}
                                      >
                                        {p.name}
                                      </span>
                                      <span
                                        className={`text-small lg:text-l w-fit underline underline-offset-2 ms-1 flex items-center ${checkIfSelected(p.id, formData.productsIds) ? 'dark:text-black' : 'dark:text-gray-300'}`}
                                      >
                                        <span>{p.price}</span>
                                      </span>
                                    </div>
                                  </Chip>
                                </span>
                              </Badge>
                            ) : (
                              <Chip
                                key={p.id}
                                className={`cursor-pointer w-fit dark:text-gray-400`}
                                color={'default'}
                                onClick={() => handelSelect(p.id)}
                                variant="solid"
                              >
                                <div className="flex items-center">
                                  <span
                                    className={`text-xs lg:text-small font-semibold dark:text-gray-300`}
                                  >
                                    {p.name}
                                  </span>
                                  <span
                                    className={`text-small lg:text-l w-fit underline underline-offset-2 ms-1 flex items-center dark:text-gray-300`}
                                  >
                                    <span>{p.price}</span>
                                  </span>
                                </div>
                              </Chip>
                            )
                          )}
                      {products &&
                        products.filter((p) => !p.categoryId && p.isPublish).length === 0 && (
                          <div className="w-full flex items-center justify-center py-4">
                            <Chip color="danger" variant="flat">
                              <span className="font-extrabold">Aucun Produit</span>
                            </Chip>
                          </div>
                        )}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className="h-fit sticky top-[70px]">
              <Results formData={formData} products={products} handelSelect={handelSelect} />
            </div>
          </div>
        </Tab>
        <Tab
          key="packes"
          className="w-full"
          title={
            <div className="flex items-center space-x-2">
              <BiSolidOffer size={20} />
              <span>Packes</span>
            </div>
          }
        >
          <div className="w-full grid grid-cols-1 lg:grid-cols-[auto_440px] gap-2 relative mt-2">
            <SelectOffer />
          </div>
        </Tab>
      </Tabs>
    </>
  )
}

export default SelectNormal
