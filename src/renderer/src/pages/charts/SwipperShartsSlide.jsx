import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation' // Import navigation styles
import './styles.css'

// Import required modules
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules'
import PieChart from '../../components/PieChart'
import { calculateSumsInObjects } from '../../utils/utils'

export default function SwipperShartsSlide({ paymentStatusOffers, paymentStatusProduts }) {
  return (
    <Swiper
      effect={'coverflow'}
      grabCursor={true}
      centeredSlides={true}
      pagination={true}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false
      }}
      navigation={true}
      modules={[EffectCoverflow, Pagination, Navigation]}
      className="w-full pt-[50px] pb-[50px] rounded-lg "
      breakpoints={{
        800: {
          slidesPerView: 3
        },

        0: {
          slidesPerView: 1
        }
      }}
    >
      <SwiperSlide className="w-[400px] h-[300px] rounded-lg bg-white mt-3 mb-3 p-3  ">
        <div className="w-full h-full flex flex-col items-center justify-center p-2">
          <h1 className="text-xl font-semibold">Packes</h1>

          <div className="flex-1 bg-black w-full">
            <PieChart data={paymentStatusProduts} />
          </div>
        </div>{' '}
      </SwiperSlide>
      <SwiperSlide className="w-[400px] h-[300px] rounded-lg bg-white mt-3 mb-3 p-3  ">
        <div className="w-full h-full flex flex-col items-center justify-center p-2">
          <h1 className="text-xl font-semibold">Packes</h1>

          <div className="flex-1 bg-black w-full">
            <PieChart data={paymentStatusOffers} />
          </div>
        </div>{' '}
      </SwiperSlide>
      <SwiperSlide className="w-[400px] h-[300px] rounded-lg bg-white mt-3 mb-3 p-3  ">
        <div className="w-full h-full flex flex-col items-center justify-center p-2">
          <h1 className="text-xl font-semibold">Packes</h1>

          <div className="flex-1 bg-black w-full">
            <PieChart
              data={calculateSumsInObjects({
                products: paymentStatusProduts,
                offers: paymentStatusOffers
              })}
            />
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  )
}
