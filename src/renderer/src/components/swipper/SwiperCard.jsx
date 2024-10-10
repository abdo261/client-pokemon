import React, { useRef, useState, useEffect } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-cards'

import './styles.css'
import { TiFlowSwitch } from 'react-icons/ti'

// import required modules
import { EffectCards } from 'swiper/modules'
import PieChart from '../PieChart'
import { useDispatch, useSelector } from 'react-redux'
import {
  getPaymentsCountByOffersStatus,
  getPaymentsCountByProductsStatus
} from '../../redux/api/paymentStatusApi'
import { calculateSumsInObjects } from '../../utils/utils'
import { MdFastfood } from 'react-icons/md'
import { BiSolidOffer } from 'react-icons/bi'

export default function SwipperCardShart() {
  const dispatch = useDispatch()
  const { paymentStatusProduts, paymentStatusOffers, loadingGet, error } = useSelector(
    (state) => state.paymentStatus
  )
  useEffect(() => {
    // dispatch(getCategoriesCounts())

    dispatch(getPaymentsCountByProductsStatus())
    dispatch(getPaymentsCountByOffersStatus())
  }, [dispatch])

  return (
    <>
      <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        className=" w-[250px] h-[300px]"
        
      >
        {!error && paymentStatusProduts && paymentStatusOffers && (
          <>
            <SwiperSlide className="bg-default  w-full  rounded-xl border-3 border-gray-400">
              <div
                className=" flex flex-col justify-evenly items-center  h-full pt-4 "
                
              >
                <h1 className="text-2xl font-semibold text-gray-500 dark:text-gray-200 flex items-center gap-2">
                  <MdFastfood /> <span>Produits</span>
                </h1>
                {<PieChart data={paymentStatusProduts} />}
              </div>
            </SwiperSlide>
            <SwiperSlide className="bg-default  w-full  rounded-xl border-3 border-gray-400">
              <div className=" flex flex-col justify-evenly items-center  h-full pt-4">
                <h1 className="text-2xl font-semibold text-gray-500 dark:text-gray-200 flex items-center gap-2">
                  {' '}
                  <BiSolidOffer />
                  <span>Packes</span>{' '}
                </h1>
                {<PieChart data={paymentStatusOffers} />}{' '}
              </div>
            </SwiperSlide>
            <SwiperSlide className="bg-default  w-full  rounded-xl border-3 border-gray-400">
              <div className=" flex flex-col justify-evenly items-center  h-full pt-4">
                <h1 className="text-2xl font-semibold text-gray-500 dark:text-gray-200 flex items-center gap-2">
                  <TiFlowSwitch /> <span>Comparer</span>
                </h1>
                {
                  <PieChart
                    data={calculateSumsInObjects({
                      Produits: paymentStatusProduts,
                      Packes: paymentStatusOffers
                    })}
                  />
                }{' '}
              </div>
            </SwiperSlide>
          </>
        )}
      </Swiper>
    </>
  )
}
