import { Button, Input } from '@nextui-org/react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { MdClose } from 'react-icons/md'

const Create = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    color: ''
  })
  const handelChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }
  const handelSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
  }
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
        <h1 className="font-bold text-2xl underline ">Crée Une Nouvele Category</h1>
        <form className="w-full flex flex-col gap-2" onSubmit={handelSubmit}>
          <Input
            label="Nom"
            variant="faded"
            placeholder="entrFe le nome de categories"
            fullWidth
            className="font-bold tracking-wider text-lg"
            id="name"
            onChange={(e) => handelChange('name', e.target.value)}
            value={formData.name}
          />
          <div className="flex flex-col w-full items-center">
            <label htmlFor="color" className="font-bold">
              Coleur
            </label>
            <input
              type="color"
              id="color"
              className="rounded-lg cursor-pointer "
              onChange={(e) => handelChange('color', e.target.value)}
              value={formData.color}
            />
          </div>
          <div className="flex items-center justify-end gap-2 ">
            <Button color="warning" variant="flat" className="font-bold">
              Claire
            </Button>
            <Button color="success" variant="flat" className="font-bold" type="submit">
              Crée
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  )
}

export default Create
