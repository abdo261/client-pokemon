import { Chip, Input } from '@nextui-org/react'
import React, { useState } from 'react'
import { IoBagCheckOutline } from 'react-icons/io5'
import { FcMoneyTransfer } from 'react-icons/fc'

const CalculateDelevryPrice = ({ delevry }) => {
  const [pricePerOrder, setPricePerOrder] = useState(6)
  return (
    <div className="bg-white dark:bg-[#43474b] rounded-xl p-3 w-full ">
      <div className="flex flex-col gap-2">
        <div className="font-semibold text-xl flex items-center gap-2">
          <span className="text-gray-500 dark:text-gray-200">totalCommande :</span>
          <Chip
            color="success"
            variant="flat"
            size="lg"
            radius="sm"
            endContent={<IoBagCheckOutline size={20} />}
          >
            {delevry.paymentProducts.length + delevry.paymentOffers.length}
          </Chip>
        </div>
        <div className="flex items-center gap-2 ">
          <Input
            placeholder="Entrez le prix par commande"
            onChange={(e) => setPricePerOrder(e.target.value)}
            value={pricePerOrder}
          />
          <Chip variant="faded" radius="sm" size="lg" endContent={<span>MAD</span>}>
            {pricePerOrder * (delevry.paymentProducts.length + delevry.paymentOffers.length)}
          </Chip>
        </div>
      </div>
    </div>
  )
}

export default CalculateDelevryPrice
