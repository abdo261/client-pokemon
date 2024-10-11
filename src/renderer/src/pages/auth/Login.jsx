import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import pokemon from '../../assets/images/pokeemon-01.png'
import { HiMiniUsers } from 'react-icons/hi2'
import { Button, Input } from '@nextui-org/react'
import { IoMail } from 'react-icons/io5'
import { FaEyeSlash, FaEye } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../redux/api/authApi'
import { useNavigate } from 'react-router-dom'
import { formatErrorField } from '../../utils/utils'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { authActions } from '../../redux/slices/authSlice'
const Login = () => {
  const [isPasswordType, setIsPasswordType] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const imgRef = useRef(null); // Create a ref to store the original position
  const [position, setPosition] = useState({ x: 0, y: 0 }); // State for tracking position

  const { errorValidation,loading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handelChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    dispatch(authActions.setErrorValidation({...errorValidation,[field]:null}))
  }
  const handelSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    dispatch(loginUser(formData, () => navigate('/')))
  }
  return (
    <div className="dark:bg-[#18191A] login-page dark:text-gray-100 h-screen w-screen flex items-center justify-center  ">
      <div className="backdrop-blur-sm w-screen mx-3 sm:w-[600px]  border-gray-300 dark:border-gray-600 border-4  rounded-2xl flex flex-col items-center">
        <div className="w-full flex items-center justify-center">
        <motion.img
  src={pokemon}
  className="object-contain w-[150px] sm:w-[200px]"
  alt="logo"
  drag // Enable dragging
  dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }} // Set constraints if needed
  layout // This enables layout transitions
  animate={{
    rotate: [0, 10, -10, 0],
    transition: {
      duration: 2, // Duration for the shake animation
      ease: "easeInOut",
      repeat: Infinity, // Repeat indefinitely
      repeatType: "loop",
      times: [0, 0.5, 1], // Shake for 2 seconds, then pause
    },
  }}
  onDragEnd={(event, info) => {
    // Reset to original position when drag ends
    // We don't need to set position; layout will handle it
  }}
/>
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold flex items-center">
          <HiMiniUsers className="text-4xl sm:text-6xl" />
          <span>Se Connecter</span>
        </h1>
        <form className="w-full p-4 flex flex-col items-center gap-3" onSubmit={handelSubmit}>
          <Input
            label="Email"
            color="default"
            className="text-lg font-semibold"
            size="lg"
            id="email"
            classNames={{
              input: 'text-lg',
              innerWrapper: 'bg-transparent',
              inputWrapper: [
                'shadow-xl',
                'bg-default-200/50',
                'dark:bg-default/60',
                'backdrop-blur-xl',
                'backdrop-saturate-200',
                'hover:bg-default-200/70',
                'dark:hover:bg-default/70',
                'group-data-[focus=true]:bg-default-200/50',
                'dark:group-data-[focus=true]:bg-default/60',
                '!cursor-text'
              ]
            }}
            onClear={() => handelChange('email', '')}
            type="email"
            placeholder="Entrez votre email pour vous connecter"
            variant="faded"
            startContent={<IoMail />}
            radius="lg"
            isClearable
            value={formData.email}
            onChange={(e) => handelChange('email', e.target.value)}
            isInvalid={errorValidation && formatErrorField(errorValidation, 'email') && true}
            errorMessage={
              errorValidation &&
              formatErrorField(errorValidation, 'email') && (
                <ol>
                  {formatErrorField(errorValidation, 'email').map((e, i) => (
                    <li key={i}>-{e}</li>
                  ))}
                </ol>
              )
            }
          />
          <Input
            label="Password"
            color="default"
            className="text-lg font-semibold"
            size="lg"
            id="password"
            classNames={{
              input: 'text-lg',
              innerWrapper: 'bg-transparent ',
              inputWrapper: [
                'shadow-xl',
                'bg-default-200/50',
                'dark:bg-default/60',
                'backdrop-blur-xl',
                'backdrop-saturate-200',
                'hover:bg-default-200/70',
                'dark:hover:bg-default/70',
                'group-data-[focus=true]:bg-default-200/50',
                'dark:group-data-[focus=true]:bg-default/60',
                '!cursor-text'
              ]
            }}
            type={isPasswordType ? 'password' : 'text'}
            placeholder="Entrez votre Password pour vous connecter"
            variant="faded"
            startContent={<IoMail />}
            radius="lg"
            endContent={
              isPasswordType ? (
                <span className="cursor-pointer" onClick={() => setIsPasswordType(false)}>
                  <FaEyeSlash />
                </span>
              ) : (
                <span className="cursor-pointer" onClick={() => setIsPasswordType(true)}>
                  <FaEye />
                </span>
              )
            }
            value={formData.password}
            onChange={(e) => handelChange('password', e.target.value)}
            isInvalid={errorValidation && formatErrorField(errorValidation, 'password') && true}
            errorMessage={
              errorValidation &&
              formatErrorField(errorValidation, 'password') && (
                <ol>
                  {formatErrorField(errorValidation, 'password').map((e, i) => (
                    <li key={i}>-{e}</li>
                  ))}
                </ol>
              )
            }
          />
          <div className="flex items-center w-full ">
            <Button fullWidth size="lg" color="warning" className="font-semibold" type="submit" isLoading={loading}>
              Se connecter
            </Button>
          </div>
        </form>
      </div>
      <ToastContainer theme="colored" position="top-center" />
    </div>
  )
}

export default Login
