import { Button, Input, Select, SelectItem, Spinner } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { MdClose } from 'react-icons/md'
import { BiSolidEdit } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { updateUser, getUserById } from '../../redux/api/userApi' // Adjust according to your file structure
import { userActions } from '../../redux/slices/userSlice'
import { formatErrorField } from '../../utils/utils'

const UpdateUser = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { errorValidation, user, loadingGet } = useSelector((state) => state.user)
  const [formData, setFormData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (field, value) => {
    dispatch(userActions.setErrorValidation({ ...errorValidation, [field]: null }))
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    console.log(formData)
    dispatch(
      updateUser(
        id,
        formData,
        () => {
          navigate(-1) 
        },
        () => setIsLoading(false)
      )
    )
  }

  useEffect(() => {
    dispatch(userActions.setErrorValidation(null))
    dispatch(getUserById(id)) // Fetch the user to update
  }, [id, dispatch])

  useEffect(() => {
    setFormData(user) // Set formData when the user is loaded
  }, [user])

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full flex items-center justify-between pb-2">
        <h1 className="text-4xl font-bold underline flex gap-2">
          <BiSolidEdit /> Modifier Utilisateur
        </h1>
      </div>

      <div className="bg-white dark:bg-[#43474b] rounded-lg p-4 w-[320px] md:w-[450px]  h-fit overflow-hidden flex flex-col gap-4 items-center relative">
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

        {user && formData && (
          <form className="w-full flex flex-col gap-2" onSubmit={handleSubmit}>
            <Input
              label="Nom d'utilisateur"
              variant="bordered"
              placeholder="Entrez le nom d'utilisateur"
              
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
              placeholder="Entrez le mot de passe (laisser vide pour ne pas changer)"
              
              className="font-bold tracking-wider text-lg"
              id="password"
              onChange={(e) => handleChange('password', e.target.value)}
              value={formData?.password || ""}
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
              
              variant="bordered"
              onChange={(e) => handleChange('role', e.target.value)}
              aria-label="role"
              label="Rôle"
              value={formData.role}
              selectedKeys={[formData.role]}
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
                { value: 'ADMIN', label: 'Admin' },
                { value: 'RESPONSABLE', label: 'Responsable' },
                { value: 'LIVREUR', label: 'Livreur' }
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
                Modifier
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default UpdateUser
