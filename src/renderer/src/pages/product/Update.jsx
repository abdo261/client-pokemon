import { Button, Checkbox, Input, Select, SelectItem, Spinner } from '@nextui-org/react'
import { useEffect, useRef, useState } from 'react'
import { MdClose, MdOutlineCategory } from 'react-icons/md'
import { BiSolidEdit } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { updateProduct, getProductById } from '../../redux/api/productApi' // Assuming update/getProduct actions exist
import { productActions } from '../../redux/slices/productSlice'
import { formatErrorField } from '../../utils/utils'
import { getCategories } from '../../redux/api/categoryApi'
import { imageURI } from '../../utils/axios'
import defaultImage from '../../assets/images/dfault-image.png'
import { LuImagePlus } from 'react-icons/lu'

const Update = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { errorValidation, product, loadingGet } = useSelector((state) => state.product)
  const { categories } = useSelector((state) => state.category)
  const [formData, setFormData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const fileInputRef = useRef(null)
  const handleImageChange = (event) => {
    setFormData((prev) => ({ ...prev, imageFile: null, image: null })) // Reset image and imageFile
    const file = event.target.files[0]
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }))
      const reader = new FileReader()
      reader.onloadend = () => setImagePreview(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const handelChange = (field, value) => {
    dispatch(productActions.setErrorValidation({ ...errorValidation, [field]: null }))

    if (field === 'price') {
      // Allow the user to input value as a string but validate it properly
      if (/^\d*\.?\d*$/.test(value)) {
        setFormData((prev) => ({ ...prev, [field]: value }))
      }
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }
  }

  const handelSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    const newFormData = new FormData()
    newFormData.append('name', formData.name)
    if (formData.categoryId) {
      newFormData.append('categoryId', formData.categoryId)
    }
    newFormData.append('price', formData.price)
    newFormData.append('isPublish', formData.isPublish)
    newFormData.append('imageFile', formData.imageFile)

    if (formData.image) {
      newFormData.append('image', formData.image)
    }
    setIsLoading(true)
    dispatch(
      updateProduct(
        id,
        newFormData,
        () => {
          navigate(-1)
          setFormData({
            name: '',
            categoryId: '',
            price: '',
            image: null,
            imageFile: null,
            isPublish: true
          })
          setImagePreview(null)
        },
        () => setIsLoading(false)
      )
    )
  }

  useEffect(() => {
    dispatch(productActions.setErrorValidation(null))
    dispatch(getCategories()) // Fetch the product to update
    dispatch(getProductById(id)) // Fetch the product to update
  }, [id, dispatch])

  useEffect(() => {
    if (product) {
      setImagePreview(null)
      setFormData(product)
      if (product.imageFile) {
        setImagePreview(`${imageURI}${product.imageFile}`)
      }
    }
  }, [product, id])

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full flex items-center justify-between pb-2">
        <h1 className="text-4xl font-bold underline flex gap-2">
          <BiSolidEdit /> Modifier Produit
        </h1>
      </div>
      <div className="bg-white dark:bg-[#43474b] rounded-lg p-4 w-[320px] md:w-[450px] h-fit overflow-hidden flex flex-col gap-4 items-center relative">
        <Button
          className="absolute top-2 right-2 text-danger"
          isIconOnly
          size="sm"
          radius="full"
          variant="faded"
          onClick={() => navigate(-1)}
        >
          <MdClose size={20} />
        </Button>

        <h1 className="font-bold text-2xl underline">Modifier</h1>

        {product && formData && (
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
                    {formatErrorField(errorValidation, 'name').map((e) => (
                      <li key={e}>-{e}</li>
                    ))}
                  </ol>
                )
              }
            />

            <div className="flex items-start gap-2 w-full">
              <Select
                placeholder="Filtré par catégorie"
                className="tracking-widest"
                variant="bordered"
                selectedKeys={['' + formData.categoryId]}
                startContent={<MdOutlineCategory />}
                value={formData.categoryId}
                onChange={(e) => handelChange('categoryId', parseInt(e.target.value))}
                aria-label="category"
                label="Catégorie"
                isInvalid={
                  errorValidation && formatErrorField(errorValidation, 'categoryId') && true
                }
                errorMessage={
                  errorValidation &&
                  formatErrorField(errorValidation, 'categoryId') && (
                    <ol>
                      {formatErrorField(errorValidation, 'categoryId').map((e) => (
                        <li key={e}>-{e}</li>
                      ))}
                    </ol>
                  )
                }
              >
                {categories &&
                  categories.map((category) => (
                    <SelectItem
                      key={'' + category.id}
                      value={'' + category.id}
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

              <Input
                label="Prix"
                variant="bordered"
                placeholder="Entrez le prix"
                fullWidth
                className="font-bold tracking-wider text-lg"
                id="price"
                onChange={(e) => handelChange('price', e.target.value)}
                value={formData.price}
                isInvalid={errorValidation && formatErrorField(errorValidation, 'price') && true}
                errorMessage={
                  errorValidation &&
                  formatErrorField(errorValidation, 'price') && (
                    <ol>
                      {formatErrorField(errorValidation, 'price').map((e) => (
                        <li key={e}>-{e}</li>
                      ))}
                    </ol>
                  )
                }
              />
            </div>
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
              {(imagePreview || product.imageFile) && (
                <div className="relative">
                  <img src={imagePreview} alt="Preview" className="w-[200px] rounded-lg" />
                  <Button
                    isIconOnly
                    onClick={() => {
                      setImagePreview(null)
                      setFormData((prev) => ({ ...prev, image: null, imageFile: null }))
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
                onClick={() => setFormData({ name: '', categoryId: '', price: '', image: null })}
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
                Modifier
              </Button>
            </div>
          </form>
        )}
        {loadingGet && (
          <div className="w-full flex justify-center py-3">
            <Spinner label="Chargement..." size="lg" />
          </div>
        )}
      </div>
    </div>
  )
}

export default Update
