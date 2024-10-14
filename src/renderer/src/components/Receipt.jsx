import pokeemon from '../assets/images/pokeemon-01.png'

const Receipt = ({ payment }) => {
  return (
    <div className="container mx-auto p-4 bg-white text-gray-800 text-xs font-mono border border-gray-300 rounded-md">
      {/* Logo Section */}
      <div className="image-container mx-auto w-[80px] mb-2">
        <img src={pokeemon} alt="Logo" className="w-full object-cover" />
      </div>

      {/* Address and Phone */}
      <p className="text-center">123 Adresse de la rue Tan-Tan, Maroc</p>
      <p className="flex items-center justify-center gap-2 mb-2">
        <img
          className="w-4"
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIgMGMtNi42MjcgMC0xMiA1LjM3My0xMiAxMnM1LjM3MyAxMiAxMiAxMiAxMi01LjM3MyAxMi0xMi01LjM3My0xMi0xMi0xMnptMy40NDUgMTcuODI3Yy0zLjY4NCAxLjY4NC05LjQwMS05LjQzLTUuOC0xMS4zMDhsMS4wNTMtLjUxOSAxLjc0NiAzLjQwOS0xLjA0Mi41MTNjLTEuMDk1LjU4NyAxLjE4NSA1LjA0IDIuMzA1IDQuNDk3bDEuMDMyLS41MDUgMS43NiAzLjM5Ny0xLjA1NC41MTZ6Ii8+PC9zdmc+"
          alt="Phone Icon"
        />
        <span>06 66 66 66 66</span>
      </p>

      {/* Date, Client, Livreur Info */}
      <div className="border-t border-gray-300 my-2"></div>
      <p>
        Date :{' '}
        {payment.createdAt
          ? new Date(payment.createdAt).toLocaleDateString()
          : new Date().toLocaleDateString()}{' '}
        à{' '}
        {payment.createdAt
          ? new Date(payment.createdAt).toLocaleTimeString()
          : new Date().toLocaleTimeString()}
      </p>

      <div className="flex flex-col my-1">
        {(!payment.delevryId) && <span className="text-center">Commande sans livraison</span>}
        {(payment.isDelevry || payment.delevryId)&& payment.clientPhoneNumber && (
          <span>Client : {payment.clientPhoneNumber}</span>
        )}
        {(payment.isDelevry || payment.delevryId)&& payment.delevryId && <span>Livreur : {payment.user}</span>}
      </div>

      {/* Invoice Number */}
      <p className="font-bold">Facture #{payment.id ?payment.id :"..." }</p>

      {/* Table Headers and Items */}
      <div className="border-t border-gray-300 my-2"></div>
      <table className="table-auto w-full text-xs">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-2 py-1 font-bold">Article</th>
            <th className="border border-gray-300 px-2 py-1 font-bold">Qté</th>
            <th className="border border-gray-300 px-2 py-1 font-bold">Prix</th>
          </tr>
        </thead>
        <tbody>
          {payment.details.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-2 py-1 truncate capitalize">
                {item.category ? `${item.category} ${item.name} ${item.type ? `(${item.type})` : '' }` : item.name}
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">{item.q}</td>
              <td className="border border-gray-300 px-2 py-1 text-right">
                {item.totalePrice} MAD
              </td>
            </tr>
          ))}
          {payment.isDelevry && (
            <tr>
              <td className="border border-gray-300 px-2 py-1 truncate capitalize">Livraison</td>
              <td className="border border-gray-300 px-2 py-1 text-center">...</td>
              <td className="border border-gray-300 px-2 py-1 text-right">
                {payment.delevryPrice ? payment.delevryPrice : 0} MAD
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr className="font-semibold">
            <td className="border-t px-1 py-1 text-left">Total</td>
            <td colSpan="2" className="border-t px-1 py-1 text-right">
              {payment.totalePrice} MAD
            </td>
          </tr>
        </tfoot>
      </table>

      {/* Thank You Message */}
      <div className="border-t border-gray-300 my-2"></div>
      <p className="text-center">Merci pour votre achat !</p>
    </div>
  )
}

export default Receipt
