import React, { useEffect, useState } from 'react'
import { FiEye } from 'react-icons/fi'
import {
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Chip,
  Image,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner
} from '@nextui-org/react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import defaultImage from '../../assets/images/dfault-image.png'
import ErrorAlert from '../../components/ErrorAlert'
import { imageURI } from '../../utils/axios'
import { LuShoppingBag } from 'react-icons/lu'
import { checkIfSelected, formatMoney } from '../../utils/utils'
import { getOffers } from '../../redux/api/offerApi'
import ResultOffers from './ResultOffers'
const SelectOffer = () => {
  //   const exemple = {
  //     offersIds: [5],
  //     totalePrice: 150.5,
  //     isPayed: true,
  //     details: [
  //       {
  //         id: 5,
  //         name: 'Offer A',
  //         q: 2,
  //         price: 50.0
  //       }
  //     ]
  //   }
  const [formData, setFormData] = useState({
    offersIds: [],
    totalePrice: '',
    isPayed: true,
    details: []
  })
  const [isPopoverOpen, setIsPopoverOpen] = useState(null)
  const dispatch = useDispatch()
  const {
    offers,
    loadingGet: loadingGetOffers,
    error: errorOffers
  } = useSelector((state) => state.offer)
  const handelSelect = (id) => {
    checkIfSelected(id, formData.offersIds)
      ? setFormData((prev) => ({
          ...prev,
          offersIds: prev.offersIds.filter((element) => element !== id),
          details: prev.details.filter((element) => element.id !== id)
        }))
      : setFormData((prev) => ({
          ...prev,
          offersIds: [...prev.offersIds, id],
          details: [...prev.details, offers.find((o) => o.id === id)]
        }))
  }
  useEffect(() => {
    dispatch(getOffers())
  }, [dispatch])
 
  return (
    <>
      <div className="h-fit  rounded-lg overflow-hidden  p-2 relative bg-white dark:bg-[#242526] dark:text-white  border-1 border-gray-600 grid custemXsm:grid-cols-1  custem2Xsm:grid-cols-2 custemSm:grid-cols-3 custemMd:grid-cols-4 custemLg:grid-cols-3 custemXl:grid-cols-4 custem2xl:grid-cols-6 gap-2">
        {loadingGetOffers && <Spinner size="lg" />}
        {offers &&
          offers.map((o) => (
            <Card
            key={o.id}
              className={`relative border-2 border-gray-400 ${checkIfSelected(o.id, formData.offersIds) && 'bg-success-300'}`}
              // Close when hover ends
            >
              <Popover placement="top-end" showArrow isOpen={o.id === isPopoverOpen}>
                <PopoverTrigger>
                  {checkIfSelected(o.id, formData.offersIds) ? (
                    <Checkbox
                      isSelected={true}
                      color="success"
                      className="absolute top-1 right-0 z-40"
                      size="lg"
                      radius="full"
                      onClick={(e) => {
                        e.stopPropagation() // Prevent the click event from bubbling up
                        // Toggle popover on click
                        setIsPopoverOpen((prev) => (prev === o.id ? null : o.id))
                      }}
                    />
                  ) : (
                    <div
                      onClick={(e) => {
                        e.stopPropagation() // Prevent the click event from bubbling up
                        // Toggle popover on click
                        setIsPopoverOpen((prev) => (prev === o.id ? null : o.id))
                      }}
                      className="absolute top-1 right-1 z-40 text-primary cursor-pointer border-primary border-1 rounded-full p-1 hover:bg-primary bg-primary-50 hover:text-white"
                    >
                      <LuShoppingBag />
                    </div>
                  )}
                </PopoverTrigger>
                <PopoverContent className="dark:text-white border-2 border-gray-400">
                  <div className="px-1 py-2 flex flex-col gap-2">
                    {o.products.map((p) => (
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
                          className={`cursor-pointer w-fit  dark:text-gray-400  `}
                          key={p.id}
                          variant="solid"
                          color={checkIfSelected(o.id, formData.offersIds) ? 'success' : 'default'}
                        >
                          {' '}
                          <div className=" flex items-center">
                            <span
                              className={` text-xs lg:text-small  font-semibold  ${checkIfSelected(o.id, formData.offersIds) ? 'dark:text-black' : 'dark:text-gray-300'}`}
                            >
                              {p.name}
                            </span>
                          </div>{' '}
                        </Chip>
                      </motion.span>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

              <CardHeader className="pb-0  px-4 flex-col items-start">
                <h4 className="font-bold text-large">{o.name}</h4>
                {/* <small className="text-default-500">{o.products.length} Produits </small> */}
                <span>{formatMoney(o.price) }</span>
              </CardHeader>
              <CardBody
                className="overflow-visible cursor-pointer "
                onClick={() => handelSelect(o.id)}
              >
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src={o.imageFile ? `${imageURI}${o.imageFile}` : defaultImage}
                  width={'100%'}
                  onMouseEnter={() => setIsPopoverOpen(o.id)} // Open on hover
                  onMouseLeave={() => setIsPopoverOpen(null)}
                />
              </CardBody>
            </Card>
          ))}
      </div>
      <div className=" h-fit sticky   bg-white rounded-lg overflow-hidden overflow-y-auto dark:bg-[#242526] dark:text-white border-1 border-gray-600  p-2">
        <ResultOffers formData={formData} offers={offers} handelSelect={handelSelect} />
      </div>
    </>
  )
}

export default SelectOffer
