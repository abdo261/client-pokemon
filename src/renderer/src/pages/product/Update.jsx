import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import { useState } from 'react'
import { BiSolidEdit } from 'react-icons/bi'
import { useParams } from 'react-router-dom'
import tacos from '../../assets/images/tacosrm.png'
import { MdOutlineCategory } from 'react-icons/md'

const categories = [
  { id: 1, name: 'Tacos', productCount: 12, image: tacos },
  { id: 2, name: 'Pizza', productCount: 0, image: tacos },
  { id: 3, name: 'Sandwich', productCount: 6, image: tacos },
  { id: 4, name: 'Pasticho', productCount: 0, image: tacos },
  { id: 5, name: 'Salade', productCount: 0, image: tacos },
  { id: 6, name: 'Boisson', productCount: 0, image: tacos },
  { id: 7, name: 'Assiette', productCount: 0, image: null },
  { id: 8, name: 'Assiette', productCount: 0, image: null },
  { id: 9, name: 'Assiette', productCount: 0, image: null }
]
const Update = () => {
  const { id } = useParams()
  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    prix: '',
    image: null
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
          <BiSolidEdit /> Produit {id} :
        </h1>
      </div>
      <div className="w-full flex py-3 justify-center">
        <div className="bg-white dark:bg-[#43474b] rounded-lg p-4 w-[450px]  h-fit overflow-hidden flex flex-col gap-4 items-center ">
          <h1 className="font-bold text-2xl underline ">Modifier Produit : </h1>
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
            <div className="flex items-center gap-2 w-full">
              <Select
                placeholder="filtré par categorie"
                className="tracking-widest"
                variant="faded"
                startContent={<MdOutlineCategory />}
                onChange={(e) => handelChange('categoryId', e.target.value)}
                aria-label="sategory"
                label="Categorie"
              >
                {categories.map((category) => (
                  <SelectItem
                    key={category.id}
                    value={category.id}
                    className="dark:text-white"
                    startContent={
                      <div className=" self-center  text-center">
                        {category.image ? (
                          <img src={category.image} alt="tacos" className="object-cover h-[50px]" />
                        ) : (
                          <MdOutlineCategory
                            MdFastfood
                            size={40}
                            className="self-center m-1 mx-auto"
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
                variant="faded"
                placeholder="entre le Prix"
                fullWidth
                className="font-bold tracking-wider text-lg"
                id="name"
                onChange={(e) => handelChange('prix', e.target.value)}
                value={formData.prix}
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
