import { Button, Input } from '@nextui-org/react'
import { useState } from 'react'
import { BiSolidEdit } from 'react-icons/bi'
import { useParams } from 'react-router-dom'

const Update = () => {
  const { id } = useParams()
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
    <div className="w-full flex flex-col">
      <div className="w-full flex items-center justify-between pb-2">
        <h1 className="text-4xl font-bold underline flex gap-2">
          <BiSolidEdit /> Catégories {id} :
        </h1>
      </div>
      <div className="w-full flex py-3 justify-center">
        <div className="bg-white dark:bg-[#43474b] rounded-lg p-4 w-[450px]  h-fit overflow-hidden flex flex-col gap-4 items-center ">
          <h1 className="font-bold text-2xl underline ">Modifier  Category </h1>
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
      </div>
    </div>
  )
}

export default Update
