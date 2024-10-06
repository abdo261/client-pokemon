import { Button, Chip, Input, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'
import React, { useEffect, useRef, useState } from 'react'
import { IoBagHandleOutline, IoCloseOutline, IoAddOutline, IoRemoveOutline } from 'react-icons/io5'
import { PiMoneyWavy } from 'react-icons/pi'
import { IoPrintOutline } from 'react-icons/io5'
import { PiInvoice } from 'react-icons/pi'
import { formatMoney, getVariantOfRest } from '../../utils/utils'
import pokeemon from '../../assets/images/pokeemon-01.png'
import { toast } from 'react-toastify'
import { MdPhoneInTalk } from 'react-icons/md'
import { GiPayMoney } from 'react-icons/gi'
import { FcMoneyTransfer } from 'react-icons/fc'
import { FaDeleteLeft } from 'react-icons/fa6'
import { useDispatch } from 'react-redux'
import { createPayment } from '../../redux/api/paymentApi'

const ResultOffers = ({ formData, offers, handelSelect }) => {
  const [details, setDetails] = useState([])
  const [payePrice, setPayedPrice] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    const selectedItems = offers
      ?.filter((p) => formData.offersIds.includes(p.id))
      ?.map((p) => {
        const existing = details.find((item) => item.id === p.id)
        return {
          ...p,
          q: existing ? existing.q : 1,
          unitPrice: existing ? existing.unitPrice : p.price,
          price: existing ? existing.price : p.price
        }
      })
    setDetails(selectedItems)
  }, [formData.offersIds, offers])

  const addQ = (id, quantity) => {
    setDetails((prevDetails) =>
      prevDetails.map((item) => {
        const newQuantity = !isNaN(quantity) && quantity >= 0 ? quantity : 0
        const unitPrice = item.unitPrice || (item.q ? item.price / item.q : item.price)
        return item.id === id
          ? { ...item, q: newQuantity, price: newQuantity * unitPrice, unitPrice }
          : item
      })
    )
  }

  const handleIncrement = (id, currentQuantity) => {
    addQ(id, currentQuantity + 1)
  }

  const handleDecrement = (id, currentQuantity) => {
    addQ(id, currentQuantity > 0 ? currentQuantity - 1 : 0) // Ensure quantity doesn't go below 0
  }

  const handleRemove = (id) => {
    setDetails((prevDetails) => prevDetails.filter((item) => item.id !== id))
    handelSelect(id) // Ensure this correctly toggles the selection
  }

  const handlePrint = () => {
    if (details.some((p) => p.q === 0)) {
      toast.error(
        'Un ou plusieurs produits ont une quantité de 0. Veuillez mettre à jour les quantités.'
      )
      return
    }
 
    // dispatch(
    //   createPayment({
    //     ...formData,
    //     details: details.map((p) => ({ id: p.id, name: p.name, q: p.q, totalePrice: p.price })),
    //     isPayed: true,
    //     totalePrice: details?.reduce((total, item) => total + item.price, 0)
    //   })
    // )
  }

  const handelNumberClick = (e) => {
    const value = e.target.value
    if (value !== 'delete') {
      setPayedPrice((prev) => {
        const currentValue = isNaN(prev) ? '' : prev.toString()
        const updatedPrice = `${currentValue}${value}`
        return parseInt(updatedPrice, 10) || 0
      })
    } else if (value === 'delete') {
      setPayedPrice((prev) => {
        const prevStringValue = prev.toString()
        const updatedPrice = prevStringValue.slice(0, -1)
        return updatedPrice ? parseInt(updatedPrice, 10) : 0
      })
    }
  }

  return (
    <div className="h-fit max-h-[500px]  rounded-lg overflow-hidden overflow-y-auto dark:bg-[#242526] dark:text-white border-1 border-gray-600 relative">
      <div className="flex items-center w-full  dark:bg-[#242526] bg-white p-3 shadow-lg sticky top-0 z-30">
        <div>
          <Chip
            variant="flat"
            color="success"
            startContent={<span>Totale : </span>}
            size="lg"
            endContent={<IoBagHandleOutline size={25} />}
          >
            {details?.length} offers |{' '}
            {details?.reduce((total, item) => parseInt(total) + parseInt(item.q), 0)}
            Quantity
          </Chip>
        </div>
      </div>

      <div className="w-full p-3 flex flex-col gap-2">
        <div className=" grid grid-cols-4 sm:grid-cols-7 md:grid-cols-6  gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((e) => (
            <div className="flex items-center" key={e}>
              <Button
                size="sm"
                fullWidth={true}
                className="text-center text-xl"
                onPress={handelNumberClick}
                value={e}
              >
                {e}
              </Button>
            </div>
          ))}
          <div className="flex items-center col-auto">
            <Button
              size="sm"
              fullWidth
              className="text-center"
              onPress={handelNumberClick}
              value={'delete'}
            >
              <FaDeleteLeft size={20} />
            </Button>
          </div>
        </div>
        <Input
          startContent={<FcMoneyTransfer size={20} />}
          variant="bordered"
          color="warning"
          size="lg"
          className="flex-1"
          placeholder="prix payé"
          onChange={(e) => {
            const value = e.target.value
            const numericValue = parseInt(value.replace(/\D/g, '')) || 0
            setPayedPrice(numericValue)
          }}
          value={payePrice || ''}
        />

        <div className="flex  items-center justify-between w-full">
          <Chip
            className="font-semibold bg- "
            variant="bordered"
            size="md"
            color="default"
            startContent={<span>Total :</span>}
            endContent={
              <span className="tracking-widest text-xs md:text-medium">
                {formatMoney(
                  details?.reduce((total, item) => parseInt(total) + parseInt(item.price), 0)
                )}
              </span>
            }
          ></Chip>
          <Chip
            className="font-semibold "
            color={getVariantOfRest(
              formatMoney(
                payePrice -
                  details?.reduce((total, item) => parseInt(total) + parseInt(item.price), 0)
              )
            )}
            variant="flat"
            size="md"
            endContent={
              <span className="tracking-widest text-xs md:text-medium">
                {formatMoney(
                  payePrice -
                    details?.reduce((total, item) => parseInt(total) + parseInt(item.price), 0)
                )}
              </span>
            }
            startContent={<GiPayMoney size={20} />}
          ></Chip>{' '}
        </div>
      </div>

      <div className="px-3 pb-3 w-full flex flex-col gap-3 items-center">
        <div className="  w-full overflow-hidden">
          <div className="overflow-x-auto  rounded-t-lg w-full justify-center shadow-[0px_0px_7px_-2px_rgba(0,0,0,0.75)] rounded-lg">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white dark:divide-gray-700 dark:bg-[#43474b] rounded-lg">
              <thead className="ltr:text-left rtl:text-right text-xs lg:text-xs">
                <tr className="font-normal">
                  <th className="whitespace-nowrap px-1 py-1 text-gray-900 dark:text-white font-semibold">
                    Nom
                  </th>
                  <th className="whitespace-nowrap px-1 py-1 text-gray-900 dark:text-white font-semibold text-center">
                    Quantité
                  </th>
                  <th className="whitespace-nowrap px-1 py-1 text-gray-900 dark:text-white font-semibold text-center">
                    Prix
                  </th>
                  <th className="whitespace-nowrap  text-gray-900 dark:text-white"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700 font-sans tracking-wide text-xs lg:text-sm text-center">
                {details?.map((e) => (
                  <tr key={e.id} className="dark:bg-[#242526] ">
                    <td className="whitespace-nowrap px-1 py-1 text-gray-900 dark:text-white ">
                      {e.name}{' '}
                    </td>
                    <td className="whitespace-nowrap px-1 py-1 text-gray-900 dark:text-white ">
                      <div className="flex items-center justify-center gap-1">
                        <Button
                          isIconOnly
                          className="p-0.5"
                          color="danger"
                          size="sm"
                          variant="faded"
                          onPress={() => handleDecrement(e.id, e.q)}
                        >
                          <IoRemoveOutline />
                        </Button>

                        <Input
                          variant="bordered"
                          value={e.q}
                          size="sm"
                          className="w-[60px] text-center font-semibold"
                          onChange={(val) => addQ(e.id, val)}
                        />

                        <Button
                          isIconOnly
                          className="p-0.5"
                          size="sm"
                          onPress={() => handleIncrement(e.id, e.q)}
                        >
                          <IoAddOutline />
                        </Button>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-1 py-1 text-gray-900 dark:text-white">
                      {formatMoney(e.price)}
                    </td>

                    <td className="whitespace-nowrap px-1 py-1 text-gray-900 dark:text-white ">
                      <Button
                        size="sm"
                        color="danger"
                        isIconOnly
                        variant="flat"
                        onPress={() => handleRemove(e.id)}
                      >
                        <IoCloseOutline />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="sticky bottom-0 w-full flex items-center justify-between bg-white dark:bg-[#242526] p-2">
        <Popover placement="top" shouldCloseOnInteractOutside={() => false}>
          <PopoverTrigger>
            <Button color="secondary">
              <PiInvoice size={20} />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="px-3 py-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-300  rounded-md w-[320px] md:w[450px] text-sm font-mono">
              <div className=" mx-auto w-[100px] h-fit">
                <img src={pokeemon} className="w-full object-cover" />
              </div>

              <p className="text-center text-xs">123 Adresse de la rue Tan-Tan, Maroc</p>
              <p className=" text-xs mb-2 flex items-center gap-2 w-fit mx-auto">
                <MdPhoneInTalk /> <span> 06 66 66 66 66</span>
              </p>

              <div className="border-t border-gray-300 my-2"></div>

              <p className="text-xs">
                Date : {new Date().toLocaleDateString()} à {new Date().toLocaleTimeString()}
              </p>
              <p className="text-xs mb-2">Facture #12345</p>

              <div className="border-t border-gray-300 my-2"></div>

              {/* Table Headers */}
              <table className="table-auto w-full border-collapse border border-gray-300 text-xs">
                <thead className="dark:text-black">
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 px-2 py-1 font-bold">Article</th>
                    <th className="border border-gray-300 px-2 py-1 font-bold">Qté</th>
                    <th className="border border-gray-300 px-2 py-1 font-bold">Prix</th>
                  </tr>
                </thead>

                <tbody>
                  {details?.map((item) => (
                    <tr key={item.id}>
                      <td className="border border-gray-300 px-2 py-1 truncate w-full">
                        {item.name}
                      </td>
                      <td className="border border-gray-300 px-2 py-1 text-center">{item.q}</td>
                      <td className="border border-gray-300 px-2 py-1  text-right">
                        <span className="whitespace-nowrap">{item.price} MAD</span>
                      </td>
                    </tr>
                  ))}
                </tbody>

                {/* Totals as Footer */}
                <tfoot>
                  <tr className="font-semibold">
                    <td className="border-t border-gray-300 px-1 py-1 text-left">Total</td>
                    <td colSpan="2" className="border-t border-gray-300 px-1 py-1 text-right">
                      {formatMoney(
                        details?.reduce((total, item) => parseInt(total) + parseInt(item.price), 0)
                      )}
                    </td>
                  </tr>
                </tfoot>
              </table>

              <div className="border-t border-gray-300 my-2"></div>

              <p className="text-xs text-center">Merci pour votre achat !</p>
            </div>
          </PopoverContent>
        </Popover>

        <Button color="primary" onClick={handlePrint}>
          <IoPrintOutline size={20} />
        </Button>
      </div>
    </div>
  )
}

export default ResultOffers
