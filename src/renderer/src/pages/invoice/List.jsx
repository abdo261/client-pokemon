import {
  Button,
  Card,
  CardBody,
  Chip,
  Input,
  Pagination,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  Tab,
  Tabs
} from '@nextui-org/react'
import { useEffect, useMemo, useState } from 'react'
import pokeemon from '../../assets/images/pokeemon-01.png'

import { MdFastfood, MdPhoneInTalk } from 'react-icons/md'
import { BiSolidEdit, BiSolidOffer, BiTrash } from 'react-icons/bi'
import { FiEye, FiSearch } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { deleteCategory } from '../../redux/api/categoryApi'
import { useDispatch, useSelector } from 'react-redux'
import swal from 'sweetalert'
import ErrorAlert from '../../components/ErrorAlert'
import defaultImage from '../../assets/images/dfault-image.png'
import { IoPrintOutline } from 'react-icons/io5'
import { MdOutlineShop2 } from 'react-icons/md'
import { GiShop } from 'react-icons/gi'

import { IoDocumentTextOutline } from 'react-icons/io5'
import { formatMoney } from '../../utils/utils'
import { FaCheck } from 'react-icons/fa6'
import { PiInvoice } from 'react-icons/pi'
import { deletePayment, getPayments } from '../../redux/api/paymentApi'
import ProductInvoice from '../../components/ProductInvoice'
import OfferInvoice from '../../components/OfferInvoice'
// const Payments = [
//   {
//     id: 1,
//     totalPrice: 100.0,
//     details: [{ name: 'Produit A', quantity: 2, price: 50.0 }],
//     isPayed: true,
//     isLocal: true,
//     type: 'normal',
//     createdAt: new Date()
//   },
//   {
//     id: 2,
//     totalPrice: 200.0,
//     details: [{ name: 'Produit B', quantity: 1, price: 200.0 }],
//     isPayed: true,
//     isLocal: false,
//     type: 'offre',
//     createdAt: new Date()
//   }è
//   // Add more static payment objects as needed
// ]
const List = () => {
  return (
    <section className="w-full flex flex-col items-center gap-3">
      <div className="w-full flex items-center justify-between pb-2">
        <h1 className="text-4xl font-bold underline flex gap-2">
          <IoDocumentTextOutline /> Factures :
        </h1>
      </div>
      <Tabs aria-label="Options" size="lg">
        <Tab
          key="produits"
          title={
            <div className="flex items-center space-x-2">
              <MdFastfood size={20} />
              <span>Produits</span>
            </div>
          }
          className="w-full"
        >
          <ProductInvoice />
        </Tab>
        <Tab
          key="packes"
          title={
            <div className="flex items-center space-x-2">
              <BiSolidOffer size={20} />
              <span>Packes</span>
            </div>
          }
          className="w-full"
        >
          <OfferInvoice />
        </Tab>
      </Tabs>
    </section>
  )
}

export default List
