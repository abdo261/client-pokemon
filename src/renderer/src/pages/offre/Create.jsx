import { Button, Checkbox, Chip, Input, Select, SelectItem, SelectSection } from '@nextui-org/react'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { MdClose } from 'react-icons/md'
import { LuImagePlus } from 'react-icons/lu'
import { useDispatch, useSelector } from 'react-redux'
import { createOffer } from '../../redux/api/offerApi' 
import { getProducts } from '../../redux/api/productApi'
import { toast } from 'react-toastify'
import { getCategoriesWithProducts } from '../../redux/api/categoryApi'
import { imageURI } from '../../utils/axios'
import defaultImage from '../../assets/images/dfault-image.png'
import { formatErrorField, productTypes } from '../../utils/utils'
import { offerActions } from '../../redux/slices/offerSlice'

const Create = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isSelectOpen, setIsSelectOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    selectedProducts: [],
    price: '',
    image: null,
    isPublish: true
  })

  const dispatch = useDispatch()
  const { products, loadingGet, error } = useSelector((state) => state.product)
  const { categories } = useSelector((state) => state.category)
  const { errorValidation } = useSelector((state) => state.offer)

  useEffect(() => {
    dispatch(getProducts())
    dispatch(getCategoriesWithProducts())
  }, [dispatch])

  const [imagePreview, setImagePreview] = useState(null)
  const fileInputRef = useRef(null)
  const handleChange = (field, value) => {
    dispatch(offerActions.setErrorValidation({ [field]: null }));
  
    if (field === 'price') {
      // Allow empty input to clear the field
      if (value === '') {
        setFormData((prev) => ({ ...prev, [field]: '' })); // or set to null if preferred
        return; // Exit early if the input is empty
      }
      
      const numericValue = parseFloat(value);
  
      // Check if numericValue is a number and is non-negative
      if (!isNaN(numericValue) && numericValue >= 0) {
        setFormData((prev) => ({ ...prev, [field]: numericValue }));
      } else {
        toast.error('Le prix doit être un nombre positif.');
      }
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const newFormData = new FormData()
    newFormData.append('name', formData.name)
    newFormData.append('price', formData.price)
    newFormData.append('isPublish', formData.isPublish)
    if (formData.image) {
      newFormData.append('image', formData.image)
    }
    formData.selectedProducts.forEach((product) => {
      newFormData.append('products[]', product)
    })

    dispatch(
      createOffer(
        newFormData,
        () => {
          setFormData({
            name: "",
            selectedProducts: [],
            price: '',
            image: null,
            isPublish: true
          })
          setImagePreview(null)
        },
        () => setIsLoading(false)
      )
    )
  }
  useEffect(() => {
    if (!onClose) {
      dispatch(offerActions.setErrorValidation(null))
    }
  }, [onClose])

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
          variant="faded"
          onClick={onClose}
        >
          <MdClose size={20} />
        </Button>
        <h1 className="font-bold text-2xl underline">Créer une nouvelle offre</h1>
        <form className="w-full flex flex-col gap-2" onSubmit={handleSubmit}>
          <Input
            label="Nom"
            variant="bordered"
            placeholder=" Entrez le nom de la catégorie"
            fullWidth
            className="font-bold tracking-wider text-lg"
            id="name"
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
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
          <Select
            label="Sélectionnez des produits"
            selectionMode="multiple"
            value={formData.selectedProducts}
            selectedKeys={formData.selectedProducts}
            onChange={(e) => {
              handleChange('selectedProducts', e.target.value.split(','))
            }}
            fullWidth
            isOpen={isSelectOpen}
            onClick={() => setIsSelectOpen(!isSelectOpen)}
            isInvalid={errorValidation && formatErrorField(errorValidation, 'products') && true}
            errorMessage={
              errorValidation &&
              formatErrorField(errorValidation, 'products') && (
                <ol>
                  {formatErrorField(errorValidation, 'products').map((e, i) => (
                    <li key={i}>-{e}</li>
                  ))}
                </ol>
              )
            }
          >
            {categories &&
              categories?.map((c) => (
                <SelectSection
                  title={<span className="font-semibold text-sm"> {c.name} </span>}
                  classNames={{
                    heading:
                      'flex w-full sticky top-1 z-20 py-1.5 px-2 bg-default-100 shadow-small rounded-small'
                  }}
                  key={c.id}
                >
                  {c.products?.map((p) => (
                    <SelectItem
                      value={p.id}
                      className="dark:text-white"
                      key={p.id}
                      endContent={
                        <Chip
                          size="sm"
                          color={p.type ? 'secondary' : 'default'}
                          variant={p.type ? 'bordered' : 'dot'}
                          startContent={
                            p.type ? productTypes.find((t) => t.value === p.type).icon : ''
                          }
                        >
                          {p.type ? productTypes.find((t) => t.value === p.type).label : 'No Type'}
                        </Chip>
                      }
                      startContent={
                        p.imageFile ? (
                          <img
                            src={`${imageURI}${p.imageFile}`}
                            alt={p.imageFile}
                            className="w-10"
                          />
                        ) : (
                          <img src={defaultImage} alt={p.name} className="w-10" />
                        )
                      }
                    >
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectSection>
              ))}
            <SelectSection
              title={<span className="font-semibold text-sm"> non Categorisé</span>}
              classNames={{
                heading:
                  'flex w-full sticky top-1 z-20 py-1.5 px-2 bg-default-100 shadow-small rounded-small'
              }}
            >
              {products &&
                products
                  .filter((p) => p.categoryId === null)
                  .map((p) => (
                    <SelectItem
                      value={p.id}
                      className="dark:text-white"
                      key={p.id}
                      endContent={
                        <Chip
                          size="sm"
                          color={p.type ? 'secondary' : 'default'}
                          variant={p.type ? 'bordered' : 'dot'}
                          startContent={
                            p.type ? productTypes.find((t) => t.value === p.type).icon : ''
                          }
                        >
                          {p.type ? productTypes.find((t) => t.value === p.type).label : 'No Type'}
                        </Chip>
                      }
                      startContent={
                        p.imageFile ? (
                          <img
                            src={`${imageURI}${p.imageFile}`}
                            alt={p.imageFile}
                            className="w-10"
                          />
                        ) : (
                          <img src={defaultImage} alt={p.name} className="w-10" />
                        )
                      }
                    >
                      {p.name}
                    </SelectItem>
                  ))}
            </SelectSection>
          </Select>
          <div className="flex items-center justify-start gap-2 overflow-x-auto">
            {products &&
              products
                .filter((p) => formData.selectedProducts.includes(p.id + ''))
                .map((p) => (
                  <Chip radius="sm" endContent={p.price} key={p.id}>
                    {p.name}
                  </Chip>
                ))}
          </div>
          <Input
            label="Prix"
            variant="bordered"
            placeholder="Entrez le prix de l'offre"
            fullWidth
            value={formData.price}
            onChange={(e) => handleChange('price', e.target.value)}
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

          <Checkbox
            value={formData.isPublish}
            checked={formData.isPublish}
            onChange={(e) => handleChange('isPublish', e.target.checked)}
            isSelected={formData.isPublish}
            id="isPublish"
          >
            Disponible
          </Checkbox>
          <div className="flex flex-col w-full items-center">
            {imagePreview && (
              <div className="relative">
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
              ref={fileInputRef}
              accept="image/*"
              className="rounded-lg cursor-pointer hidden"
              onChange={handleImageChange}
            />
          </div>
          <div className="flex items-center justify-end gap-2">
            <Button
              color="warning"
              variant="flat"
              className="font-bold"
              onClick={() => setFormData({ selectedProducts: [], price: '', image: null })}
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
