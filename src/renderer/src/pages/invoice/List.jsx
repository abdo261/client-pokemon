import {
  Tab,
  Tabs
} from '@nextui-org/react'
import { MdFastfood } from 'react-icons/md'
import { BiSolidOffer } from 'react-icons/bi'
import { IoDocumentTextOutline } from 'react-icons/io5'
import ProductInvoice from '../../components/ProductInvoice'
import OfferInvoice from '../../components/OfferInvoice'

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
