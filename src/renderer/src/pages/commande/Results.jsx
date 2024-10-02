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

const Results = ({ formData, products, handelSelect }) => {
  const [details, setDetails] = useState([])
  const [payePrice, setPayedPrice] = useState('')
  const printRef = useRef(null)

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

  const handleRemove = (id) => {
    setDetails((prevDetails) => prevDetails.filter((item) => item.id !== id))
    handelSelect(id) // Ensure this correctly toggles the selection
  }
  const [base64Image, setBase64Image] = useState('')
  useEffect(() => {
    const fetchImage = async () => {
      try {
        // If the image is in the `public` folder, use the relative path
        const imagePath = '/images/pokeemon-01.png' // Path from the `public` folder
        const base64 = await convertImageToBase64(imagePath)
        setBase64Image(base64)
      } catch (error) {
        console.error('Failed to convert image to Base64', error)
      }
    }

    fetchImage()
  }, [])
  const handlePrint = () => {
    // Create HTML content for printing
    const content = `
     <html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
         width: 80mm;
      }

      table {
        width: 100%;
        border-collapse: collapse;
      }

      th, td {
        border: 1px solid #ddd;
        padding: 8px;
      }

      th {
        background-color: #f2f2f2;
      }

      .text-center {
        text-align: center;
      }

      .font-bold {
        font-weight: bold;
      }

      .mt-2 {
        margin-top: 2em;
      }

      .mb-2 {
        margin-bottom: 2em;
      }

      .container {
        padding-left: 3px;
        padding-right: 3px;
        padding-top: 3px;
        padding-bottom: 3px;
        background-color: white;
        border: 1px solid #ccc;
        border-radius: 6px;
        width: 400px;
        color: #333;
        font-size: 12px;
        font-family: monospace;
      }

      .container.dark {
        background-color: #333;
        color: #ddd;
      }

      .image-container {
        margin-left: auto;
        margin-right: auto;
        width: 100px;
        height: auto;
      }

      .image {
        width: 100%;
        object-fit: cover;
      }

      .address, .city {
        text-align: center;
        font-size: 10px;
      }

      .border-top {
        border-top: 1px solid #ccc;
        margin-top: 8px;
        margin-bottom: 8px;
      }

      .table {
        width: 100%;
        border-collapse: collapse;
        font-size: 12px;
      }

      .table thead th {
        border: 1px solid #ccc;
        padding: 4px;
        font-weight: bold;
        background-color: #e5e7eb;
      }

      .table tbody td {
        border: 1px solid #ccc;
        padding: 4px;
      }

      .table tbody td.truncate {
        width: 100%;
      }

      .table tbody td.text-center {
        text-align: center;
      }

      .table tbody td.text-right {
        text-align: right;
      }

      .table tfoot td {
        border-top: 1px solid #ccc;
        padding: 4px;
      }

      .thank-you {
        text-align: center;
        font-size: 10px;
        margin-top: 8px;
      }

    </style>
  </head>
  <body>
    <div class="container">
      <div class="image-container">
        <img src="../../assets/images/pokeemon-01.png" class="image" />
      </div>
      <p class="address">123 Adresse de la rue</p>
      <p class="city mb-2">Tan-Tan, Maroc</p>
      <div class="border-top"></div>
      <p class="text-xs">
        Date : ${new Date().toLocaleDateString()} à ${new Date().toLocaleTimeString()}
      </p>
      <p class="text-xs mb-2">Facture #12345</p>
      <div class="border-top"></div>
      <table class="table">
        <thead>
          <tr>
            <th>Article</th>
            <th>Qté</th>
            <th>Prix</th>
          </tr>
        </thead>
        <tbody>
          ${details
            .map(
              (item) => `
            <tr>
              <td class="truncate">${item.name}</td>
              <td class="text-center">${item.q}</td>
              <td class="text-right">${item.price} MAD</td>
            </tr>
          `
            )
            .join('')}
        </tbody>
        <tfoot>
          <tr class="font-semibold">
            <td class="text-left">Total</td>
            <td colspan="2" class="text-right">
              ${formatMoney(details.reduce((total, item) => total + item.price, 0))}
            </td>
          </tr>
        </tfoot>
      </table>
      <div class="border-top"></div>
      <p class="thank-you">Merci pour votre achat !</p>
    </div>
  </body>
</html>

    `
    try {
      if (window.api && window.api.print) {
        window.api.print(content)
        toast.success('printing success')
      } else {
        toast.error('eror printing')
      }
    } catch (error) {
      toast.error('eror printing')
    }
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

  console.log(payePrice)
  return (
    <div className="h-fit max-h-[600px] bg-white rounded-lg overflow-hidden overflow-y-auto dark:bg-[#242526] dark:text-white border-1 border-gray-600 relative">
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
                {' '}
                {formatMoney(details?.reduce((total, item) => total + item.price, 0))}
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
                {formatMoney(payePrice - details?.reduce((total, item) => total + item.price, 0))}{' '}
              </span>
            }
            startContent={<GiPayMoney size={20} />}
          ></Chip>{' '}
        </div>
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
                  details?.map((item,index) => (
                    <tr className="hover:bg-blue-200 dark:hover:bg-gray-900" key={item.id}>
                      
                      <td className="whitespace-nowrap px-1 py-1 font-medium text-xs lg:text-xs text-gray-900 dark:text-white w-full text-start">
                      {item.name}
                      </td>
                      <td className="whitespace-nowrap px-1 py-1 text-gray-700 dark:text-gray-200 w-auto text-center text-xs lg:text-xs">
                        <div className="w-[130px] flex justify-center items-center gap-2">
                          {/* Decrement Button */}
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
                         
                          endContent={<span>MAD</span>}
                          color={item.price === 0 ? 'danger' : 'default'}
                        >
                          <span className="font-semibold">{item.price}</span>
                        </Chip>
                      </td>
                      <td className=" px-1 py-1 text-gray-700 dark:text-gray-200 w-auto ">
                       <div className='w-full h-full flex items-center justify-center'><button
                          onClick={() => handleRemove(item.id)}
                           className='rounded-lg  hover:bg-danger/40 text-danger p-1'
                        >
                          <IoCloseOutline size={18}  />
                        </button>
                        </div> 
                      </td>
                    </tr>
                  ))
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
        <Popover placement="top" shouldCloseOnInteractOutside={()=>false}>
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
                      {formatMoney(details?.reduce((total, item) => total + item.price, 0))}
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

export default Results
