import { IoBagCheckOutline } from 'react-icons/io5'
import { MdOutlineCategory } from 'react-icons/md'
import { IoFastFoodSharp } from 'react-icons/io5'
import PieChart from '../../components/PieChart'

import { IoBagHandleOutline } from 'react-icons/io5'
import { BsBagX } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getCategoriesCounts } from '../../redux/api/categoryApi'
import TableUsersHome from '../../components/TableUsersHome'
import { BiSolidShoppingBags } from 'react-icons/bi'
import ChartProfitsHome from '../../components/ChartProfitsHome'
import { Spinner } from '@nextui-org/react'
import ErrorAlert from '../../components/ErrorAlert'

const data = [
  { category: 'Tacos', count: 32, color: '#ff6347' },
  { category: 'Pizza', count: 16, color: '#ffcc00' }
]
const Home = () => {
  const dispatch = useDispatch()
  const { categories,loadingGet,error } = useSelector((state) => state.category)
  useEffect(() => {
    dispatch(getCategoriesCounts())
  }, [dispatch])
  return (
    <>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 ">
        <div className=" bg-gradient-to-r from-gray-300 to-white dark:text-black rounded-lg p-4 flex items-center gap-2 shadow">
          <IoBagHandleOutline size={50} />
          <div className="h-full flex-1 flex flex-col items-center text-2xl font-semibold">
            <div className="tracking-widest">25669</div>
            <div className="text-xl">Hors ligne</div>
          </div>
        </div>
        <div className=" text-white bg-gradient-to-r from-primary to-primary-200 rounded-lg p-4 flex items-center gap-2 shadow">
          <BiSolidShoppingBags size={50} />
          <div className="h-full flex-1 flex flex-col items-center text-2xl font-semibold">
            <div className="tracking-widest">7</div>
            <div className="text-xl">Enligne</div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-secondary to-secondary-200 text-white rounded-lg p-4 flex items-center gap-2 shadow">
          <MdOutlineCategory size={50} />
          <div className="h-full flex-1 flex flex-col items-center text-2xl font-semibold">
            <div className="tracking-widest">20</div>
            <div className="text-xl">Totale Categories</div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-warning to-warning-200 text-white rounded-lg p-4 flex items-center gap-2 shadow">
          <IoFastFoodSharp size={50} />
          <div className="h-full flex-1 flex flex-col items-center text-2xl font-semibold">
            <div className="tracking-widest">76</div>
            <div className="text-xl">Totale Produits</div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-success to-success-200 text-white rounded-lg p-4 flex items-center gap-2 shadow">
          <IoBagCheckOutline size={50} />
          <div className="h-full flex-1 flex flex-col items-center text-2xl font-semibold">
            <div className="tracking-widest">3000</div>
            <div className="text-xl">Livré</div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-danger to-danger-200 text-white rounded-lg p-4 flex items-center gap-2 shadow">
          <BsBagX size={50} />
          <div className="h-full flex-1 flex flex-col items-center text-2xl font-semibold">
            <div className="tracking-widest">7</div>
            <div className="text-xl">Annuler</div>
          </div>
        </div>

        <div className="col-span-1 sm:col-span-2 lg:col-span-1 dark:text-gray-500  rounded-lg p-4 flex justify-center">
          <div className="w-fit  overflow-x-auto flex justify-start">
            {categories && <PieChart data={categories} />}
            {loadingGet && <Spinner size='lg' label='Chagement Encour...'/>}
            {error && <ErrorAlert className="h-fit self-center" message={error}/>}
          </div>
        </div>
        <TableUsersHome />
        <div className="col-span-full p-2 bg-white dark:bg-gray-500 dark:text-black  rounded-lg ">
          <ChartProfitsHome />
        </div>
      </div>
    </>
  )
}

export default Home
