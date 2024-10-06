import { Button, Input } from '@nextui-org/react'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { MdClose } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { createCategory, getCategories } from '../../redux/api/categoryApi'
import { formatErrorField } from '../../utils/utils'
import { categoryActions } from '../../redux/slices/categorySlice'
import { LuImagePlus } from 'react-icons/lu'

const Create = ({ onClose }) => {
  const dispatch = useDispatch()
  const { errorValidation } = useSelector((state) => state.category)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    color: '',
    image: null,
    imageFile: null
  })
  const [imagePreview, setImagePreview] = useState(null)
  const fileInputRef = useRef(null)
  const handelChange = (field, value) => {
    dispatch(categoryActions.setErrorValidatoon({ ...errorValidation, [field]: null }))
    setFormData((prev) => ({ ...prev, [field]: value }))
  }
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
  const handelSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    const newFormData = new FormData()

    // Append fields to FormData
    newFormData.append('name', formData.name)
    newFormData.append('color', formData.color)

    if (formData.image) {
      newFormData.append('image', formData.image)
    }
    dispatch(
      createCategory(
        newFormData,
        () => {
          dispatch(getCategories())
          setFormData({
            name: '',
            color: '',
            image: null
          })
          setImagePreview(null)
        },
        () => setIsLoading(false)
      )
    )
  }
  useEffect(() => {
    dispatch(categoryActions.setErrorValidatoon(null))
    setFormData({
      name: '',
      color: '',
      image: null
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
      <div className="bg-white dark:bg-[#43474b] rounded-lg p-4 w-[450px]  h-fit overflow-hidden flex flex-col gap-4 items-center relative">
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
        <h1 className="font-bold text-2xl underline ">Créer une nouvelle catégorie</h1>
        <form className="w-full flex flex-col gap-2" onSubmit={handelSubmit}>
          <Input
            
            label="Nom"
            variant="bordered"
            placeholder=" Entrez le nom de la catégorie"
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
              className="rounded-lg cursor-pointer "
              onChange={(e) => handelChange('color', e.target.value)}
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
                      {formatErrorField(errorValidation, 'image').map((e,i) => (
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
              ref={fileInputRef}
              accept="image/*"
              className="rounded-lg cursor-pointer hidden"
              onChange={handleImageChange}
            />
          </div>
          <div className="flex items-center justify-end gap-2 ">
            <Button
              color="warning"
              variant="flat"
              className="font-bold"
              onClick={() =>
                setFormData({
                  name: '',
                  color: ''
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
              Crée
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  )
}

export default Create
