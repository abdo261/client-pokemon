import {
  Button,
  Input,
  Pagination,
  Spinner,
  Chip,
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@nextui-org/react'
import { useEffect, useMemo, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import swal from 'sweetalert'
import ErrorAlert from '../components/ErrorAlert'
import { deletePayment, getPayments, updatePayment } from '../redux/api/paymentApi'
import { convertImageToBase64, formatMoney } from '../utils/utils'
import { GiShop } from 'react-icons/gi'
import { MdOutlineShop2} from 'react-icons/md'
import { PiInvoice } from 'react-icons/pi'
import pokeemon from '../assets/images/pokeemon-01.png'
import { IoPrintOutline } from 'react-icons/io5'
import { BiSolidEdit, BiTrash } from 'react-icons/bi'
import { toast } from 'react-toastify'
import Receipt from './Receipt'

const ProductInvoice = () => {
  const dispatch = useDispatch()
  const [isLoadingDelete, setIsLoadingDelete] = useState(false)
  const [isPayedLoading ,setIsPayedLoading] = useState(null)
  const { payments, loadingGet, error } = useSelector((state) => state.payment)
  const [searchItemPayed, setSearchItemPayed] = useState('')
  const [searchItemUnPayed, setSearchItemUnPayed] = useState('')
  const [pagePayed, setPagePayed] = useState(1)
  const [pageUnPayed, setPageUnPayed] = useState(1)
  const rowsPerPage = 8

  // Filter logic for paid payments
  const filteredPaymentsPayed = useMemo(() => {
    if (!searchItemPayed || isNaN(parseInt(searchItemPayed))) {
      return payments?.filter((c) => c.isPayed === true)
    }
    return payments?.filter((c) => c.id === parseInt(searchItemPayed) && c.isPayed === true)
  }, [searchItemPayed, payments])

  // Filter logic for unpaid payments
  const filteredPaymentsUnPayed = useMemo(() => {
    if (!searchItemUnPayed || isNaN(parseInt(searchItemUnPayed))) {
      return payments?.filter((c) => c.isPayed === false)
    }
    return payments?.filter((c) => c.id === parseInt(searchItemUnPayed) && c.isPayed === false)
  }, [searchItemUnPayed, payments])

  // Pagination logic for paid payments
  const { totalFilteredPaymentsPayed, pagesPayed } = useMemo(() => {
    const totalFilteredPaymentsPayed = filteredPaymentsPayed?.length || 0
    const pagesPayed = Math.ceil(totalFilteredPaymentsPayed / rowsPerPage)
    return { totalFilteredPaymentsPayed, pagesPayed }
  }, [filteredPaymentsPayed, rowsPerPage])

  // Pagination logic for unpaid payments
  const { totalFilteredPaymentsUnPayed, pagesUnPayed } = useMemo(() => {
    const totalFilteredPaymentsUnPayed = filteredPaymentsUnPayed?.length || 0
    const pagesUnPayed = Math.ceil(totalFilteredPaymentsUnPayed / rowsPerPage)
    return { totalFilteredPaymentsUnPayed, pagesUnPayed }
  }, [filteredPaymentsUnPayed, rowsPerPage])

  // Slice data for paid payments
  const itemsPayed = useMemo(() => {
    const start = (pagePayed - 1) * rowsPerPage
    const end = start + rowsPerPage
    return filteredPaymentsPayed?.slice(start, end)
  }, [pagePayed, filteredPaymentsPayed])

  // Slice data for unpaid payments
  const itemsUnpayed = useMemo(() => {
    const start = (pageUnPayed - 1) * rowsPerPage
    const end = start + rowsPerPage
    return filteredPaymentsUnPayed?.slice(start, end)
  }, [pageUnPayed, filteredPaymentsUnPayed])

  const [itemToDelete, setItemToDelete] = useState(null)

  useEffect(() => {
    if (itemToDelete) {
      swal({
        title: 'Êtes-vous sûr de vouloir supprimer cet élément?',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      }).then((isOk) => {
        if (isOk) {
          setIsLoadingDelete(true)
          dispatch(deletePayment(itemToDelete, () => setIsLoadingDelete(false)))
        } else {
          setItemToDelete(null)
          setIsLoadingDelete(false)
        }
      })
    }
  }, [itemToDelete, dispatch])

  useEffect(() => {
    dispatch(getPayments())
  }, [dispatch])
  const handlePrint = async (element) => {
    // Calculate the total price

    // Fetch the base64 image
    const base64Image = await convertImageToBase64(pokeemon) // Ensure 'pokeemon' is the correct image path or use your relative path
    // Define the HTML content
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
              padding: 3px;
              background-color: white;
              border: 1px solid #ccc;
              border-radius: 6px;
              width: 302px;
              color: #333;
              font-size: 12px;
              font-family: monospace;
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
            .address {
              text-align: center;
              font-size: 10px;
              
            }
              .city {
              text-align: center;
              font-size: 10px;
              display: flex;
              align-items: center;
              justify-content: center; 
              gap: 4px;
            }
              .city img {
               width:14px;
               height: 14px; 
               object-fit: contain;
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
              <img src="${base64Image}" class="image" />
            </div>
            <p class="address">123 Adresse de la rue Tan-Tan, Maroc</p>
            <p class="city ">
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIgMGMtNi42MjcgMC0xMiA1LjM3My0xMiAxMnM1LjM3MyAxMiAxMiAxMiAxMi01LjM3MyAxMi0xMi01LjM3My0xMi0xMi0xMnptMy40NDUgMTcuODI3Yy0zLjY4NCAxLjY4NC05LjQwMS05LjQzLTUuOC0xMS4zMDhsMS4wNTMtLjUxOSAxLjc0NiAzLjQwOS0xLjA0Mi41MTNjLTEuMDk1LjU4NyAxLjE4NSA1LjA0IDIuMzA1IDQuNDk3bDEuMDMyLS41MDUgMS43NiAzLjM5Ny0xLjA1NC41MTZ6Ii8+PC9zdmc+">
             0666666666</p>
            <div class="border-top"></div>
            <p>Date : ${new Date(element.createdAt).toLocaleDateString()} à ${new Date(element.createdAt).toLocaleTimeString()}</p>
           ${element.deletePayment ? (element.clientPhoneNumber ? '<p>Client : ' + element.clientPhoneNumber + '</p>' : '') : ''}
            <p class="">Facture #12345</p>
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
                ${JSON.parse(element.details)
                  ?.map(
                    (item) => `
                    <tr>
                      <td>${item.name}</td>
                      <td class="text-center">${item.q}</td>
                      <td class="text-right">${item.price} MAD</td>
                    </tr>
                  `
                  )
                  .join('')}
                  ${
                    element.delevryId &&
                    `
                      <tr>
                        <td className="truncate w-full">livraison</td>
                        <td className="text-center">...</td>
                        <td className="text-right">${!element.delevryPrice ? 0 : element.delevryPrice} MAD</td>
                      </tr>`
                  }
              </tbody>
              <tfoot>
                <tr>
                  <td>Total</td>
                  <td colspan="2" class="text-right">${element.totalePrice} MAD</td>
                </tr>
              </tfoot>
            </table>
            <div class="border-top"></div>
            <p class="thank-you">Merci pour votre achat !</p>
          </div>
        </body>
      </html>
    `

    // Print the content
    try {
      if (window.api && window.api.print) {
        window.api.print(content)
        toast.success('Impression réussie')
      } else {
        toast.error("Erreur d'impression 1")
      }
    } catch (error) {
      toast.error("Erreur d'impression 2")
    }
  }
  const handelPay = (element) => {
    setIsPayedLoading(element.id)
    dispatch(updatePayment(element.id, { isPayed: !element.isPayed },null,()=>setIsPayedLoading(null)))
  }
  return (
    <>
      {/* Unpaid Payments Section */}
      <div className="flex justify-between gap-3 items-center bg-white shadow p-3 rounded-lg mt-4 dark:bg-[#43474b] dark:text-white">
        <div className="w-full sm:max-w-[44%]">
          <Input
            fullWidth
            isClearable
            placeholder="Rechercher par N°..."
            startContent={<FiSearch />}
            variant="faded"
            onChange={(e) => setSearchItemUnPayed(e.target.value)}
            value={searchItemUnPayed}
            onClear={() => setSearchItemUnPayed('')}
            size="lg"
            className="tracking-widest"
          />
        </div>
      </div>

      {payments && itemsUnpayed && (
        <div className={`rounded-lg    w-full   mt-1 ${pagesUnPayed > 1 && 'h-[400px]'}`}>
          <Table
            items={itemsUnpayed}
            totale={totalFilteredPaymentsUnPayed}
            setItemToDelete={setItemToDelete}
            itemToDelete={itemToDelete}
            isLoadingDelete={isLoadingDelete}
            handlePrint={handlePrint}
            handelPay={handelPay}
            isPayedLoading={isPayedLoading}
          />
        </div>
      )}
      {loadingGet && (
        <div className="py-4 w-full flex justify-center">
          <Spinner size="lg" label="Chargement ..." />
        </div>
      )}
      {error && (
        <div className="w-full ">
          <ErrorAlert message={error} />
        </div>
      )}
      <div className="my-1 w-full flex ">
        {pagesUnPayed > 1 && (
          <Pagination
            showControls
            isCompact
            total={pagesUnPayed}
            page={pageUnPayed}
            onChange={(page) => setPageUnPayed(page)}
            showShadow
          />
        )}
      </div>

      {/* Paid Payments Section */}
      <div className="flex justify-between gap-3 items-center bg-white shadow p-3 rounded-lg mt-4 dark:bg-[#43474b] dark:text-white">
        <div className="w-full sm:max-w-[44%]">
          <Input
            fullWidth
            isClearable
            placeholder="Rechercher par N°..."
            startContent={<FiSearch />}
            variant="faded"
            onChange={(e) => setSearchItemPayed(e.target.value)}
            value={searchItemPayed}
            onClear={() => setSearchItemPayed('')}
            size="lg"
            className="tracking-widest"
          />
        </div>
      </div>

      {payments && itemsPayed && (
        <div className="rounded-lg   h-[400px] w-full   mt-1">
          <Table
            items={itemsPayed}
            totale={totalFilteredPaymentsPayed}
            setItemToDelete={setItemToDelete}
            itemToDelete={itemToDelete}
            isLoadingDelete={isLoadingDelete}
            handlePrint={handlePrint}
            handelPay={handelPay}
            isPayedLoading={isPayedLoading}
          />
        </div>
      )}
      {loadingGet && (
        <div className="py-5 w-full flex justify-center">
          <Spinner size="lg" label="Chargement ..." />
        </div>
      )}
      {error && (
        <div className="w-full ">
          <ErrorAlert message={error} />
        </div>
      )}
      <div className="my-1 w-full flex ">
        {pagesPayed > 1 && (
          <Pagination
            showControls
            isCompact
            total={pagesPayed}
            page={pagePayed}
            onChange={(page) => setPagePayed(page)}
            showShadow
          />
        )}
      </div>
    </>
  )
}

export default ProductInvoice

const Table = ({
  items,
  totale,
  setItemToDelete,
  isLOadingDelete,
  itemToDelete,
  handlePrint,
  handelPay,
  isPayedLoading
}) => {
  return (
    <div className="overflow-x-auto rounded-t-lg w-full justify-center shadow-[0px_0px_7px_-2px_rgba(0,0,0,0.75)] rounded-lg">
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white  dark:divide-gray-700 dark:bg-[#43474b]  ">
        <thead className="ltr:text-left rtl:text-right ">
          <tr className="font-normal ">
            <th className="whitespace-nowrap px-2 py-1  text-gray-900 dark:text-white font-semibold">
              N°
            </th>
            <th className="whitespace-nowrap px-2 py-1  text-gray-900 dark:text-white font-semibold">
              Prix
            </th>

            <th className="whitespace-nowrap px-2 py-1  text-gray-900 dark:text-white font-semibold">
              Method
            </th>
            {/* <th className="whitespace-nowrap px-2 py-1  text-gray-900 dark:text-white font-semibold">
                  Type
                </th> */}
            <th className="whitespace-nowrap px-2 py-1  text-gray-900 dark:text-white font-semibold">
              Details
            </th>
            <th className="whitespace-nowrap px-2 py-1  text-gray-900 dark:text-white font-semibold">
              Payé
            </th>
            <th className="whitespace-nowrap px-2 py-1  text-gray-900 dark:text-white font-semibold">
              livraison
            </th>
            <th className="whitespace-nowrap px-2 py-1  text-gray-900 dark:text-white ">
              <div className="w-full flex justify-end">
                {true && (
                  <Chip variant="flat" color="success" size="lg">
                    Total <span className="font-semibold"> {totale}</span>
                  </Chip>
                )}
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 font-sans tracking-wide">
          {items.length > 0 ? (
            items.map((f) => (
              <tr className="hover:bg-blue-200 dark:hover:bg-gray-900" key={f.id}>
                <td className="whitespace-nowrap px-2 py-1 font-medium text-gray-900 dark:text-white w-auto text-start  ">
                  #{f.id}
                </td>
                <td className="whitespace-nowrap px-2 py-1 font-medium text-gray-900 dark:text-white w-auto text-start ">
                  <div className="">{formatMoney(f.totalePrice)}</div>
                </td>
                <td className="whitespace-nowrap px-2 py-1 font-medium text-gray-900 dark:text-white w-auto text-center">
                  <Chip
                    startContent={f.order ? <MdOutlineShop2 size={18} /> : <GiShop size={18} />}
                    variant="faded"
                    color={f.order ? 'success' : 'danger'}
                  >
                    <span className="font-semibold">{f.order ? 'onligne' : 'offline'}</span>
                  </Chip>
                </td>
                {/* <td className="whitespace-nowrap px-2 py-1 font-medium text-gray-900 dark:text-white w-auto text-center">
                      <Chip
                        variant="shadow"
                        classNames={{
                          base:
                            f.type === 'offre'
                              ? 'bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30'
                              : 'bg-gradient-to-br from-orange-700 to-yellow-500 border-small border-white/50 shadow-warning-500/30',
                          content: 'drop-shadow shadow-black text-white'
                        }}
                      >
                        {f.type}
                      </Chip>
                    </td> */}
                <td className="whitespace-nowrap px-2 py-1 text-gray-700 dark:text-gray-200 w-auto ">
                  <Popover placement="top">
                    <PopoverTrigger>
                      <Button color="default" isIconOnly size="sm" variant="faded">
                        <PiInvoice size={20} />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                    <Receipt payment={{...f , details : JSON.parse(f.details),user:f.delevry ? f.delevry.userName : null ,isDelevry:f.delevryPrice >=0 ? f.delevryPrice : null }} />
                    </PopoverContent>
                  </Popover>
                </td>
                <td className="whitespace-nowrap px-2 py-1 font-medium text-gray-900 dark:text-white w-auto text-start ">
                  <Chip
                    color={f.isPayed ? 'success' : 'danger'}
                    className="cursor-pointer"
                    onClick={() => handelPay(f)}
                    isDisabled={isPayedLoading == f.id}
                  >
                    {(isPayedLoading===f.id) ? <Spinner  color='default' size='sm'/> : (f.isPayed ? 'Oui' : 'Non')}
                  </Chip>
                </td>
                <td className="whitespace-nowrap px-2 py-1 font-medium text-gray-900 dark:text-white w-auto text-center ">
                  <Chip
                    radius="sm"
                    variant="bordered"
                    className="text-center"
                    color={f.delevryId ? 'primary' : 'default'}
                  >
                    {f.delevryId !== null ? f.delevryPrice + ' ' + 'MAD' : 'Non'}
                  </Chip>
                </td>
                <td className="whitespace-nowrap px-2 py-1 text-gray-700 dark:text-gray-200 w-full ">
                  <div className="flex justify-center w-full items-center gap-2">
                    <Button
                      size="sm"
                      isIconOnly
                      radius="md"
                      className="text-xl"
                      color="secondary"
                      variant="ghost"
                      onClick={() => handlePrint(f)}
                    >
                      <IoPrintOutline />
                    </Button>
                   
                    <Button
                      size="sm"
                      isIconOnly
                      radius="md"
                      className="text-xl"
                      color="warning"
                      variant="ghost"
                      // as={Link}
                      // to={`/Payments/update/${f.id}`}
                    >
                      <BiSolidEdit />
                    </Button>
                    <Button
                      size="sm"
                      isIconOnly
                      radius="md"
                      className="text-xl group"
                      color="danger"
                      variant="ghost"
                      onClick={() => setItemToDelete(f.id)}
                      isLoading={f.id === itemToDelete ? isLOadingDelete : false}
                      spinner={isLOadingDelete && <Spinner color="danger" size="sm" />}
                    >
                      <BiTrash className="text-danger group-hover:text-white" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>
                <div className="flex itesm-center justify-center font-semibold text-lg py-5 text-red-500">
                  aucun Facture trouvé
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
