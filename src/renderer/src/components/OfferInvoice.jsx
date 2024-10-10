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
import { FiEye, FiSearch } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import swal from 'sweetalert'
import ErrorAlert from '../components/ErrorAlert'
import { deletePaymentOffer,getPaymentsOffer, updatePaymentOffer } from '../redux/api/paymentOfferApi'
import { convertImageToBase64, formatMoney } from '../utils/utils'
import { GiShop } from 'react-icons/gi'
import { MdOutlineShop2, MdPhoneInTalk } from 'react-icons/md'
import { PiInvoice } from 'react-icons/pi'
import pokeemon from '../assets/images/pokeemon-01.png'
import { IoPrintOutline } from 'react-icons/io5'
import { BiSolidEdit, BiTrash } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const OfferInvoice = () => {
  const dispatch = useDispatch()
  const [isLoadingDelete, setIsLoadingDelete] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(null)
  const [isPayedLoading ,setIsPayedLoading] = useState(null)

  const { paymentsOffer, loadingGet, error } = useSelector((state) => state.paymentOffer)
  const [searchItemPayed, setSearchItemPayed] = useState('')
  const [searchItemUnPayed, setSearchItemUnPayed] = useState('')
  const [pagePayed, setPagePayed] = useState(1)
  const [pageUnPayed, setPageUnPayed] = useState(1)
  const rowsPerPage = 8

  // Filter logic for paid offers
  const filteredOffersPayed = useMemo(() => {
    if (!searchItemPayed || isNaN(parseInt(searchItemPayed))) {
      return paymentsOffer?.filter((c) => c.isPayed === true)
    }
    return paymentsOffer?.filter((c) => c.id === parseInt(searchItemPayed) && c.isPayed === true)
  }, [searchItemPayed, paymentsOffer])

  // Filter logic for unpaid offers
  const filteredOffersUnPayed = useMemo(() => {
    if (!searchItemUnPayed || isNaN(parseInt(searchItemUnPayed))) {
      return paymentsOffer?.filter((c) => c.isPayed === false)
    }
    return paymentsOffer?.filter((c) => c.id === parseInt(searchItemUnPayed) && c.isPayed === false)
  }, [searchItemUnPayed, paymentsOffer])

  // Pagination logic for paid offers
  const { totalFilteredOffersPayed, pagesPayed } = useMemo(() => {
    const totalFilteredOffersPayed = filteredOffersPayed?.length || 0
    const pagesPayed = Math.ceil(totalFilteredOffersPayed / rowsPerPage)
    return { totalFilteredOffersPayed, pagesPayed }
  }, [filteredOffersPayed, rowsPerPage])

  // Pagination logic for unpaid offers
  const { totalFilteredOffersUnPayed, pagesUnPayed } = useMemo(() => {
    const totalFilteredOffersUnPayed = filteredOffersUnPayed?.length || 0
    const pagesUnPayed = Math.ceil(totalFilteredOffersUnPayed / rowsPerPage)
    return { totalFilteredOffersUnPayed, pagesUnPayed }
  }, [filteredOffersUnPayed, rowsPerPage])

  // Slice data for paid offers
  const itemsPayed = useMemo(() => {
    const start = (pagePayed - 1) * rowsPerPage
    const end = start + rowsPerPage
    return filteredOffersPayed?.slice(start, end)
  }, [pagePayed, filteredOffersPayed])

  // Slice data for unpaid offers
  const itemsUnpayed = useMemo(() => {
    const start = (pageUnPayed - 1) * rowsPerPage
    const end = start + rowsPerPage
    return filteredOffersUnPayed?.slice(start, end)
  }, [pageUnPayed, filteredOffersUnPayed])

  useEffect(() => {
    if (itemToDelete) {
      swal({
        title: "Êtes-vous sûr de vouloir supprimer l'offre ?",
        icon: 'warning',
        buttons: true,
        dangerMode: true
      }).then((isOk) => {
        if (isOk) {
          setIsLoadingDelete(true)
          dispatch(deletePaymentOffer(itemToDelete, () => setIsLoadingDelete(false)))
        } else {
          setItemToDelete(null)
          setIsLoadingDelete(false)
        }
      })
    }
  }, [itemToDelete, dispatch])
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
                ${JSON.parse(element.details)?.map(
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
  useEffect(() => {
    dispatch(getPaymentsOffer())
  }, [dispatch])
  const handelPay = (element)=>{
   
    setIsPayedLoading(element.id)
    dispatch(updatePaymentOffer(element.id,{isPayed:!element.isPayed},null , ()=>setIsPayedLoading(null)))
  }

  return (
    <>
      {/* Unpaid Offers Section */}
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

      {paymentsOffer && itemsUnpayed && (
        <div className={`rounded-lg w-full mt-1 ${pagesUnPayed > 1 ?  'h-[400px]' : 'h-fit'}`}>
          <Table
            items={itemsUnpayed}
            total={totalFilteredOffersUnPayed}
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

      {/* Paid Offers Section */}
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

      {paymentsOffer && itemsPayed && (
        <div className="rounded-lg h-[400px] w-full mt-1">
          <Table
            items={itemsPayed}
            total={totalFilteredOffersPayed}
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
export default OfferInvoice

const Table = ({ items, totale, setItemToDelete, isLOadingDelete, itemToDelete ,handlePrint,handelPay, isPayedLoading}) => {
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
              </th>{' '}
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
                Date : {new Date(f.createdAt).toLocaleDateString()} à {new Date(f.createdAt).toLocaleTimeString()}
              </p>
              <p className="text-xs">
                Client : {f.delevryId&& (f.clientPhoneNumber ? f.clientPhoneNumber : '...')}
              </p>
              <p className="text-xs mb-2">Facture #{f.id}</p>

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
                  {JSON.parse(f.details)?.map((item) => (
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
                  {f.delevryId && (
                    <tr>
                      <td className="border border-gray-300 px-2 py-1 truncate w-full">
                        livraison
                      </td>
                      <td className="border border-gray-300 px-2 py-1 text-center">...</td>
                      <td className="border border-gray-300 px-2 py-1  text-right">
                        <span className="whitespace-nowrap">
                          {!f.delevryPrice ? 0 : f.delevryPrice} MAD
                        </span>
                      </td>
                    </tr>
                  )}
                </tbody>

                {/* Totals as Footer */}
                <tfoot>
                  <tr className="font-semibold">
                    <td className="border-t border-gray-300 px-1 py-1 text-left">Total</td>
                    <td colSpan="2" className="border-t border-gray-300 px-1 py-1 text-right">
                      {formatMoney(
                        f.totalePrice
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
                    <Chip radius='sm' variant="bordered" className="text-center" color={f.delevryId ? 'primary' : 'default'} >
                      {f.delevryId ?( f.delevryPrice+" " + 'MAD'): 'Non'}
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
                        onClick={()=>handlePrint(f)}
                      >
                        <IoPrintOutline />
                      </Button>
                      <Button
                        size="sm"
                        isIconOnly
                        radius="md"
                        className="text-xl"
                        color="primary"
                        variant="ghost"
                        // as={Link}
                        // to={`/PaymentsOffer/show/${f.id}`}
                      >
                        <FiEye />
                      </Button>
                      <Button
                        size="sm"
                        isIconOnly
                        radius="md"
                        className="text-xl"
                        color="warning"
                        variant="ghost"
                        // as={Link}
                        // to={`/PaymentsOffer/update/${f.id}`}
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
