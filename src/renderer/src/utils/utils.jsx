import pokeemon from '../../src/assets/images/pokeemon-01.png'
import { FaMotorcycle } from 'react-icons/fa6'
import React from 'react'
import { GrUserAdmin } from 'react-icons/gr'
import { MdAdminPanelSettings, MdCompress } from 'react-icons/md'
import { GiBarbecue } from 'react-icons/gi'
import { PiOvenFill } from 'react-icons/pi'
import { toast } from 'react-toastify'

export const checkIfSelected = (id, selectedProducts = []) => {
  return selectedProducts.includes(id)
}
export const formatErrorField = (errors, field) => {
  return errors[field] || null
}
export const formatMoney = (amounth) => {
  return new Intl.NumberFormat('fr-MA', {
    style: 'currency',
    currency: 'MAD'
  }).format(amounth)
}
export function calculateHourDifference(date1, date2) {
  const diffInMilliseconds = new Date(date2) - new Date(date1)
  const hours = Math.floor(diffInMilliseconds / (1000 * 60 * 60))
  const minutes = Math.round((diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60))

  const formattedHours = String(hours).padStart(2, '0')
  const formattedMinutes = String(minutes).padStart(2, '0')

  return `${formattedHours}:${formattedMinutes}`
}

export const getVariantOfRest = (price) => {
  const nemirique = parseInt(price)
  if (nemirique === 0) return 'success'
  else {
    if (nemirique > 0) return 'secondary'
    else if (nemirique < 0) return 'danger'
  }
}
export const getRoleIcon = (role) => {
  if (role === 'ADMIN') return React.createElement(MdAdminPanelSettings)
  if (role === 'LIVREUR') return React.createElement(FaMotorcycle)
  if (role === 'RESPONSABLE') return React.createElement(GrUserAdmin)
  return null
}
export const getRoleColor = (role) => {
  if (role === 'ADMIN') return 'success'
  if (role === 'LIVREUR') return 'secondary'
  if (role === 'RESPONSABLE') return 'warning'
  return null
}
export const getRoleLabel = (role) => {
  if (role === 'ADMIN') return 'Admin'
  if (role === 'LIVREUR') return 'Livreur'
  if (role === 'RESPONSABLE') return 'Responsable'
  return null
}

export function formatTimestamp(isoString) {
  const dt = new Date(isoString)
  const now = new Date()
  const difference = now - dt

  const days = Math.floor(difference / (1000 * 60 * 60 * 24))
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)

  const hours = Math.floor(difference / (1000 * 60 * 60)) % 24
  const minutes = Math.floor(difference / (1000 * 60)) % 60

  const day = dt.getUTCDate().toString().padStart(2, '0')
  const month = (dt.getUTCMonth() + 1).toString().padStart(2, '0')
  const year = dt.getUTCFullYear().toString().slice(-2)
  const formattedDate = `${day}/${month}/${year}`

  let elapsedTime
  if (years > 0) {
    elapsedTime = `il y a ${years} année${years > 1 ? 's' : ''}`
  } else if (months > 0) {
    elapsedTime = `il y a ${months} mois`
  } else if (days > 0) {
    elapsedTime = `il y a ${days} jour${days > 1 ? 's' : ''}`
  } else if (hours > 0) {
    elapsedTime = `il y a ${hours} heure${hours > 1 ? 's' : ''}`
  } else {
    elapsedTime = `il y a ${minutes} minute${minutes > 1 ? 's' : ''}`
  }

  return (
    <>
      {formattedDate} <span className="underline underline-offset-4">{elapsedTime}</span>
    </>
  )
}
export function formatDateToDDMMYY(dateStr = new Date()) {
  const date = new Date(dateStr)

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return 'Invalid Date' // Handle invalid date formats
  }

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = String(date.getFullYear()).slice(-2)

  return `${day}/${month}/${year}`
}

export const formatDateToLocaleString = (dateString) => {
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = String(date.getFullYear()).slice(-2)
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${day}/${month}/${year} à ${hours}:${minutes}`
}

export function calculateSumsInObjects(objects) {
  const result = {}

  // Loop through each object in the provided 'objects' array
  for (const key in objects) {
    // Calculate the sum of values in each object and store in the result
    const sum = Object.values(objects[key]).reduce((acc, value) => acc + value, 0)
    result[key] = sum
  }

  return result
}
export const transformDataShart = (data) => {
  return Object.entries(data).reduce((acc, [name, { totalQuantity }]) => {
    acc[name] = totalQuantity // Set the name as key and totalQuantity as value
    return acc // Return the accumulator
  }, {})
}
export const transformDataShartSonQuantity = (data) => {
  return Object.entries(data).reduce((acc, [name, { count }]) => {
    acc[name] = count // Set the name as key and totalQuantity as value
    return acc // Return the accumulator
  }, {})
}
export const calculateTotal = (obj) => {
  // Initialize the total variable
  let total = 0

  // Iterate through the object properties and sum the values
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      total += obj[key] // Add each value to the total
    }
  }

  return total // Return the calculated total
}
export const productTypes = [
  { value: 'CHARBON', label: 'Charbon', icon: <GiBarbecue /> },
  { value: 'PANINI', label: 'Panini', icon: <MdCompress /> },
  { value: 'FOUR', label: 'Four', icon: <PiOvenFill /> }
]

export const filterProductsByType = (products = [], type = '') => {
  return products.filter((p) => p.type === type)
}
export const convertImageToBase64 = (imagePath) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onload = function () {
      const reader = new FileReader()
      reader.onloadend = function () {
        resolve(reader.result) // This is the Base64 string
      }
      reader.readAsDataURL(xhr.response) // Convert the blob to Base64
    }
    xhr.open('GET', imagePath)
    xhr.responseType = 'blob'
    xhr.send()
  })
}

export const PrintInvoiceContent = async (element, object) => {
  // Print the content

  const base64Image = await convertImageToBase64(pokeemon) // Ensure 'pokeemon' is the correct image path or use your relative path

  const content = `
   <html>
     <head>
       <style>
         body {
           font-family: 'Arial', sans-serif;
           background-color: #ffffff;
           width: 80mm; /* Set body width to 80mm */
           margin: 0;
           padding: 0;
         }
         .container {
           padding: 12px;
           background-color: #ffffff;
           color: #333333;
           border: 1px solid #ccc;
           border-radius: 6px;
           width: 100%;
           font-size: 12px;
           font-family: 'Courier New', monospace;
         }
         .image-container {
           margin: 0 auto;
           width: 60px; /* Adjusted width for smaller receipts */
           height: auto;
         }
         .image {
           width: 100%;
           object-fit: cover;
         }
         .text-center {
           text-align: center;
         }
         .text-xs {
           font-size: 10px;
         }
         .mb-2 {
           margin-bottom: 0.5em;
         }
         .flex {
           display: flex;
           align-items: center;
           gap: 8px;
           justify-content: center;
         }
         .border-t {
           border-top: 1px solid #ccc;
           margin-top: 3px;
           margin-bottom: 3px;
         }
         .w-full {
           width: 100%;
         }
         .w-10 {
           width: 10px;
         }
         .table-auto {
           width: 100%;
           border-collapse: collapse;
         }
         .border {
           border: 1px solid #ddd;
         }
         .border-collapse {
           border-collapse: collapse;
         }
         th, td {
           padding: 4px;
           border: 1px solid #ddd;
           text-align: left;
         }
         .font-bold {
           font-weight: bold;
         }
         .whitespace-nowrap {
           white-space: nowrap;
         }
         .text-right {
           text-align: right;
         }
         .text-left {
           text-align: left;
         }
         .truncate {
           overflow: hidden;
           text-overflow: ellipsis;
           white-space: nowrap;
         }
         .font-semibold {
           font-weight: 600;
         }
         .capitalize {
           text-transform: capitalize;
         }
.flex-col {
    display: flex;         
    flex-direction: column; 
    align-items: flex-start; 
}
       </style>
     </head>
     <body>
       <div class="container">
         <!-- Image -->
         <div class="image-container">
           <img src="${base64Image}" class="image" alt="Logo" />
         </div>
         
         <!-- Address and Phone -->
         <p class="text-center text-xs">123 Adresse de la rue Tan-Tan, Maroc</p>
         <p class="text-xs mb-2 flex items-center gap-2 w-fit mx-auto">
           
           <img class='w-10' src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIgMGMtNi42MjcgMC0xMiA1LjM3My0xMiAxMnM1LjM3MyAxMiAxMiAxMiAxMi01LjM3MyAxMi0xMi01LjM3My0xMi0xMi0xMnptMy40NDUgMTcuODI3Yy0zLjY4NCAxLjY4NC05LjQwMS05LjQzLTUuOC0xMS4zMDhsMS4wNTMtLjUxOSAxLjc0NiAzLjQwOS0xLjA0Mi41MTNjLTEuMDk1LjU4NyAxLjE4NSA1LjA0IDIuMzA1IDQuNDk3bDEuMDMyLS41MDUgMS43NiAzLjM5Ny0xLjA1NC41MTZ6Ii8+PC9zdmc+">
           06 66 66 66 66
         </p>
 
         <!-- Date, Client, Livreur Info -->
         <div class="border-t"></div>
         <p class="text-xs">Date : ${new Date(element.createdAt).toLocaleDateString()} à ${new Date(element.createdAt).toLocaleTimeString()}</p> 
 
         <p class="text-xs flex-col p-1">
           ${!object.isDelevry ? `<span class='flex-1 text-center'>Commande sans livraison</span>` : ''}
           ${object.isDelevry && object.clientPhoneNumber ? `<span> Client : ${object.clientPhoneNumber} </span>` : ''}
           ${object.isDelevry && object.delevryId ? `<span class='capitalize'> Livreur : ${object.user} </span>` : ''}
         </p>
 
         <!-- Invoice Number -->
         <p class="text-xs mb-2">Facture #${element.id}</p>
 
         <!-- Table Headers and Items -->
         <div class="border-t"></div>
         <table class="table-auto w-full border-collapse text-xs">
           <thead>
             <tr class="bg-gray-200">
               <th class="border px-2 py-1 font-bold">Article</th>
               <th class="border px-2 py-1 font-bold">Qté</th>
               <th class="border px-2 py-1 font-bold">Prix</th>
             </tr>
           </thead>
           <tbody>
             ${object.details
               .map(
                 (item) => `
                 <tr>
                   <td class="border px-2 py-1 truncate capitalize">${item.category ? (item.category + ' ' + item.name) :item.name}</td>
                   <td class="border px-2 py-1 text-center">${item.q}</td>
                   <td class="border px-2 py-1 text-right">${item.totalePrice} MAD</td>
                 </tr>`
               )
               .join('')}
             ${
               object.isDelevry
                 ? `
                   <tr>
                     <td class="border px-2 py-1 truncate capitalize">Livraison</td>
                     <td class="border px-2 py-1 text-center">...</td>
                     <td class="border px-2 py-1 text-right">${!object.delevryPrice ? 0 : object.delevryPrice} MAD</td>
                   </tr>`
                 : ''
             }
           </tbody>
           <tfoot>
             <tr class="font-semibold">
               <td class="border-t px-1 py-1 text-left">Total</td>
               <td colspan="2" class="border-t px-1 py-1 text-right">
                 ${object.totalePrice} MAD
               </td>
             </tr>
           </tfoot>
         </table>
 
         <!-- Thank You Message -->
         <div class="border-t"></div>
         <p class="text-xs text-center">Merci pour votre achat !</p>
       </div>
     </body>
   </html>
 `
  try {
    if (window.api && window.api.print) {
      window.api.print(content)
      toast.success('Impression réussie')
    } else {
      toast.error("Erreur d'impression")
    }
  } catch (error) {
    toast.error("Erreur d'impression")
  }
}
