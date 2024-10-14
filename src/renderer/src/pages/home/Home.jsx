import { IoBagCheckOutline } from 'react-icons/io5'
import { MdOutlineCategory } from 'react-icons/md'
import { IoFastFoodSharp } from 'react-icons/io5'

import { IoBagHandleOutline } from 'react-icons/io5'
import { BsBagX } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import TableUsersHome from '../../components/TableUsersHome'
import { BiShowAlt, BiSolidShoppingBags } from 'react-icons/bi'
import ChartProfitsHome from '../../components/ChartProfitsHome'
import { Button, Popover, PopoverContent, PopoverTrigger, Spinner } from '@nextui-org/react'
import ErrorAlert from '../../components/ErrorAlert'
import {
  getPaymentsCountStatus
} from '../../redux/api/paymentStatusApi'
import SwipperCardShart from '../../components/swipper/SwiperCard'

const Home = () => {
  const dispatch = useDispatch()
  const { paymentStatus, loadingGet, error } = useSelector((state) => state.paymentStatus)

  console.log(loadingGet)
  useEffect(() => {
    dispatch(getPaymentsCountStatus())
  }, [dispatch])

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 ">
      {loadingGet ? (
        // Show Spinner if loading
       <div className='col-span-full flex items-center justify-center'> <Spinner size="lg" label="Chargement en cours..." /></div>
      ) : error ? (
        // Show ErrorAlert if there is an error
        <ErrorAlert className="h-fit self-center" message={error} />
      ) : (
        paymentStatus && (
          <>
            <div className=" bg-gradient-to-r from-gray-300 to-white dark:text-black rounded-lg p-4 flex items-center gap-2 shadow relative">
              <Popover placement="top">
                <PopoverTrigger>
                  <Button
                    className="absolute top-1 right-1 text-black"
                    isIconOnly
                    size="sm"
                    variant="light"
                    color="default"
                  >
                    <BiShowAlt size={20} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className=" bg-gradient-to-r from-gray-300 to-white dark:text-black border-2 border-gray-400">
                  <div className="px-1 py-2 ">
                    <div className="flex items-center gap-2">
                      <div className="text-small font-bold ">Produits :</div>
                      <div className="font-semibold">
                        {' '}
                        {paymentStatus.offlinePayments.products}{' '}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-small font-bold ">Packes :</div>
                      <div className="font-semibold"> {paymentStatus.offlinePayments.offers} </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <IoBagHandleOutline size={50} />
              <div className="h-full flex-1 flex flex-col items-center text-2xl font-semibold">
                <div className="tracking-widest">{paymentStatus.totalPayments.offline}</div>
                <div className="text-xl">Hors ligne</div>
              </div>
            </div>
            <div className=" text-white bg-gradient-to-r from-primary to-primary-200 rounded-lg p-4 flex items-center gap-2 shadow relative">
              <Popover placement="top">
                <PopoverTrigger>
                  <Button
                    className="absolute top-1 right-1 text-black"
                    isIconOnly
                    size="sm"
                    variant="light"
                    color="default"
                  >
                    <BiShowAlt size={20} className="text-white" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="bg-gradient-to-r from-primary to-primary-200 border-2 border-gray-400">
                  <div className="px-1 py-2 text-white">
                    <div className="flex items-center gap-2">
                      <div className="text-small font-bold ">Produits :</div>
                      <div className="font-semibold"> {paymentStatus.onlinePayments.products} </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-small font-bold ">Packes :</div>
                      <div className="font-semibold"> {paymentStatus.onlinePayments.offers} </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <BiSolidShoppingBags size={50} />
              <div className="h-full flex-1 flex flex-col items-center text-2xl font-semibold">
                <div className="tracking-widest">{paymentStatus.totalPayments.online}</div>
                <div className="text-xl">Enligne</div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-secondary to-secondary-200 text-white rounded-lg p-4 flex items-center gap-2 shadow">
              <MdOutlineCategory size={50} />
              <div className="h-full flex-1 flex flex-col items-center text-2xl font-semibold">
                <div className="tracking-widest">{paymentStatus.categories}</div>
                <div className="text-xl">Totale Categories</div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-warning to-warning-200 text-white rounded-lg p-4 flex items-center gap-2 shadow">
              <IoFastFoodSharp size={50} />
              <div className="h-full flex-1 flex flex-col items-center text-2xl font-semibold">
                <div className="tracking-widest">{paymentStatus.products}</div>
                <div className="text-xl">Totale Produits</div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-success to-success-200 text-white rounded-lg p-4 flex items-center gap-2 shadow">
              <IoBagCheckOutline size={50} />
              <div className="h-full flex-1 flex flex-col items-center text-2xl font-semibold">
                <div className="tracking-widest">{paymentStatus.deliveredOrders}</div>
                <div className="text-xl">Livré</div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-danger to-danger-200 text-white rounded-lg p-4 flex items-center gap-2 shadow">
              <BsBagX size={50} />
              <div className="h-full flex-1 flex flex-col items-center text-2xl font-semibold">
                <div className="tracking-widest">{paymentStatus.returnedOrders}</div>
                <div className="text-xl">Annuler</div>
              </div>
            </div>
          </>
        )
      )}
      <div className="col-span-1 sm:col-span-2 lg:col-span-1 dark:text-gray-500  rounded-lg p-4 flex justify-center">
        {/* <div className="w-fit  overflow-x-auto flex justify-start"> */}
        <div className="swiperHomeContainer w-fit   flex justify-start">
          <SwipperCardShart />
        </div>
      </div>
      <div className='col-sapn-1 sm:col-span-2 '>
      <TableUsersHome />
      </div>
      <div className="col-span-full p-2 bg-white dark:bg-gray-500 dark:text-black  rounded-lg ">
        <ChartProfitsHome />
      </div>
    </div>
  )
}

export default Home
