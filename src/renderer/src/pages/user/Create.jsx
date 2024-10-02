import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { MdClose } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { createUser } from '../../redux/api/userApi' // Adjust according to your file structure
import { formatErrorField } from '../../utils/utils'
import { userActions } from '../../redux/slices/userSlice' // Adjust according to your file structure

const Create = ({ onClose }) => {
  const dispatch = useDispatch()
  const { errorValidation } = useSelector((state) => state.user) // Adjust according to your state slice
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    role: '',
    image:null
  })

  const handleChange = (field, value) => {
    dispatch(userActions.setErrorValidation({ ...errorValidation, [field]: null }))
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    console.log(formData)
    dispatch(
      createUser(
        formData,
        () => {
          setFormData({
            userName: '',
            email: '',
            password: '',
            role: '',image:null
          })
         
        },
        () => setIsLoading(false)
      )
    )
  }

  useEffect(() => {
    dispatch(userActions.setErrorValidation(null))
    setFormData({
      userName: '',
      email: '',
      password: '',
      role: ''
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
          variant="faded"
          onClick={onClose}
        >
          <MdClose size={20} />
        </Button>
        <h1 className="font-bold text-2xl underline">Créer un nouvel utilisateur</h1>
        <form className="w-full flex flex-col gap-2" onSubmit={handleSubmit}>
          <Input
            label="Nom d'utilisateur"
            variant="bordered"
            placeholder="Entrez le nom d'utilisateur"
            fullWidth
            className="font-bold tracking-wider text-lg"
            id="userName"
            onChange={(e) => handleChange('userName', e.target.value)}
            value={formData.userName}
            isInvalid={errorValidation && formatErrorField(errorValidation, 'userName') && true}
            errorMessage={
              errorValidation &&
              formatErrorField(errorValidation, 'userName') && (
                <ol>
                  {formatErrorField(errorValidation, 'userName').map((e) => (
                    <li key={e}>-{e}</li>
                  ))}
                </ol>
              )
            }
          />
          <Input
            label="Email"
            variant="bordered"
            placeholder="Entrez l'email"
            fullWidth
            className="font-bold tracking-wider text-lg"
            id="email"
            onChange={(e) => handleChange('email', e.target.value)}
            value={formData.email}
            isInvalid={errorValidation && formatErrorField(errorValidation, 'email') && true}
            errorMessage={
              errorValidation &&
              formatErrorField(errorValidation, 'email') && (
                <ol>
                  {formatErrorField(errorValidation, 'email').map((e) => (
                    <li key={e}>-{e}</li>
                  ))}
                </ol>
              )
            }
          />
          <Input
            label="Mot de passe"
            variant="bordered"
            placeholder="Entrez le mot de passe"
            fullWidth
            className="font-bold tracking-wider text-lg"
            id="password"
            onChange={(e) => handleChange('password', e.target.value)}
            value={formData.password}
            type="password"
            isInvalid={errorValidation && formatErrorField(errorValidation, 'password') && true}
            errorMessage={
              errorValidation &&
              formatErrorField(errorValidation, 'password') && (
                <ol>
                  {formatErrorField(errorValidation, 'password').map((e) => (
                    <li key={e}>-{e}</li>
                  ))}
                </ol>
              )
            }
          />
          <Select
            placeholder="Sélectionnez le rôle"
            className="tracking-widest flex-1"
            fullWidth
            variant="bordered"
            onChange={(e) => handleChange('role', e.target.value)}
            aria-label="role"
            label="Rôle"
            isInvalid={errorValidation && formatErrorField(errorValidation, 'role') && true}
            errorMessage={
              errorValidation &&
              formatErrorField(errorValidation, 'role') && (
                <ol>
                  {formatErrorField(errorValidation, 'role').map((e) => (
                    <li key={e}>-{e}</li>
                  ))}
                </ol>
              )
            }
          >
            {[
              { value: 'ADMIN', label: 'admin' },
              { value: 'RESPONSABLE', label: 'responsable' },
              { value: 'LIVREUR', label: 'livreur' }
            ].map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </Select>

          <div className="flex items-center justify-end gap-2">
            <Button
              color="warning"
              variant="flat"
              className="font-bold"
              onClick={() =>
                setFormData({
                  userName: '',
                  email: '',
                  password: '',
                  role: ''
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
