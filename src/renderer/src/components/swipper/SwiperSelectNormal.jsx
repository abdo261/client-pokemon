import React, { useRef, useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
import { motion } from 'framer-motion'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'

import './styles.css'

// import required modules
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules'
import { Badge, Chip } from '@nextui-org/react'
import { checkIfSelected } from '../../utils/utils'
import { FaCheck } from 'react-icons/fa6'
import { MdCompress } from 'react-icons/md'

export default function SwiperSelectNormal({
  products,
  categories,
  handelSelect,
  formData,
  category
}) {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={10}
      loop={true}
      navigation={true}
      modules={[Navigation]}
      className="mySwiper  "
      grabCursor={true}
    >
      {products
        .filter((p) => p.categoryId === category.id)
        .filter((p) => p.isPublish)
        .filter((p) => p.type === null).length > 0 && (
        <SwiperSlide className="w-full h-full py-2 px-6 rounded-lg bg-slate-100 dark:bg-[#18191A]">
          <div className="w-full ">
            <div className="flex flex-col gap-1 items-center w-full ">
              <h1>
                <Chip variant="dot">No Type</Chip>
              </h1>
              <div className="flex flex-wrap flex-grow gap-2 items-start w-full">
                {products
                  .filter((p) => p.categoryId === category.id)
                  .filter((p) => p.isPublish)
                  .filter((p) => p.type === null)
                  .map((p) =>
                    checkIfSelected(p.id, formData?.productsIds) ? (
                      <Badge
                        content={<FaCheck size={12} />}
                        color={'success'}
                        shape="circle"
                        isOneChar
                        key={p.id}
                      >
                        <span>
                          {' '}
                          <Chip
                            radius="sm"
                            className={`cursor-pointer w-fit  ${checkIfSelected(p.id, formData.productsIds) ? 'dark:text-black' : 'dark:text-gray-400'}  `}
                            key={p.id}
                            color={
                              checkIfSelected(p.id, formData.productsIds) ? 'success' : 'default'
                            }
                            onClick={() => handelSelect(p.id)}
                            variant="solid"
                          >
                            {' '}
                            <div className=" flex items-center">
                              <span
                                className={` text-xs lg:text-small capitalize  font-semibold ${checkIfSelected(p.id, formData.productsIds) ? 'dark:text-black' : 'dark:text-gray-300'}`}
                              >
                                {p.name}
                              </span>{' '}
                              <span
                                className={`text-small  lg:text-l w-fit  underline underline-offset-2 ms-1 flex items-center${checkIfSelected(p.id, formData.productsIds) ? 'dark:text-black' : 'dark:text-gray-300'}`}
                              >
                                <span>{p.price}</span>
                              </span>
                            </div>{' '}
                          </Chip>
                        </span>
                      </Badge>
                    ) : (
                      <motion.span
                        whileHover={{ scale: 1.07 }}
                        transition={{
                          type: 'tween', // You can use 'tween' for a smoother effect
                          duration: 0.2 // Use seconds, not milliseconds
                        }}
                        className="w-fit h-fit p-0 "
                        key={p.id}
                      >
                        <Chip
                          radius="sm"
                          className={`cursor-pointer w-fit  ${checkIfSelected(p.id, formData.productsIds) ? 'dark:text-black' : 'dark:text-gray-400'}  `}
                          key={p.id}
                          color={
                            checkIfSelected(p.id, formData.productsIds) ? 'success' : 'default'
                          }
                          onClick={() => handelSelect(p.id)}
                          variant="solid"
                        >
                          {' '}
                          <div className=" flex items-center">
                            <span
                              className={`capitalize text-xs lg:text-small  font-semibold ${checkIfSelected(p.id, formData.productsIds) ? 'dark:text-black' : 'dark:text-gray-300'}`}
                            >
                              {p.name}
                            </span>{' '}
                            <span
                              className={`text-small  lg:text-l w-fit  underline underline-offset-2 ms-1 flex items-center${checkIfSelected(p.id, formData.productsIds) ? 'dark:text-black' : 'dark:text-gray-300'}`}
                            >
                              <span>{p.price}</span>
                            </span>
                          </div>{' '}
                        </Chip>
                      </motion.span>
                    )
                  )}
                <div> </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      )}
      {products
        .filter((p) => p.categoryId === category.id)
        .filter((p) => p.isPublish)
        .filter((p) => p.type === 'PANINI').length > 0 && (
        <SwiperSlide className="w-full h-full py-2 px-6 rounded-lg bg-slate-100 dark:bg-[#18191A]">
          <div className="w-full ">
            <div className="flex flex-col gap-1 items-center w-full ">
              <h1>
                <Chip color={'secondary'} variant={'bordered'} startContent={<MdCompress />}>
                  Panini
                </Chip>
              </h1>
              <div className="flex flex-wrap flex-grow gap-2 items-start w-full">
                {products
                  .filter((p) => p.categoryId === category.id)
                  .filter((p) => p.isPublish)
                  .filter((p) => p.type === 'PANINI')
                  .map((p) =>
                    checkIfSelected(p.id, formData?.productsIds) ? (
                      <Badge
                        content={<FaCheck size={12} />}
                        color={'success'}
                        shape="circle"
                        isOneChar
                        key={p.id}
                      >
                        <span>
                          {' '}
                          <Chip
                            radius="sm"
                            className={`cursor-pointer w-fit  ${checkIfSelected(p.id, formData.productsIds) ? 'dark:text-black' : 'dark:text-gray-400'}  `}
                            key={p.id}
                            color={
                              checkIfSelected(p.id, formData.productsIds) ? 'success' : 'default'
                            }
                            onClick={() => handelSelect(p.id)}
                            variant="solid"
                          >
                            {' '}
                            <div className=" flex items-center">
                              <span
                                className={` text-xs lg:text-small capitalize  font-semibold ${checkIfSelected(p.id, formData.productsIds) ? 'dark:text-black' : 'dark:text-gray-300'}`}
                              >
                                {p.name}
                              </span>{' '}
                              <span
                                className={`text-small  lg:text-l w-fit  underline underline-offset-2 ms-1 flex items-center${checkIfSelected(p.id, formData.productsIds) ? 'dark:text-black' : 'dark:text-gray-300'}`}
                              >
                                <span>{p.price}</span>
                              </span>
                            </div>{' '}
                          </Chip>
                        </span>
                      </Badge>
                    ) : (
                      <motion.span
                        whileHover={{ scale: 1.07 }}
                        transition={{
                          type: 'tween', // You can use 'tween' for a smoother effect
                          duration: 0.2 // Use seconds, not milliseconds
                        }}
                        className="w-fit h-fit p-0 "
                        key={p.id}
                      >
                        <Chip
                          radius="sm"
                          className={`cursor-pointer w-fit  ${checkIfSelected(p.id, formData.productsIds) ? 'dark:text-black' : 'dark:text-gray-400'}  `}
                          key={p.id}
                          color={
                            checkIfSelected(p.id, formData.productsIds) ? 'success' : 'default'
                          }
                          onClick={() => handelSelect(p.id)}
                          variant="solid"
                        >
                          {' '}
                          <div className=" flex items-center">
                            <span
                              className={`capitalize text-xs lg:text-small  font-semibold ${checkIfSelected(p.id, formData.productsIds) ? 'dark:text-black' : 'dark:text-gray-300'}`}
                            >
                              {p.name}
                            </span>{' '}
                            <span
                              className={`text-small  lg:text-l w-fit  underline underline-offset-2 ms-1 flex items-center${checkIfSelected(p.id, formData.productsIds) ? 'dark:text-black' : 'dark:text-gray-300'}`}
                            >
                              <span>{p.price}</span>
                            </span>
                          </div>{' '}
                        </Chip>
                      </motion.span>
                    )
                  )}
                <div> </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      )}
      {products
        .filter((p) => p.categoryId === category.id)
        .filter((p) => p.isPublish)
        .filter((p) => p.type === 'FOUR').length > 0 && (
        <SwiperSlide className="w-full h-full py-2 px-6 rounded-lg bg-slate-100 dark:bg-[#18191A]">
          <div className="w-full ">
            <div className="flex flex-col gap-1 items-center w-full ">
              <h1>
                <Chip color={'secondary'} variant={'bordered'} startContent={<MdCompress />}>
                  Four
                </Chip>
              </h1>
              <div className="flex flex-wrap flex-grow gap-2 items-start w-full">
                {products
                  .filter((p) => p.categoryId === category.id)
                  .filter((p) => p.isPublish)
                  .filter((p) => p.type === 'FOUR')
                  .map((p) =>
                    checkIfSelected(p.id, formData?.productsIds) ? (
                      <Badge
                        content={<FaCheck size={12} />}
                        color={'success'}
                        shape="circle"
                        isOneChar
                        key={p.id}
                      >
                        <span>
                          {' '}
                          <Chip
                            radius="sm"
                            className={`cursor-pointer w-fit  ${checkIfSelected(p.id, formData.productsIds) ? 'dark:text-black' : 'dark:text-gray-400'}  `}
                            key={p.id}
                            color={
                              checkIfSelected(p.id, formData.productsIds) ? 'success' : 'default'
                            }
                            onClick={() => handelSelect(p.id)}
                            variant="solid"
                          >
                            {' '}
                            <div className=" flex items-center">
                              <span
                                className={` text-xs lg:text-small capitalize  font-semibold ${checkIfSelected(p.id, formData.productsIds) ? 'dark:text-black' : 'dark:text-gray-300'}`}
                              >
                                {p.name}
                              </span>{' '}
                              <span
                                className={`text-small  lg:text-l w-fit  underline underline-offset-2 ms-1 flex items-center${checkIfSelected(p.id, formData.productsIds) ? 'dark:text-black' : 'dark:text-gray-300'}`}
                              >
                                <span>{p.price}</span>
                              </span>
                            </div>{' '}
                          </Chip>
                        </span>
                      </Badge>
                    ) : (
                      <motion.span
                        whileHover={{ scale: 1.07 }}
                        transition={{
                          type: 'tween', // You can use 'tween' for a smoother effect
                          duration: 0.2 // Use seconds, not milliseconds
                        }}
                        className="w-fit h-fit p-0 "
                        key={p.id}
                      >
                        <Chip
                          radius="sm"
                          className={`cursor-pointer w-fit  ${checkIfSelected(p.id, formData.productsIds) ? 'dark:text-black' : 'dark:text-gray-400'}  `}
                          key={p.id}
                          color={
                            checkIfSelected(p.id, formData.productsIds) ? 'success' : 'default'
                          }
                          onClick={() => handelSelect(p.id)}
                          variant="solid"
                        >
                          {' '}
                          <div className=" flex items-center">
                            <span
                              className={`capitalize text-xs lg:text-small  font-semibold ${checkIfSelected(p.id, formData.productsIds) ? 'dark:text-black' : 'dark:text-gray-300'}`}
                            >
                              {p.name}
                            </span>{' '}
                            <span
                              className={`text-small  lg:text-l w-fit  underline underline-offset-2 ms-1 flex items-center${checkIfSelected(p.id, formData.productsIds) ? 'dark:text-black' : 'dark:text-gray-300'}`}
                            >
                              <span>{p.price}</span>
                            </span>
                          </div>{' '}
                        </Chip>
                      </motion.span>
                    )
                  )}
                <div> </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      )}
      {products
        .filter((p) => p.categoryId === category.id)
        .filter((p) => p.isPublish)
        .filter((p) => p.type === 'CHARBON').length > 0 && (
        <SwiperSlide className="w-full h-full py-2 px-6 rounded-lg bg-slate-100 dark:bg-[#18191A]">
          <div className="w-full ">
            <div className="flex flex-col gap-1 items-center w-full ">
              <h1>
                <Chip color={'secondary'} variant={'bordered'} startContent={<MdCompress />}>
                  Charbon
                </Chip>
              </h1>
              <div className="flex flex-wrap flex-grow gap-2 items-start w-full">
                {products
                  .filter((p) => p.categoryId === category.id)
                  .filter((p) => p.isPublish)
                  .filter((p) => p.type === 'CHARBON')
                  .map((p) =>
                    checkIfSelected(p.id, formData?.productsIds) ? (
                      <Badge
                        content={<FaCheck size={12} />}
                        color={'success'}
                        shape="circle"
                        isOneChar
                        key={p.id}
                      >
                        <span>
                          {' '}
                          <Chip
                            radius="sm"
                            className={`cursor-pointer w-fit  ${checkIfSelected(p.id, formData.productsIds) ? 'dark:text-black' : 'dark:text-gray-400'}  `}
                            key={p.id}
                            color={
                              checkIfSelected(p.id, formData.productsIds) ? 'success' : 'default'
                            }
                            onClick={() => handelSelect(p.id)}
                            variant="solid"
                          >
                            {' '}
                            <div className=" flex items-center">
                              <span
                                className={` text-xs lg:text-small capitalize  font-semibold ${checkIfSelected(p.id, formData.productsIds) ? 'dark:text-black' : 'dark:text-gray-300'}`}
                              >
                                {p.name}
                              </span>{' '}
                              <span
                                className={`text-small  lg:text-l w-fit  underline underline-offset-2 ms-1 flex items-center${checkIfSelected(p.id, formData.productsIds) ? 'dark:text-black' : 'dark:text-gray-300'}`}
                              >
                                <span>{p.price}</span>
                              </span>
                            </div>{' '}
                          </Chip>
                        </span>
                      </Badge>
                    ) : (
                      <motion.span
                        whileHover={{ scale: 1.07 }}
                        transition={{
                          type: 'tween', // You can use 'tween' for a smoother effect
                          duration: 0.2 // Use seconds, not milliseconds
                        }}
                        className="w-fit h-fit p-0 "
                        key={p.id}
                      >
                        <Chip
                          radius="sm"
                          className={`cursor-pointer w-fit  ${checkIfSelected(p.id, formData.productsIds) ? 'dark:text-black' : 'dark:text-gray-400'}  `}
                          key={p.id}
                          color={
                            checkIfSelected(p.id, formData.productsIds) ? 'success' : 'default'
                          }
                          onClick={() => handelSelect(p.id)}
                          variant="solid"
                        >
                          {' '}
                          <div className=" flex items-center">
                            <span
                              className={`capitalize text-xs lg:text-small  font-semibold ${checkIfSelected(p.id, formData.productsIds) ? 'dark:text-black' : 'dark:text-gray-300'}`}
                            >
                              {p.name}
                            </span>{' '}
                            <span
                              className={`text-small  lg:text-l w-fit  underline underline-offset-2 ms-1 flex items-center${checkIfSelected(p.id, formData.productsIds) ? 'dark:text-black' : 'dark:text-gray-300'}`}
                            >
                              <span>{p.price}</span>
                            </span>
                          </div>{' '}
                        </Chip>
                      </motion.span>
                    )
                  )}
                <div> </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      )}
    </Swiper>
  )
}

//  <div className="flex flex-col items-center w-full">
// <div className="w-full h-full grid grid-cols-1 md:grid-cols-3 gap-1">
//   <div
//     className={`flex flex-col gap-1 items-center w-full h-full  ${
//       products
//         .filter((p) => p.categoryId === c.id)
//         .filter((p) => p.isPublish)
//         .filter((p) => p.type === 'PANINI').length > 0 &&
//       'border-2 border-slate-300 rounded-lg p-1'
//     }`}
//   >
//     {products
//       .filter((p) => p.categoryId === c.id)
//       .filter((p) => p.isPublish)
//       .filter((p) => p.type === 'PANINI').length > 0 && (
//       <>
//         <h1>
//           <Chip
//             color={'secondary'}
//             variant={'bordered'}
//             startContent={<MdCompress />}
//           >
//             Panini
//           </Chip>
//         </h1>
//         <div className="flex flex-wrap flex-grow gap-2 items-start justify-start  w-full ">
//           {products
//             .filter((p) => p.categoryId === c.id)
//             .filter((p) => p.isPublish)
//             .filter((p) => p.type === 'PANINI')
//             .map((p) =>
//               checkIfSelected(p.id, formData?.productsIds) ? (
//                 <Badge
//                   content={<FaCheck size={12} />}
//                   color={'success'}
//                   shape="circle"
//                   isOneChar
//                   key={p.id}
//                 >
//                   <span>
//                     {' '}
//                     <Chip
//                       className={`cursor-pointer w-fit  ${checkIfSelected(p.id, formData.productsIds) ? 'dark:text-black' : 'dark:text-gray-400'}  `}
//                       key={p.id}
//                       color={
//                         checkIfSelected(p.id, formData.productsIds)
//                           ? 'success'
//                           : 'default'
//                       }
//                       onClick={() => handelSelect(p.id)}
//                       variant="solid"
//                       radius="sm"
//                     >
//                       {' '}
//                       <div className=" flex items-center">
//                         <span
//                           className={` text-xs lg:text-small capitalize  font-semibold ${checkIfSelected(p.id, formData.productsIds) ? 'dark:text-black' : 'dark:text-gray-300'}`}
//                         >
//                           {p.name}
//                         </span>{' '}
//                         <span
//                           className={`text-small  lg:text-l w-fit  underline underline-offset-2 ms-1 flex items-center${checkIfSelected(p.id, formData.productsIds) ? 'dark:text-black' : 'dark:text-gray-300'}`}
//                         >
//                           <span>{p.price}</span>
//                         </span>
//                       </div>{' '}
//                     </Chip>
//                   </span>
//                 </Badge>
//               ) : (
//                 <motion.span
//                   whileHover={{ scale: 1.07 }}
//                   transition={{
//                     type: 'tween', // You can use 'tween' for a smoother effect
//                     duration: 0.2 // Use seconds, not milliseconds
//                   }}
//                   className="w-fit h-fit p-0 "
//                   key={p.id}
//                 >
//                   <Chip
//                     radius="sm"
//                     className={`cursor-pointer w-fit  ${checkIfSelected(p.id, formData.productsIds) ? 'dark:text-black' : 'dark:text-gray-400'}  `}
//                     key={p.id}
//                     color={
//                       checkIfSelected(p.id, formData.productsIds)
//                         ? 'success'
//                         : 'default'
//                     }
//                     onClick={() => handelSelect(p.id)}
//                     variant="solid"
//                   >
//                     {' '}
//                     <div className=" flex items-center">
//                       <span
//                         className={`capitalize text-xs lg:text-small  font-semibold ${checkIfSelected(p.id, formData.productsIds) ? 'dark:text-black' : 'dark:text-gray-300'}`}
//                       >
//                         {p.name}
//                       </span>{' '}
//                       <span
//                         className={`text-small  lg:text-l w-fit  underline underline-offset-2 ms-1 flex items-center${checkIfSelected(p.id, formData.productsIds) ? 'dark:text-black' : 'dark:text-gray-300'}`}
//                       >
//                         <span>{p.price}</span>
//                       </span>
//                     </div>{' '}
//                   </Chip>
//                 </motion.span>
//               )
//             )}
//         </div>
//       </>
//     )}
//   </div>
//   <div  className={`flex flex-col gap-1 items-center w-full h-full  ${
//       products
//         .filter((p) => p.categoryId === c.id)
//         .filter((p) => p.isPublish)
//         .filter((p) => p.type === 'FOUR').length > 0 &&
//       'border-2 border-slate-300 rounded-lg p-1'
//     }`}>
//     {products
//       .filter((p) => p.categoryId === c.id)
//       .filter((p) => p.isPublish)
//       .filter((p) => p.type === 'FOUR').length > 0 && (
//       <>
//         <h1>
//           <Chip
//             color={'secondary'}
//             variant={'bordered'}
//             startContent={<PiOvenFill />}
//           >
//             Four
//           </Chip>
//         </h1>
//         <div className="flex flex-wrap flex-grow gap-2 items-start justify-start  w-full ">
//           {products
//             .filter((p) => p.categoryId === c.id)
//             .filter((p) => p.isPublish)
//             .filter((p) => p.type === 'FOUR')
//             .map((p) =>
//               checkIfSelected(p.id, formData?.productsIds) ? (
//                 <Badge
//                   content={<FaCheck size={12} />}
//                   color={'success'}
//                   shape="circle"
//                   isOneChar
//                   key={p.id}
//                 >
//                   <span>
//                     {' '}
//                     <Chip
//                       radius="sm"
//                       className={`cursor-pointer w-fit  ${checkIfSelected(p.id, formData.productsIds) ? 'dark:text-black' : 'dark:text-gray-400'}  `}
//                       key={p.id}
//                       color={
//                         checkIfSelected(p.id, formData.productsIds)
//                           ? 'success'
//                           : 'default'
//                       }
//                       onClick={() => handelSelect(p.id)}
//                       variant="solid"
//                     >
//                       {' '}
//                       <div className=" flex items-center">
//                         <span
//                           className={` text-xs lg:text-small capitalize  font-semibold ${checkIfSelected(p.id, formData.productsIds) ? 'dark:text-black' : 'dark:text-gray-300'}`}
//                         >
//                           {p.name}
//                         </span>{' '}
//                         <span
//                           className={`text-small  lg:text-l w-fit  underline underline-offset-2 ms-1 flex items-center${checkIfSelected(p.id, formData.productsIds) ? 'dark:text-black' : 'dark:text-gray-300'}`}
//                         >
//                           <span>{p.price}</span>
//                         </span>
//                       </div>{' '}
//                     </Chip>
//                   </span>
//                 </Badge>
//               ) : (
//                 <motion.span
//                   whileHover={{ scale: 1.07 }}
//                   transition={{
//                     type: 'tween', // You can use 'tween' for a smoother effect
//                     duration: 0.2 // Use seconds, not milliseconds
//                   }}
//                   className="w-fit h-fit p-0 "
//                   key={p.id}
//                 >
//                   <Chip
//                     radius="sm"
//                     className={`cursor-pointer w-fit  ${checkIfSelected(p.id, formData.productsIds) ? 'dark:text-black' : 'dark:text-gray-400'}  `}
//                     key={p.id}
//                     color={
//                       checkIfSelected(p.id, formData.productsIds)
//                         ? 'success'
//                         : 'default'
//                     }
//                     onClick={() => handelSelect(p.id)}
//                     variant="solid"
//                   >
//                     {' '}
//                     <div className=" flex items-center">
//                       <span
//                         className={`capitalize text-xs lg:text-small  font-semibold ${checkIfSelected(p.id, formData.productsIds) ? 'dark:text-black' : 'dark:text-gray-300'}`}
//                       >
//                         {p.name}
//                       </span>{' '}
//                       <span
//                         className={`text-small  lg:text-l w-fit  underline underline-offset-2 ms-1 flex items-center${checkIfSelected(p.id, formData.productsIds) ? 'dark:text-black' : 'dark:text-gray-300'}`}
//                       >
//                         <span>{p.price}</span>
//                       </span>
//                     </div>{' '}
//                   </Chip>
//                 </motion.span>
//               )
//             )}
//         </div>
//       </>
//     )}{' '}
//   </div>
//   <div  className={`flex flex-col gap-1 items-center w-full h-full  ${
//       products
//         .filter((p) => p.categoryId === c.id)
//         .filter((p) => p.isPublish)
//         .filter((p) => p.type === 'CHARBON').length > 0 &&
//       ' border-2 border-slate-300 rounded-lg p-1'
//     }`}>
//     {products
//       .filter((p) => p.categoryId === c.id)
//       .filter((p) => p.isPublish)
//       .filter((p) => p.type === 'CHARBON').length > 0 && (
//       <>
//         <h1>
//           <Chip
//             color={'secondary'}
//             variant={'bordered'}
//             startContent={<GiBarbecue />}
//           >
//             Charbon
//           </Chip>
//         </h1>
//         <div className="flex flex-wrap flex-grow gap-2 items-start justify-start  w-full ">
//           {products
//             .filter((p) => p.categoryId === c.id)
//             .filter((p) => p.isPublish)
//             .filter((p) => p.type === 'CHARBON')
//             .map((p) =>
//               checkIfSelected(p.id, formData?.productsIds) ? (
//                 <Badge
//                   content={<FaCheck size={12} />}
//                   color={'success'}
//                   shape="circle"
//                   isOneChar
//                   key={p.id}
//                 >
//                   <span>
//                     {' '}
//                     <Chip
//                       radius="sm"
//                       className={`cursor-pointer w-fit  ${checkIfSelected(p.id, formData.productsIds) ? 'dark:text-black' : 'dark:text-gray-400'}  `}
//                       key={p.id}
//                       color={
//                         checkIfSelected(p.id, formData.productsIds)
//                           ? 'success'
//                           : 'default'
//                       }
//                       onClick={() => handelSelect(p.id)}
//                       variant="solid"
//                     >
//                       {' '}
//                       <div className=" flex items-center">
//                         <span
//                           className={` text-xs lg:text-small capitalize  font-semibold ${checkIfSelected(p.id, formData.productsIds) ? 'dark:text-black' : 'dark:text-gray-300'}`}
//                         >
//                           {p.name}
//                         </span>{' '}
//                         <span
//                           className={`text-small  lg:text-l w-fit  underline underline-offset-2 ms-1 flex items-center${checkIfSelected(p.id, formData.productsIds) ? 'dark:text-black' : 'dark:text-gray-300'}`}
//                         >
//                           <span>{p.price}</span>
//                         </span>
//                       </div>{' '}
//                     </Chip>
//                   </span>
//                 </Badge>
//               ) : (
//                 <motion.span
//                   whileHover={{ scale: 1.07 }}
//                   transition={{
//                     type: 'tween', // You can use 'tween' for a smoother effect
//                     duration: 0.2 // Use seconds, not milliseconds
//                   }}
//                   className="w-fit h-fit p-0 "
//                   key={p.id}
//                 >
//                   <Chip
//                     radius="sm"
//                     className={`cursor-pointer w-fit  ${checkIfSelected(p.id, formData.productsIds) ? 'dark:text-black' : 'dark:text-gray-400'}  `}
//                     key={p.id}
//                     color={
//                       checkIfSelected(p.id, formData.productsIds)
//                         ? 'success'
//                         : 'default'
//                     }
//                     onClick={() => handelSelect(p.id)}
//                     variant="solid"
//                   >
//                     {' '}
//                     <div className=" flex items-center">
//                       <span
//                         className={`capitalize text-xs lg:text-small  font-semibold ${checkIfSelected(p.id, formData.productsIds) ? 'dark:text-black' : 'dark:text-gray-300'}`}
//                       >
//                         {p.name}
//                       </span>{' '}
//                       <span
//                         className={`text-small  lg:text-l w-fit  underline underline-offset-2 ms-1 flex items-center${checkIfSelected(p.id, formData.productsIds) ? 'dark:text-black' : 'dark:text-gray-300'}`}
//                       >
//                         <span>{p.price}</span>
//                       </span>
//                     </div>{' '}
//                   </Chip>
//                 </motion.span>
//               )
//             )}
//           <div> </div>
//         </div>
//       </>
//     )}
//   </div>
// </div>
// {products
//   .filter((p) => p.categoryId === c.id)
//   .filter((p) => p.isPublish)
//   .filter((p) => p.type === null).length > 0 && (
//   <div className="w-full ">
//     <div className="flex flex-col gap-1 items-center w-full ">
//       <h1>
//         <Chip variant="dot">No Type</Chip>
//       </h1>
//       <div className="flex flex-wrap flex-grow gap-2 items-start w-full">
//         {products
//           .filter((p) => p.categoryId === c.id)
//           .filter((p) => p.isPublish)
//           .filter((p) => p.type === null)
//           .map((p) =>
//             checkIfSelected(p.id, formData?.productsIds) ? (
//               <Badge
//                 content={<FaCheck size={12} />}
//                 color={'success'}
//                 shape="circle"
//                 isOneChar
//                 key={p.id}
//               >
//                 <span>
//                   {' '}
//                   <Chip
//                     radius="sm"
//                     className={`cursor-pointer w-fit  ${checkIfSelected(p.id, formData.productsIds) ? 'dark:text-black' : 'dark:text-gray-400'}  `}
//                     key={p.id}
//                     color={
//                       checkIfSelected(p.id, formData.productsIds)
//                         ? 'success'
//                         : 'default'
//                     }
//                     onClick={() => handelSelect(p.id)}
//                     variant="solid"
//                   >
//                     {' '}
//                     <div className=" flex items-center">
//                       <span
//                         className={` text-xs lg:text-small capitalize  font-semibold ${checkIfSelected(p.id, formData.productsIds) ? 'dark:text-black' : 'dark:text-gray-300'}`}
//                       >
//                         {p.name}
//                       </span>{' '}
//                       <span
//                         className={`text-small  lg:text-l w-fit  underline underline-offset-2 ms-1 flex items-center${checkIfSelected(p.id, formData.productsIds) ? 'dark:text-black' : 'dark:text-gray-300'}`}
//                       >
//                         <span>{p.price}</span>
//                       </span>
//                     </div>{' '}
//                   </Chip>
//                 </span>
//               </Badge>
//             ) : (
//               <motion.span
//                 whileHover={{ scale: 1.07 }}
//                 transition={{
//                   type: 'tween', // You can use 'tween' for a smoother effect
//                   duration: 0.2 // Use seconds, not milliseconds
//                 }}
//                 className="w-fit h-fit p-0 "
//                 key={p.id}
//               >
//                 <Chip
//                   radius="sm"
//                   className={`cursor-pointer w-fit  ${checkIfSelected(p.id, formData.productsIds) ? 'dark:text-black' : 'dark:text-gray-400'}  `}
//                   key={p.id}
//                   color={
//                     checkIfSelected(p.id, formData.productsIds)
//                       ? 'success'
//                       : 'default'
//                   }
//                   onClick={() => handelSelect(p.id)}
//                   variant="solid"
//                 >
//                   {' '}
//                   <div className=" flex items-center">
//                     <span
//                       className={`capitalize text-xs lg:text-small  font-semibold ${checkIfSelected(p.id, formData.productsIds) ? 'dark:text-black' : 'dark:text-gray-300'}`}
//                     >
//                       {p.name}
//                     </span>{' '}
//                     <span
//                       className={`text-small  lg:text-l w-fit  underline underline-offset-2 ms-1 flex items-center${checkIfSelected(p.id, formData.productsIds) ? 'dark:text-black' : 'dark:text-gray-300'}`}
//                     >
//                       <span>{p.price}</span>
//                     </span>
//                   </div>{' '}
//                 </Chip>
//               </motion.span>
//             )
//           )}
//         <div> </div>
//       </div>
//     </div>
//   </div>
// )}
// </div>
