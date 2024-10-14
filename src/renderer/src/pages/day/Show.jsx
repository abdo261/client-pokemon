import { useEffect } from 'react'
import {
  Accordion,
  AccordionItem,
  Avatar,
  Button,
  Chip,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  getDayById,
  getDayCountQuantityStatusById,
  getDayCountStatusById
} from '../../redux/api/dayApi'
import {
  calculateSumsInObjects,
  calculateTotal,
  formatDateToLocaleString,
  formatMoney,
  getRoleColor,
  getRoleLabel,
  transformDataShart,
  transformDataShartSonQuantity
} from '../../utils/utils'
import CurrenChipTime from '../../components/currenChipTime'
import { TiArrowSortedDown, TiFlowSwitch } from 'react-icons/ti'
import { MdFastfood, MdOutlineShop2} from 'react-icons/md'
import { GiShop } from 'react-icons/gi'
import { PiInvoice } from 'react-icons/pi'
import { BiSolidOffer } from 'react-icons/bi'
import CalculateDelevryPrice from '../../components/CalculateDelevryPrice'
import PieChart from '../../components/PieChart'
import Receipt from '../../components/Receipt'

const Show = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { dayCount, dayCountQ, dayDetails } = useSelector((state) => state.day)
  useEffect(() => {
    dispatch(getDayCountStatusById(id))
    dispatch(getDayById(id))
    dispatch(getDayCountQuantityStatusById(id))
  }, [])
  const transformedProductDataQ = dayCountQ ? transformDataShart(dayCountQ.products) : {}
  const transformedOfferDataQ = dayCountQ ? transformDataShart(dayCountQ.offers) : {}
  const transformedProductData = dayCountQ ? transformDataShartSonQuantity(dayCountQ.products) : {}
  const transformedOfferData = dayCountQ ? transformDataShartSonQuantity(dayCountQ.offers) : {}
  console.log(dayDetails)
  return (
    <>
      {dayDetails && (
        <div className="grid  grid-cols-1 gap-2">
          <div className="flex items-center flex-col">
            {dayDetails.day?.stopeAt ? (
              <Chip
                radius="sm"
                variant="shadow"
                color="primary"
                classNames={{
                  base: 'bg-gradient-to-br from-green-500 to-yellow-500 border-small border-white/50 shadow-warning-500/30',
                  content: 'drop-shadow shadow-black text-black'
                }}
              >
                {formatDateToLocaleString(dayDetails.day.startAt)}
              </Chip>
            ) : (
              <Chip
                radius="sm"
                variant="shadow"
                color="primary"
                classNames={{
                  base: 'bg-gradient-to-br from-orange-700 to-yellow-500 border-small border-white/50 shadow-warning-500/30',
                  content: 'drop-shadow shadow-black text-white'
                }}
              >
                <span className="font-[500]">
                  {formatDateToLocaleString(dayDetails.day.startAt)}
                </span>
              </Chip>
            )}

            <TiArrowSortedDown />
            {dayDetails.day.stopeAt ? (
              <Chip
                radius="sm"
                color="primary"
                variant="shadow"
                classNames={{
                  base: 'bg-gradient-to-br from-green-500 to-yellow-500 border-small border-white/50 shadow-warning-500/30',
                  content: 'drop-shadow shadow-black text-black'
                }}
              >
                {formatDateToLocaleString(dayDetails.day.stopeAt)}{' '}
              </Chip>
            ) : (
              <CurrenChipTime />
            )}
          </div>
          {dayDetails.deliveries.length > 0 ? (
            <div className="w-full flex flex-col items-center gap-2">
              <h1 className="text-2xl font-semibold">
                Commande Avec Livraison{' '}
                {dayDetails.paymentProducts.filter((pa) => pa.delevryId !== null).length +
                  dayDetails.paymentOffers.filter((pa) => pa.delevryId !== null).length}{' '}
              </h1>
              <Accordion
                variant="shadow"
                selectionMode="multiple"
                className=" border-2 border-slate-400"
              >
                {dayDetails.deliveries.map((e) => (
                  <AccordionItem
                    startContent={
                      <Avatar
                        isBordered
                        color="default"
                        radius="lg"
                        classNames={{ name: 'font-semibold' }}
                      />
                    }
                    key={e.id + ''}
                    aria-label={e.userName}
                    title={e.userName}
                    subtitle={
                      <Chip size="sm" variant="flat" color={getRoleColor(e.role)}>
                        {getRoleLabel(e.role)}
                      </Chip>
                      // <span className="flex gap-2 items-center text-lg">
                      //   <IoBagCheckOutline />{' '}
                      //   <span>{e.paymentOffers.length + e.paymentProducts.length} </span>
                      // </span>
                    }
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div>
                        <h1 className="text-xl font-semibold  flex items-center gap-2">
                          {' '}
                          <MdFastfood />
                          Produits <span>{e.paymentProducts.length}</span>
                        </h1>
                        {e.paymentProducts.length > 0 ? (
                          <Table items={e.paymentProducts} totale={e.paymentProducts.length} user={e.userName} />
                        ) : (
                          <div className="w-full md:h-full flex justify-center items-center  font-semibold text-lg h-20 pb-3">
                            <h1>aucun Commande !</h1>
                          </div>
                        )}
                      </div>
                      <div>
                        <h1 className="text-xl font-semibold  flex items-center gap-2">
                          <BiSolidOffer /> Packes<span>{e.paymentOffers.length}</span>
                        </h1>

                        {e.paymentOffers.length > 0 ? (
                          <Table items={e.paymentOffers} totale={e.paymentOffers.length} />
                        ) : (
                          <div className="w-full md:h-full flex justify-center items-center  font-semibold text-lg h-20 pb-3">
                            <h1>aucun Commande !</h1>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-2">
                      <CalculateDelevryPrice delevry={e} />
                    </div>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ) : (
            <div className="flex items-cenetr justify-center w-full p-4 rounded-xl bg-white dark:bg-[#43474b]  ">
              <h1 className="text-xl font-semibold ">Aucun livreur ne travaille aujourd'hui.</h1>{' '}
            </div>
          )}
          <div className="w-full flex flex-col items-center gap-2">
            <h1 className="text-2xl font-semibold">
              Commande Sans Livraison :{' '}
              {dayDetails.paymentProducts.filter((pa) => pa.delevryId == null).length +
                dayDetails.paymentOffers.filter((pa) => pa.delevryId == null).length}{' '}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full bg-white dark:bg-inherit border-2 border-slate-400  p-2 rounded-xl">
              <div>
                <h1 className="text-xl font-semibold  flex items-center gap-2">
                  {' '}
                  <MdFastfood />
                  Produits{' '}
                  <span>
                    {dayDetails.paymentProducts.filter((pa) => pa.delevryId == null).length}
                  </span>
                </h1>
                {dayDetails.paymentProducts.filter((pa) => pa.delevryId == null).length > 0 ? (
                  <Table
                    items={dayDetails.paymentProducts.filter((pa) => pa.delevryId == null)}
                    totale={dayDetails.paymentProducts.filter((pa) => pa.delevryId == null).length}
                  />
                ) : (
                  <div className="w-full md:h-full flex justify-center items-center font-semibold text-lg h-20 pb-3">
                    <h1>aucun Commande !</h1>
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-xl font-semibold  flex items-center gap-2">
                  <BiSolidOffer /> Packes
                  <span>
                    {dayDetails.paymentOffers.filter((pa) => pa.delevryId == null).length}
                  </span>
                </h1>

                {dayDetails.paymentOffers.filter((pa) => pa.delevryId == null).length > 0 ? (
                  <Table
                    items={dayDetails.paymentOffers.filter((pa) => pa.delevryId == null)}
                    totale={dayDetails.paymentOffers.filter((pa) => pa.delevryId == null).length}
                  />
                ) : (
                  <div className="w-full md:h-full flex justify-center items-center  font-semibold text-lg h-20 pb-3">
                    <h1>aucun Commande !</h1>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col items-center gap-2">
            <h1 className="text-2xl font-semibold">
              Totale Commande :{' '}
              {dayDetails.paymentProducts.length +
                dayDetails.paymentOffers.length}{' '}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full bg-white dark:bg-inherit border-2 border-slate-400  p-2 rounded-xl">
              <div>
                <h1 className="text-xl font-semibold  flex items-center gap-2">
                  {' '}
                  <MdFastfood />
                  Produits{' '}
                  <span>
                    {dayDetails.paymentProducts.length}
                  </span>
                </h1>
                {dayDetails.paymentProducts.length > 0 ? (
                  <Table
                    items={dayDetails.paymentProducts}
                    totale={dayDetails.paymentProducts.length}  
                    
                  />
                ) : (
                  <div className="w-full md:h-full flex justify-center items-center font-semibold text-lg h-20 pb-3">
                    <h1>aucun Commande !</h1>
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-xl font-semibold  flex items-center gap-2">
                  <BiSolidOffer /> Packes
                  <span>
                    {dayDetails.paymentOffers.length}
                  </span>
                </h1>

                {dayDetails.paymentOffers.length > 0 ? (
                  <Table
                    items={dayDetails.paymentOffers}
                    totale={dayDetails.paymentOffers.length}
                  />
                ) : (
                  <div className="w-full md:h-full flex justify-center items-center  font-semibold text-lg h-20 pb-3">
                    <h1>aucun Commande !</h1>
                  </div>
                )}
              </div>
            </div>
          </div>
          {dayCountQ && (
            <>
              <div className="flex flex-col gap-2 items-center w-full">
                <h1 className="text-2xl font-semibold">Statistiques Des Quantités</h1>
                <div className="grid grid-cols-1 custemMd:grid-cols-3 gap-2 w-full">
                  <div className="p-2 flex flex-col items-center justify-center bg-white   rounded-2xl  border-2 border-slate-400   dark:bg-[#242526]">
                    <h1 className="text-2xl font-semibold flex items-center gap-2 ">
                      {' '}
                      <MdFastfood size={25} /> <span>Produits : </span>{' '}
                      <span>{calculateTotal(transformedProductDataQ)}</span>{' '}
                    </h1>
                    <PieChart data={transformedProductDataQ} />
                  </div>{' '}
                  <div className="p-2 flex flex-col items-center justify-center bg-white rounded-2xl  border-2 border-slate-400   dark:bg-[#242526]">
                    <h1 className="text-2xl font-semibold flex items-center gap-2 ">
                      <BiSolidOffer size={25} /> <span> Packes :</span>{' '}
                      <span>{calculateTotal(transformedOfferDataQ)}</span>
                    </h1>
                    <PieChart data={transformedOfferDataQ} />{' '}
                  </div>
                  <div className="p-2 flex flex-col items-center justify-center bg-white rounded-2xl  border-2 border-slate-400   dark:bg-[#242526]">
                    <h1 className="text-2xl font-semibold flex items-center gap-2 ">
                      {' '}
                      <TiFlowSwitch /> <span>Totale :</span>
                      <span>
                        {calculateTotal(
                          calculateSumsInObjects({
                            Produits: transformedProductDataQ,
                            Packe: transformedOfferDataQ
                          })
                        )}
                      </span>
                    </h1>{' '}
                    <PieChart
                      data={calculateSumsInObjects({
                        Produits: transformedProductDataQ,
                        Packe: transformedOfferDataQ
                      })}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 items-center w-full">
                <h1 className="text-2xl font-semibold">Statistique des Commandes</h1>
                <div className="grid grid-cols-1 custemMd:grid-cols-3 gap-2 w-full">
                  <div className="p-2 flex flex-col items-center justify-center bg-white   rounded-2xl  border-2 border-slate-400   dark:bg-[#242526]">
                    <h1 className="text-2xl font-semibold flex items-center gap-2 ">
                      {' '}
                      <MdFastfood size={25} /> <span>Produits : </span>{' '}
                      <span>{calculateTotal(transformedProductData)}</span>{' '}
                    </h1>
                    <PieChart data={transformedProductData} />
                  </div>{' '}
                  <div className="p-2 flex flex-col items-center justify-center bg-white rounded-2xl  border-2 border-slate-400   dark:bg-[#242526]">
                    <h1 className="text-2xl font-semibold flex items-center gap-2 ">
                      <BiSolidOffer size={25} /> <span> Packes :</span>{' '}
                      <span>{calculateTotal(transformedOfferData)}</span>
                    </h1>
                    <PieChart data={transformedOfferData} />{' '}
                  </div>
                  <div className="p-2 flex flex-col items-center justify-center bg-white rounded-2xl  border-2 border-slate-400   dark:bg-[#242526]">
                    <h1 className="text-2xl font-semibold flex items-center gap-2 ">
                      {' '}
                      <TiFlowSwitch /> <span>Totale :</span>
                      <span>
                        {dayCountQ.totalPaymentCountOffers + dayCountQ.totalPaymentCountProducts}
                      </span>
                    </h1>{' '}
                    <PieChart
                      data={{
                        Produits: dayCountQ.totalPaymentCountProducts,
                        Packe: dayCountQ.totalPaymentCountOffers
                      }}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}
const Table = ({ items, totale }) => {
  return (
    <div className="rounded-lg  h-fit w-full   mt-4 ">
      <div className="overflow-x-auto rounded-t-lg w-full justify-center shadow-[0px_0px_7px_-2px_rgba(0,0,0,0.75)] rounded-lg">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white  dark:divide-gray-700 dark:bg-[#43474b]  ">
          <thead className="ltr:text-left rtl:text-right ">
            <tr className="font-normal ">
              <th className="whitespace-nowrap px-2 py-1  text-gray-900 dark:text-white text-start font-semibold">
                N°
              </th>
              <th className="whitespace-nowrap px-2 py-1  text-gray-900 dark:text-white text-center  font-semibold">
                Prix
              </th>
              <th className="whitespace-nowrap px-2 py-1  text-gray-900 dark:text-white text-center font-semibold">
                Livraisen
              </th>
              <th className="whitespace-nowrap px-2 py-1  text-gray-900 dark:text-white text-center font-semibold">
                Method
              </th>

              <th className="whitespace-nowrap px-2 py-1  text-gray-900 dark:text-white text-center font-semibold">
                Details
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
            {items.map((f) => (
              <tr className="hover:bg-blue-200 dark:hover:bg-gray-900" key={f.id}>
                <td className="whitespace-nowrap px-2 py-1 font-medium text-gray-900 dark:text-white w-auto text-start ">
                  #{f.id}
                </td>
                <td className="whitespace-nowrap px-2 py-1 font-medium text-gray-900 dark:text-white w-auto text-center ">
                  <div className="">{formatMoney(f.totalePrice)}</div>
                </td>
                <td className="whitespace-nowrap px-2 py-1 font-medium text-gray-900 dark:text-white w-auto text-center ">
                  <Chip
                    radius="sm"
                    variant="bordered"
                    className="text-center"
                    color={f.delevryId ? 'primary' : 'default'}
                  >
                    {f.delevryId ? f.delevryPrice + ' ' + 'MAD' : 'Non'}
                  </Chip>
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
                <td className="whitespace-nowrap px-2 py-1 text-gray-700 dark:text-gray-200 w-auto text-center">
                  <Popover placement="top">
                    <PopoverTrigger>
                      <Button color="default" isIconOnly size="sm" variant="faded">
                        <PiInvoice size={20}  />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <Receipt payment={{...f , details : JSON.parse(f.details),user:f.delevry ? f.delevry.userName : null , isDelevry:f.delevryPrice >=0 ? f.delevryPrice : null} } />
                      
                    </PopoverContent>
                  </Popover>
                </td>{' '}
                <td>{formatDateToLocaleString(f.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default Show
