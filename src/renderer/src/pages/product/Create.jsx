import { Button, Checkbox, Input, Select, SelectItem, Spinner } from '@nextui-org/react'
import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { MdClose, MdOutlineCategory } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { createProduct } from '../../redux/api/productApi' // Assuming this action exists
import { getCategories } from '../../redux/api/categoryApi' // Fetch categories
import { productActions } from '../../redux/slices/productSlice'
import { formatErrorField, productTypes } from '../../utils/utils'
import { imageURI } from '../../utils/axios'
import defaultImage from '../../assets/images/dfault-image.png'
import { LuImagePlus } from 'react-icons/lu'



const Create = ({ onClose }) => {
  const dispatch = useDispatch()
  const { categories, loadingGet, error } = useSelector((state) => state.category)
  const { errorValidation } = useSelector((state) => state.product)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    price: '',
    image: null,
    isPublish: true,
    imageFile: null,
    type: ''
  })
  const [imagePreview, setImagePreview] = useState(null)
  const fileInputRef = useRef(null)
  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }))
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }
  useEffect(() => {
    dispatch(getCategories()) // Fetch categories when component mounts
  }, [dispatch])

  const handelChange = (field, value) => {
    dispatch(productActions.setErrorValidation({ ...errorValidation, [field]: null }))
    if (field === 'price') {
      const numericValue = Number(value)

      // Ensure the value is a valid number and not negative
      if (!isNaN(numericValue) && numericValue >= 0) {
        setFormData((prev) => ({ ...prev, [field]: numericValue }))
      }
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }
  }

  const handelSubmit = (e) => {
    e.preventDefault()
    const newFormData = new FormData()
    newFormData.append('name', formData.name)
    newFormData.append('categoryId', formData.categoryId)
    newFormData.append('price', formData.price)
    newFormData.append('isPublish', formData.isPublish)
    if (formData.type) {
      newFormData.append('type', formData.type)
    }
    newFormData.append('imageFile', formData.imageFile)

    if (formData.image) {
      newFormData.append('image', formData.image)
    }
    setIsLoading(true)
    dispatch(
      createProduct(
        newFormData,
        () => {
          setFormData({
            name: '',
            categoryId: '',
            price: '',
            image: null,
            isPublish: true,
            imageFile: null,
           type: ''
          })
        },
        setIsLoading(false)
      )
    )
  }
  useEffect(() => {
    dispatch(productActions.setErrorValidation(null))
    setFormData({
      name: '',
      categoryId: '',
      price: '',
      image: null,
      isPublish: true,
      imageFile: null,
      type: ''
    })
  }, [])

  return (
    <motion.div
      initial={{ height: 0 }}
      animate={{ height: 'fit-content' }}
      exit={{ height: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full flex justify-center overflow-hidden"
    >
      <div className="bg-white dark:bg-[#43474b] rounded-lg p-4 w-[450px] h-fit overflow-hidden flex flex-col gap-4 items-center relative">
        <Button
          className="absolute top-2 right-2 text-danger"
          isIconOnly
          size="sm"
          radius="full"
          variant="bordered"
          onClick={onClose}
        >
          <MdClose size={20} />
        </Button>
        <h1 className="font-bold text-2xl underline">Crée Une Nouvele Produit</h1>
        <form className="w-full flex flex-col gap-2" onSubmit={handelSubmit}>
          <Input
            label="Nom"
            variant="bordered"
            placeholder="Entrez le nom du produit"
            fullWidth
            className="font-bold tracking-wider text-lg"
            id="name"
            onChange={(e) => handelChange('name', e.target.value)}
            value={formData.name}
            isInvalid={errorValidation && formatErrorField(errorValidation, 'name') && true}
            errorMessage={
              errorValidation &&
              formatErrorField(errorValidation, 'name') && (
                <ol>
                  {formatErrorField(errorValidation, 'name').map((e, i) => (
                    <li key={i}>-{e}</li>
                  ))}
                </ol>
              )
            }
          />

          <div className="flex items-start gap-2 w-full">
            {loadingGet && <Spinner label="Chargement des catégories" />}
            {categories && (
              <Select
                placeholder="Filtré par catégorie"
                className="tracking-widest flex-1"
                variant="bordered"
                value={formData.categoryId}
                startContent={<MdOutlineCategory />}
                onChange={(e) => handelChange('categoryId', parseInt(e.target.value))}
                isInvalid={
                  errorValidation && formatErrorField(errorValidation, 'categoryId') && true
                }
                selectedKeys={['' + formData.categoryId]}
                errorMessage={
                  errorValidation &&
                  formatErrorField(errorValidation, 'categoryId') && (
                    <ol>
                      {formatErrorField(errorValidation, 'categoryId').map((e, i) => (
                        <li key={i}>-{e}</li>
                      ))}
                    </ol>
                  )
                }
                aria-label="category"
                label="Catégorie"
              >
                {categories.map((category) => (
                  <SelectItem
                    key={category.id}
                    value={category.id}
                    className="dark:text-white"
                    startContent={
                      <div className="self-center text-center">
                        {category.imageFile ? (
                          <img
                            src={`${imageURI}${category.imageFile}`}
                            alt={category.name}
                            className="object-cover h-[50px]"
                          />
                        ) : (
                          <img
                            src={defaultImage}
                            alt={category.name}
                            className="object-cover h-[50px]"
                          />
                        )}
                      </div>
                    }
                  >
                    {category.name}
                  </SelectItem>
                ))}
              </Select>
            )}

            <Input
              label="Prix"
              variant="bordered"
              placeholder="Entrez le prix"
              fullWidth
              className="font-bold tracking-wider text-lg flex-1"
              id="prix"
              onChange={(e) => handelChange('price', e.target.value)}
              value={formData.price}
              isInvalid={errorValidation && formatErrorField(errorValidation, 'price') && true}
              errorMessage={
                errorValidation &&
                formatErrorField(errorValidation, 'price') && (
                  <ol>
                    {formatErrorField(errorValidation, 'price').map((e, i) => (
                      <li key={i}>-{e}</li>
                    ))}
                  </ol>
                )
              }
            />
          </div>
          <Select
          //  key={formData.type || 'reset'} 
            placeholder="Sélectionnez le type"
            className="tracking-widest"
            variant="bordered"
            selectedKeys={['' + formData.type]}
            value={formData.type }
            onChange={(e) => handelChange('type', e.target.value)} // Update to handle type change
            aria-label="type"
            label="Type de Produit"
          >
            {productTypes.map((type) => (
              <SelectItem
                key={type.value}
                value={type.value}
                startContent={type.icon}
                className="dark:text-white"
              >
                {type.label}
              </SelectItem>
            ))}
          </Select>
          <Checkbox
            value={formData.isPublish}
            checked={formData.isPublish}
            onChange={(e) => handelChange('isPublish', e.target.checked)}
            isSelected={formData.isPublish}
            id="isPublish"
          >
            Disponible
          </Checkbox>
          <div className="flex flex-col w-full items-center">
            {imagePreview && (
              <div className=" relative">
                <img src={imagePreview} alt="Preview" className="w-[200px] rounded-lg" />
                <Button
                  isIconOnly
                  onClick={() => {
                    setImagePreview(null)
                    setFormData((prev) => ({ ...prev, image: null }))
                    fileInputRef.current.value = null
                  }}
                  className="absolute top-2 right-2"
                  size="sm"
                >
                  x
                </Button>
                <div className="text-danger font-bold text-small">
                  {errorValidation && formatErrorField(errorValidation, 'image') && (
                    <ol>
                      {formatErrorField(errorValidation, 'image').map((e, i) => (
                        <li key={i}>-{e}</li>
                      ))}
                    </ol>
                  )}
                </div>
              </div>
            )}
            <label htmlFor="image" className="font-bold">
              Image
            </label>
            <LuImagePlus
              className="cursor-pointer"
              onClick={() => fileInputRef.current.click()}
              size={40}
            />
            <input
              type="file"
              id="image"
              ref={fileInputRef} // Add the ref here
              accept="image/*"
              className="rounded-lg cursor-pointer hidden"
              onChange={handleImageChange} // Handle image input change
            />
          </div>
          <div className="flex items-center justify-end gap-2">
            <Button
              color="warning"
              variant="flat"
              className="font-bold"
              onClick={() =>
                setFormData({
                  name: '',
                  categoryId: '',
                  price: '',
                  image: null,
                  isPublish: true,
                  imageFile: null,
                  type: ''
                })
              }
            >
              Vider
            </Button>
            <Button
              color="success"
              variant="flat"
              className="font-bold"
              type="submit"
              isLoading={isLoading}
            >
              Créer
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  )
}

export default Create
