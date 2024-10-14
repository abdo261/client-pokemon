import  { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getPaymentsCountByOffersStatusWithQuantity,
  getPaymentsCountByProductsStatusWithQuantity,
  getPaymentsCountStatusWithQuantity
} from '../../redux/api/paymentStatusApi'
import { calculateSumsInObjects, calculateTotal, transformDataShart } from '../../utils/utils'
import PieChart from '../../components/PieChart'
import { BiSolidOffer } from 'react-icons/bi'
import { MdFastfood } from 'react-icons/md'
import { TiFlowSwitch } from 'react-icons/ti'

const Sharts = () => {
  const dispatch = useDispatch()
  const {
    
    paymentStatusProdutsWithQuantity,
    paymentStatusOffersWithQuantity,
   
  } = useSelector((state) => state.paymentStatus)
  useEffect(() => {
    // dispatch(getCategoriesCounts())
    dispatch(getPaymentsCountStatusWithQuantity())
    dispatch(getPaymentsCountByProductsStatusWithQuantity())
    dispatch(getPaymentsCountByOffersStatusWithQuantity())
  }, [dispatch])
  const transformedProductData = paymentStatusProdutsWithQuantity
    ? transformDataShart(paymentStatusProdutsWithQuantity)
    : {}
  const transformedOfferData = paymentStatusOffersWithQuantity
    ? transformDataShart(paymentStatusOffersWithQuantity)
    : {}

  return (
    <div className="swiperShartContainer w-full ">
      {paymentStatusProdutsWithQuantity && paymentStatusOffersWithQuantity && (
        <div className="grid grid-cols-1 custemMd:grid-cols-3 gap-2 ">
          <div className="p-2 flex flex-col items-center justify-center bg-white   rounded-2xl  border-2 border-slate-400   dark:bg-[#242526]">
            <h1 className="text-2xl font-semibold flex items-center gap-2 ">
              {' '}
              <MdFastfood size={25} /> <span>Produits : </span>{' '}
              <span>{calculateTotal(transformedProductData)}</span>{' '}
            </h1>
            <PieChart data={transformedProductData} />
          </div>{' '}
          <div className="p-2 flex flex-col items-center justify-center bg-white rounded-2xl  border-2 border-slate-400   dark:bg-[#242526]">
            <h1 className="text-2xl font-semibold flex items-center gap-2 ">
              <BiSolidOffer size={25} /> <span> Packes :</span>{' '}
              <span>{calculateTotal(transformedOfferData)}</span>
            </h1>
            <PieChart data={transformedOfferData} />{' '}
          </div>
          <div className="p-2 flex flex-col items-center justify-center bg-white rounded-2xl  border-2 border-slate-400   dark:bg-[#242526]">
            <h1 className="text-2xl font-semibold flex items-center gap-2 ">
              {' '}
              <TiFlowSwitch /> <span>Totale :</span>
              <span>
                {calculateTotal(
                  calculateSumsInObjects({
                    Peoduits: transformedProductData,
                    Packes: transformedOfferData
                  })
                )}
              </span>
            </h1>{' '}
            <PieChart
              data={calculateSumsInObjects({
                Peoduits: transformedProductData,
                Packes: transformedOfferData
              })}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Sharts
