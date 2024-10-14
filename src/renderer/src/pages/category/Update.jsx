import { Button, Input, Spinner } from '@nextui-org/react'
import { useEffect, useRef, useState } from 'react'
import { MdClose } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import {
   getCategories,
  getCategoryById,
  updateCategory
} from '../../redux/api/categoryApi'
import { formatErrorField } from '../../utils/utils'
import { categoryActions } from '../../redux/slices/categorySlice'
import { useNavigate, useParams } from 'react-router-dom'
import { BiSolidEdit } from 'react-icons/bi'
import { imageURI } from '../../utils/axios'
import { LuImagePlus } from 'react-icons/lu'

const Update = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch = useDispatch()
  const { errorValidation, category, loadingGet } = useSelector((state) => state.category)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({ name: '', color: '', image: null, imageFile: null })
  const [imagePreview, setImagePreview] = useState(null)
  const fileInputRef = useRef(null)

  const handleChange = (field, value) => {
    dispatch(categoryActions.setErrorValidatoon({ ...errorValidation, [field]: null }))
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

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

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    const newFormData = new FormData()
    newFormData.append('name', formData.name)
    newFormData.append('color', formData.color)
    newFormData.append('imageFile', formData.imageFile)
    // Handle the image upload
    if (formData.image) {
      newFormData.append('image', formData.image)
    }
    
    dispatch(
      updateCategory(
        id,
        newFormData,
        () => {
          dispatch(getCategories())
          setFormData({ name: '', color: '', image: null, imageFile: null })
          navigate(-1)
          setImagePreview(null)
        },
        () => setIsLoading(false)
      )
    )
  }

  useEffect(() => {
    dispatch(categoryActions.setErrorValidatoon(null))
    dispatch(getCategoryById(id))
  }, [id, dispatch])

  useEffect(() => {
    if (category) {
      setImagePreview(null); 
      setFormData(category);
      if (category.imageFile) {
        setImagePreview(`${imageURI}${category.imageFile}`);
      }
    }
  }, [category, id]);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full flex items-center justify-between pb-2">
        <h1 className="text-4xl font-bold underline flex gap-2">
          <BiSolidEdit /> Categorie :
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
        {loadingGet && (
          <div className="w-full flex justify-center py-3">
            <Spinner label="Chargement..." size="lg" />
          </div>
        )}
        {category && (
          <form className="w-full flex flex-col gap-2" onSubmit={handleSubmit}>
            <Input
              label="Nom"
              variant="bordered"
              placeholder="Entrez le nom de la catégorie"
              fullWidth
              className="font-bold tracking-wider text-lg"
              id="name"
              onChange={(e) => handleChange('name', e.target.value)}
              value={formData.name}
              isInvalid={errorValidation && formatErrorField(errorValidation, 'name') && true}
              errorMessage={
                errorValidation &&
                formatErrorField(errorValidation, 'name') && (
                  <ol>
                    {formatErrorField(errorValidation, 'name').map((e,i) => (
                      <li key={i}>-{e}</li>
                    ))}
                  </ol>
                )
              }
            />
            <div className="flex flex-col w-full items-center">
              <label htmlFor="color" className="font-bold">
                Couleur
              </label>
              <input
                type="color"
                id="color"
                className="rounded-lg cursor-pointer"
                onChange={(e) => handleChange('color', e.target.value)}
                value={formData.color}
              />
              <div className="text-danger font-bold text-small">
                {errorValidation && formatErrorField(errorValidation, 'color') && (
                  <ol>
                    {formatErrorField(errorValidation, 'color').map((e,i) => (
                      <li key={i}>-{e}</li>
                    ))}
                  </ol>
                )}
              </div>
            </div>
            <div className="flex flex-col w-full items-center">
              {imagePreview && (
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
              <LuImagePlus className="cursor-pointer" onClick={() => fileInputRef.current.click()} size={40} />
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
                onClick={() => setFormData({ name: '', color: '', image: null })}
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
      </div>
    </div>
  )
}

export default Update
