import {
  Button,
  Checkbox,
  Chip,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectItem,
  Spinner
} from '@nextui-org/react'
import  { useEffect,  useState } from 'react'
import { IoBagHandleOutline, IoCloseOutline, IoAddOutline, IoRemoveOutline } from 'react-icons/io5'

import { IoPrintOutline } from 'react-icons/io5'
import { PiInvoice } from 'react-icons/pi'
import {

  formatMoney,
  getRoleColor,
  getRoleIcon,
  getRoleLabel,
  getVariantOfRest,
  PrintInvoiceContent
} from '../../utils/utils'
import { toast } from 'react-toastify'
import { GiPayMoney } from 'react-icons/gi'
import { FcMoneyTransfer } from 'react-icons/fc'
import { FaDeleteLeft } from 'react-icons/fa6'
import { useDispatch } from 'react-redux'
import { createPayment } from '../../redux/api/paymentApi'
import Receipt from '../../components/Receipt'

const ResultsProduct = ({ formData, products, handelSelect, users, setFormData }) => {
  const [details, setDetails] = useState([])
  const [haveDelevry, setHaveDelevry] = useState(false)
  const [delevryId, setDelevryId] = useState(null)
  const [payePrice, setPayedPrice] = useState('')
  const [clientNumber, setClientNumber] = useState('')
  const [delevryPrice, setDelevryPrice] = useState(6)
  const [focusedInput, setFocusedInput] = useState('payedPrice')
  const dispatch = useDispatch()
  useEffect(() => {
    const selectedItems = products
      ?.filter((p) => formData.productsIds.includes(p.id))
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
  }, [formData.productsIds, products])

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
  const toggleBonus = (id) => {
    if (details?.find((p) => p.id === id).q === 0) return
    setDetails((prev) =>
      prev.map((p) =>
        p.id === id
          ? p.price === 0
            ? { ...p, price: products.find((p) => p.id === id).price }
            : { ...p, price: 0 }
          : p
      )
    )
  }
  const handleRemove = (id) => {
    setDetails((prevDetails) => prevDetails.filter((item) => item.id !== id))
    handelSelect(id) // Ensure this correctly toggles the selection
  }
  const [isLoadingCreate, setIsLOadingCreate] = useState(false)
  const handlePrint = async (id) => {
    setIsLOadingCreate(true)
    if (details.some((p) => p.q === 0)) {
      setIsLOadingCreate(false)
      toast.error(
        'Un ou plusieurs produits ont une quantité de 0. Veuillez mettre à jour les quantités.'
      )
      return
    }

    // Calculate the total price
    const totalePrice = details?.reduce((total, item) => total + item.price, 0)

    // Fetch the base64 image

    // Dispatch the payment creation action
    dispatch(
      createPayment(
        {
          ...formData,
          details: [
            ...details.map((p) => ({
              id: p.id,
              name: p.name,
              q: p.q,
              totalePrice: p.price,
              category: p.category.name,
              type: p.type
            }))
          ],
          totalePrice: totalePrice + (haveDelevry ? (!delevryPrice ? 0 : delevryPrice) : 0),
          isPayed: !haveDelevry,
          clientPhoneNumber: haveDelevry ? (clientNumber ? `${clientNumber}` : null) : null,
          delevryId: haveDelevry ? (delevryId ? parseInt(delevryId) : null) : null,
          delevryPrice: haveDelevry ? (!delevryPrice ? 0 : delevryPrice) : null,
          isDelevry: haveDelevry
        },
        (element) => {
          PrintInvoiceContent(element, {
            ...formData,
            details: [
              ...details.map((p) => ({
                id: p.id,
                name: p.name,
                q: p.q,
                totalePrice: p.price,
                category: p.category.name,
                type: p.type
              }))
            ],
            totalePrice: totalePrice + (haveDelevry ? (!delevryPrice ? 0 : delevryPrice) : 0),
            isPayed: !haveDelevry,
            clientPhoneNumber: haveDelevry ? (clientNumber ? `${clientNumber}` : null) : null,
            delevryId: haveDelevry ? (delevryId ? parseInt(delevryId) : null) : null,
            delevryPrice: haveDelevry ? (!delevryPrice ? 0 : delevryPrice) : null,
            isDelevry: haveDelevry,
            user: delevryId ? users.find((u) => u.id === parseInt(delevryId)).userName : ''
          })
          setFormData({
            details: null,
            productsIds: [],
            totalePrice: '',
            isPayed: true,
            isLocal: true
          })
          setDetails([])
          setHaveDelevry(false)
          setDelevryId(null)
          setPayedPrice('')
          setClientNumber('')
          setDelevryPrice(6)
          setFocusedInput('payedPrice')
        },
        () => setIsLOadingCreate(false)
      )
    )
  }
  const handleInputChange = (e) => {
    const value = e.target.value
    const numericValue = parseInt(value.replace(/\D/g, '')) || 0

    if (focusedInput === 'payedPrice') {
      setPayedPrice(numericValue)
    } else if (focusedInput === 'clientNumber') {
      const numeric = value.replace(/\D/g, '')
      setClientNumber(numeric)
    } else if (focusedInput === 'delevryPrice') {
      setDelevryPrice(numericValue)
    }
  }
  const handelNumberClick = (e) => {
    const value = e.target.value

    if (value !== 'delete') {
      if (focusedInput === 'payedPrice') {
        setPayedPrice((prev) => {
          const currentValue = isNaN(prev) ? '' : prev.toString()
          const updatedPrice = `${currentValue}${value}`
          return parseInt(updatedPrice, 10) || 0
        })
      } else if (focusedInput === 'clientNumber') {
        setClientNumber((prev) => {
          const updatedClientNumber = `${prev || ''}${value}`
          return updatedClientNumber
        })
      } else if (focusedInput === 'delevryPrice') {
        setDelevryPrice((prev) => {
          const currentValue = isNaN(prev) ? '' : prev.toString()
          const updatedDelevryPrice = `${currentValue}${value}`
          return parseInt(updatedDelevryPrice, 10) || 0
        })
      }
    } else if (value === 'delete') {
      if (focusedInput === 'payedPrice') {
        setPayedPrice((prev) => {
          const prevStringValue = prev.toString()
          const updatedPrice = prevStringValue.slice(0, -1)
          return updatedPrice ? parseInt(updatedPrice, 10) : 0
        })
      } else if (focusedInput === 'clientNumber') {
        setClientNumber((prev) => {
          const updatedClientNumber = prev.slice(0, -1) // Direct string slicing
          return updatedClientNumber || ''
        })
      } else if (focusedInput === 'delevryPrice') {
        setDelevryPrice((prev) => {
          const prevStringValue = prev.toString()
          const updatedPrice = prevStringValue.slice(0, -1)
          return updatedPrice ? parseInt(updatedPrice, 10) : 0
        })
      }
    }
  }

  return (
    <div className=" h-fit max-h-full bg-white rounded-lg overflow-hidden overflow-y-auto dark:bg-[#242526] dark:text-white border-1 border-gray-600 relative">
      <div className="flex items-center w-full  dark:bg-[#242526] bg-white p-3 shadow-lg sticky top-0 z-30">
        <div>
          <Chip
            variant="flat"
            color="success"
            startContent={<span>Totale : </span>}
            size="lg"
            endContent={<IoBagHandleOutline size={25} />}
          >
            {details?.length} Products | {details?.reduce((total, item) => total + item.q, 0)}{' '}
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
          onFocus={() => setFocusedInput('payedPrice')} // Set focus to this input
          onChange={handleInputChange}
          value={payePrice || ''}
        />

        <div className=" w-full flex  items-center justify-between">
          <Chip
            className="font-semibold bg- "
            variant="bordered"
            size="md"
            color="default"
            startContent={<span>Total :</span>}
            endContent={
              <span className="tracking-widest text-xs md:text-medium">
                {formatMoney(
                  details?.reduce((total, item) => total + item.price, 0) +
                    (haveDelevry ? (!delevryPrice ? 0 : delevryPrice) : 0)
                )}
              </span>
            }
          ></Chip>
          <Chip
            className="font-semibold "
            color={getVariantOfRest(
              formatMoney(payePrice - details?.reduce((total, item) => total + item.price, 0))
            )}
            variant="flat"
            size="md"
            endContent={
              <span className="tracking-widest text-xs md:text-medium">
                {formatMoney(
                  payePrice -
                    (details?.reduce((total, item) => total + item.price, 0) +
                      (haveDelevry ? (!delevryPrice ? 0 : delevryPrice) : 0))
                )}{' '}
              </span>
            }
            startContent={<GiPayMoney size={20} />}
          ></Chip>
        </div>
      </div>
      <div className="w-full flex flex-col gap-1 px-4 mb-2">
        <div className="flex items-center gap-2">
          <Checkbox
            size="lg"
            color="success"
            // icon={<FaMotorcycle />}
            className="flex-shrink-0"
            isSelected={haveDelevry}
            value={haveDelevry}
            onChange={(e) => setHaveDelevry(e.target.checked)}
          >
            Avec livraison
          </Checkbox>
          {haveDelevry && (
            <Input
              variant="bordered"
              placeholder="Frais de livraison"
              onFocus={() => setFocusedInput('delevryPrice')} // Set focus to this input
              onChange={handleInputChange}
              value={delevryPrice || ''}
            />
          )}
        </div>
        {haveDelevry && (
          <div className="flex items-center gap-2">
            {users ? (
              <Select
                placeholder="Livreur"
                variant="bordered"
                className="dark:text-white text-black"
                onChange={(e) => setDelevryId(e.target.value)}
                value={delevryId}
                fullWidth
                aria-label="delecryId"
                selectedKeys={[delevryId]}
              >
                {users?.map((u) => (
                  <SelectItem
                    value={u.id}
                    key={u.id}
                    endContent={
                      <Chip
                        size="sm"
                        variant="flat"
                        startContent={getRoleIcon(u.role)}
                        color={getRoleColor(u.role)}
                      >
                        {getRoleLabel(u.role).slice(0, 3)}
                      </Chip>
                    }
                  >
                    {u.userName}
                  </SelectItem>
                ))}
              </Select>
            ) : (
              <div>
                <Spinner size="sm" label="chargement ...." />
              </div>
            )}
            <Input
              className="w-[190px]"
              placeholder="numero de client"
              variant="bordered"
              onFocus={() => setFocusedInput('clientNumber')} // Set focus to this input
              onChange={handleInputChange}
              value={clientNumber || ''}
            />
          </div>
        )}
      </div>
      <div className="px-3 pb-3 w-full flex flex-col gap-3 items-center">
        <div className="  w-full ">
          <div className="overflow-x-auto rounded-t-lg w-full justify-center shadow-[0px_0px_7px_-2px_rgba(0,0,0,0.75)] rounded-lg">
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
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700 font-sans tracking-wide">
                {details?.length > 0 ? (
                  <>
                    {' '}
                    {details?.map((item) => (
                      <tr className="hover:bg-blue-200 dark:hover:bg-gray-900" key={item.id}>
                        <td className="whitespace-nowrap px-1 py-1 font-medium text-xs lg:text-xs text-gray-900 dark:text-white w-full text-start capitalize">
                          {item.category.name + ' ' + item.name + ' ' + (item.type ? `(${item.type})` : "")}
                        </td>
                        <td className="whitespace-nowrap px-1 py-1 text-gray-700 dark:text-gray-200 w-auto text-center text-xs lg:text-xs">
                          <div className="w-[130px] flex justify-center items-center gap-2">
                            
                            <Button
                              isIconOnly
                              size="sm"
                              color={item.q <= 0 ? 'default' : 'primary'}
                              onClick={() => handleDecrement(item.id, item.q)}
                              disabled={item.q <= 0}
                              variant="flat"
                            >
                              <IoRemoveOutline />
                            </Button>

                            {/* Input Field */}
                            <Input
                              className="flex-grow text-right"
                              variant="faded"
                              size="sm"
                              value={item.q === 0 ? '' : item.q} // Show an empty field if quantity is 0 to allow user input
                              onChange={(e) => {
                                const inputValue =
                                  e.target.value === '' ? 0 : parseInt(e.target.value) // Handle empty input as 0
                                if (!isNaN(inputValue)) {
                                  addQ(item.id, inputValue) // Update both quantity and price based on the new value
                                }
                              }}
                              placeholder="0"
                            />

                            {/* Increment Button */}
                            <Button
                              isIconOnly
                              size="sm"
                              color="primary"
                              variant="flat"
                              onClick={() => handleIncrement(item.id, item.q)}
                            >
                              <IoAddOutline />
                            </Button>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-1 py-1 font-medium text-gray-900 dark:text-white w-full text-center text-xs lg:text-xs">
                          <Chip
                            size="sm"
                            variant="flat"
                            className="cursor-pointer"
                            onClick={() => toggleBonus(item.id)}
                            endContent={item.price !== 0 && <span>MAD</span>}
                            color={
                              item.price === 0 ? (item.q === 0 ? 'danger' : 'warning') : 'success'
                            }
                          >
                            {item.price === 0 ? (
                              item.q === 0 ? (
                                <span className="font-semibold">invalide </span>
                              ) : (
                                <span className="font-semibold">Bonus</span>
                              )
                            ) : (
                              <span className="font-semibold">{item.price}</span>
                            )}
                          </Chip>
                        </td>
                        <td className=" px-1 py-1 text-gray-700 dark:text-gray-200 w-auto ">
                          <div className="w-full h-full flex items-center justify-center">
                            <button
                              onClick={() => handleRemove(item.id)}
                              className="rounded-lg  hover:bg-danger/40 text-danger p-1"
                            >
                              <IoCloseOutline size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}{' '}
                    {haveDelevry && (
                      <tr className="hover:bg-blue-200 dark:hover:bg-gray-900">
                        <td className="whitespace-nowrap px-1 py-1 font-medium text-xs lg:text-xs text-gray-900 dark:text-white w-full text-start">
                          livraison
                        </td>
                        <td className="whitespace-nowrap px-1 py-1 text-gray-700 dark:text-gray-200 w-auto text-center text-xs lg:text-xs">
                          ...
                        </td>
                        <td className="whitespace-nowrap px-1 py-1 font-medium text-gray-900 dark:text-white w-full text-center text-xs lg:text-xs">
                          <span className="whitespace-nowrap">
                            <Chip
                              size="sm"
                              variant="flat"
                              endContent={<span>MAD</span>}
                              color={'success'}
                            >
                              {!delevryPrice ? 0 : delevryPrice}
                            </Chip>
                          </span>
                        </td>
                        <td className=" px-1 py-1 text-gray-700 dark:text-gray-200 w-auto "></td>
                      </tr>
                    )}
                  </>
                ) : (
                  <tr>
                    <td colSpan={4}>
                      <div className="flex items-center justify-center font-semibold text-lg py-5 text-red-500">
                        Aucun Produit Selectioné
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 w-full flex items-center justify-between bg-white dark:bg-[#242526] p-2">
        <Popover placement="left-end" shouldCloseOnInteractOutside={() => false}>
          <PopoverTrigger>
            <Button color="secondary">
              <PiInvoice size={20} />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Receipt
              payment={{
                ...formData,
                details: [
                  ...details.map((p) => ({
                    id: p.id,
                    name: p.name,
                    q: p.q,
                    totalePrice: p.price,
                    category: p.category.name,
                    type: p.type
                  }))
                ],
                totalePrice:
                  details?.reduce((total, item) => total + item.price, 0) +
                  (haveDelevry ? (!delevryPrice ? 0 : delevryPrice) : 0),
                isPayed: !haveDelevry,
                clientPhoneNumber: haveDelevry ? (clientNumber ? `${clientNumber}` : null) : null,
                delevryId: haveDelevry ? (delevryId ? parseInt(delevryId) : null) : null,
                delevryPrice: haveDelevry ? (!delevryPrice ? 0 : delevryPrice) : null,
                isDelevry: haveDelevry,
                user: delevryId ? users.find((u) => u.id === parseInt(delevryId)).userName : ''
              }}
            />
          </PopoverContent>
        </Popover>

        <Button color="primary" onClick={handlePrint} isLoading={isLoadingCreate}>
          <IoPrintOutline size={20} />
        </Button>
      </div>
    </div>
  )
}

export default ResultsProduct
