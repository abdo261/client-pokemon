import { Button, Chip, Input, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { IoBagHandleOutline, IoCloseOutline, IoAddOutline, IoRemoveOutline } from 'react-icons/io5'
import { PiMoneyWavy } from 'react-icons/pi'
import { IoPrintOutline } from 'react-icons/io5'
import { PiInvoice } from 'react-icons/pi'
import { formatMoney } from '../../utils/utils'
import pokeemon from '../../assets/images/pokeemon-01.png'
const Results = ({ formData, products, handelSelect }) => {
  const [details, setDetails] = useState([])

  // Initialize selected products with quantity 1
  useEffect(() => {
    const selectedItems = products
      .filter((p) => formData.productsIds.includes(p.id))
      .map((p) => {
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

  return (
    <div className="h-[600px] bg-white rounded-lg overflow-hidden overflow-y-auto dark:bg-[#242526] dark:text-white border-3 border-gray-600 relative">
      <div className="flex items-center w-full  dark:bg-[#242526] bg-white p-3 shadow-lg sticky top-0 z-30">
        <div>
          <Chip
            variant="flat"
            color="success"
            startContent={<span>Totale : </span>}
            size="lg"
            endContent={<IoBagHandleOutline size={25} />}
          >
            {details.length} Products | {details.reduce((total, item) => total + item.q, 0)}{' '}
            Quantity
          </Chip>
        </div>
      </div>
      <div className="px-3 pb-3 w-full flex flex-col gap-3 items-center">
        <div className="rounded-lg  w-full mt-4">
          <div className="overflow-x-auto rounded-t-lg w-full justify-center shadow-[0px_0px_7px_-2px_rgba(0,0,0,0.75)]">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white dark:divide-gray-700 dark:bg-[#43474b]">
              <thead className="ltr:text-left rtl:text-right text-xs lg:text-xs">
                <tr className="font-normal">
                  <th className="whitespace-nowrap px-2 py-2 text-gray-900 dark:text-white font-semibold">
                    Nom
                  </th>
                  <th className="whitespace-nowrap px-2 py-2 text-gray-900 dark:text-white font-semibold text-center">
                    Quantité
                  </th>
                  <th className="whitespace-nowrap px-2 py-2 text-gray-900 dark:text-white font-semibold text-center">
                    Prix
                  </th>
                  <th className="whitespace-nowrap  text-gray-900 dark:text-white"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700 font-sans tracking-wide">
                {details.length > 0 ? (
                  details.map((item) => (
                    <tr className="hover:bg-blue-200 dark:hover:bg-gray-900" key={item.id}>
                      <td className="whitespace-nowrap px-2 py-2 font-medium text-xs lg:text-xs text-gray-900 dark:text-white w-full text-start">
                        {item.name}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-gray-700 dark:text-gray-200 w-auto text-center text-xs lg:text-xs">
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
                            className="flex-grow"
                            variant="faded"
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
                      <td className="whitespace-nowrap px-2 py-2 font-medium text-gray-900 dark:text-white w-full text-center text-xs lg:text-xs">
                        <Chip
                          size="lg"
                          variant="flat"
                          startContent={<PiMoneyWavy color="green" />}
                          endContent={<span>MAD</span>}
                          color={item.price === 0 ? 'danger' : 'default'}
                        >
                          <span className="font-semibold">{item.price}</span>
                        </Chip>
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-gray-700 dark:text-gray-200 w-auto text-center">
                        <Button
                          size="sm"
                          isIconOnly
                          radius="md"
                          className="group"
                          color="danger"
                          variant="ghost"
                          onClick={() => handleRemove(item.id)} // Use updated remove handler
                        >
                          <IoCloseOutline
                            size={18}
                            className="text-danger group-hover:text-white"
                          />
                        </Button>
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
        <Popover>
          <PopoverTrigger>
            <Button color="secondary">
              <PiInvoice size={20} />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="px-3 py-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-300  rounded-md w-[400px] text-sm font-mono">
              
                <div className=" mx-auto w-[100px] h-fit">
                  <img src={pokeemon} className="w-full object-cover" />
                </div>
           
              <p className="text-center text-xs">123 Adresse de la rue</p>
              <p className="text-center text-xs mb-2">Tan-Tan, Maroc</p>

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
                  {details.map((item) => (
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
                    <td className="border-t border-gray-300 px-2 py-2 text-left">Total</td>
                    <td colSpan="2" className="border-t border-gray-300 px-2 py-2 text-right">
                      {formatMoney(details.reduce((total, item) => total + item.price, 0))}
                    </td>
                  </tr>
                </tfoot>
              </table>

              <div className="border-t border-gray-300 my-2"></div>

              <p className="text-xs text-center">Merci pour votre achat !</p>
            </div>
          </PopoverContent>
        </Popover>

        <Button color="primary">
          <IoPrintOutline size={20} />
        </Button>
      </div>
    </div>
  )
}

export default Results
