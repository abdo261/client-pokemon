import pokeemon from '../../src/assets/images/pokeemon-01.png'
import { FaMotorcycle } from 'react-icons/fa6'
import React from 'react'
import { GrUserAdmin } from "react-icons/gr";
import { MdAdminPanelSettings, MdCompress } from "react-icons/md";
import { GiBarbecue } from 'react-icons/gi';
import { PiOvenFill } from 'react-icons/pi';

export const checkIfSelected = (id, selectedProducts = []) => {
  return selectedProducts.includes(id)
}
export const formatErrorField = (errors, field) => {
  return errors[field] || null;
};
export const formatMoney = (amounth) => {
  return new Intl.NumberFormat('fr-MA', {
    style: 'currency',
    currency: 'MAD'
  }).format(amounth)
}
export function calculateHourDifference(date1, date2) {
  const diffInMilliseconds = new Date(date2) - new Date(date1);
  const hours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
  const minutes = Math.round((diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));

  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}`;
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
  if (role === 'ADMIN') return React.createElement(MdAdminPanelSettings);
  if (role === 'LIVREUR') return React.createElement(FaMotorcycle);
  if (role === 'RESPONSABLE') return React.createElement(GrUserAdmin);
  return null;
};
export const getRoleColor = (role) => {
  if (role === 'ADMIN') return "success";
  if (role === 'LIVREUR') return "secondary"
  if (role === 'RESPONSABLE') return "warning"
  return null;
};
export const getRoleLabel = (role) => {
  if (role === 'ADMIN') return "Admin";
  if (role === 'LIVREUR') return "Livreur"
  if (role === 'RESPONSABLE') return "Responsable"
  return null;
};

export function formatTimestamp(isoString) {
  const dt = new Date(isoString);
  const now = new Date();
  const difference = now - dt;

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  const hours = Math.floor(difference / (1000 * 60 * 60)) % 24;
  const minutes = Math.floor(difference / (1000 * 60)) % 60;

  const day = dt.getUTCDate().toString().padStart(2, "0");
  const month = (dt.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = dt.getUTCFullYear().toString().slice(-2);
  const formattedDate = `${day}/${month}/${year}`;

  let elapsedTime;
  if (years > 0) {
    elapsedTime = `il y a ${years} année${years > 1 ? "s" : ""}`;
  } else if (months > 0) {
    elapsedTime = `il y a ${months} mois`;
  } else if (days > 0) {
    elapsedTime = `il y a ${days} jour${days > 1 ? "s" : ""}`;
  } else if (hours > 0) {
    elapsedTime = `il y a ${hours} heure${hours > 1 ? "s" : ""}`;
  } else {
    elapsedTime = `il y a ${minutes} minute${minutes > 1 ? "s" : ""}`;
  }

  return (
    <>
      {formattedDate}{" "}
      <span className="underline underline-offset-4">{elapsedTime}</span>
    </>
  );
}
export function formatDateToDDMMYY(dateStr = new Date()) {
  const date = new Date(dateStr);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return 'Invalid Date'; // Handle invalid date formats
  }

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const year = String(date.getFullYear()).slice(-2);

  return `${day}/${month}/${year}`;
}

export const formatDateToLocaleString = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const year = String(date.getFullYear()).slice(-2); 
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} à ${hours}:${minutes}`;
};

export function calculateSumsInObjects(objects) {
  const result = {};

  // Loop through each object in the provided 'objects' array
  for (const key in objects) {
      // Calculate the sum of values in each object and store in the result
      const sum = Object.values(objects[key]).reduce((acc, value) => acc + value, 0);
      result[key] = sum;
  }

  return result;
}
export const transformDataShart = (data) => {
  return Object.entries(data).reduce((acc, [name, { totalQuantity }]) => {
    acc[name] = totalQuantity; // Set the name as key and totalQuantity as value
    return acc; // Return the accumulator
  }, {});
};
export const transformDataShartSonQuantity = (data) => {
  return Object.entries(data).reduce((acc, [name, { count }]) => {
    acc[name] = count; // Set the name as key and totalQuantity as value
    return acc; // Return the accumulator
  }, {});
};
export const calculateTotal = (obj) => {
  // Initialize the total variable
  let total = 0;

  // Iterate through the object properties and sum the values
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      total += obj[key]; // Add each value to the total
    }
  }

  return total; // Return the calculated total
};
export const productTypes = [
  { value: 'CHARBON', label: 'Charbon', icon: <GiBarbecue /> },
  { value: 'PANINI', label: 'Panini', icon: <MdCompress /> },
  { value: 'FOUR', label: 'Four', icon: <PiOvenFill /> }
]

export const filterProductsByType =(products=[],type="")=>{
return products.filter(p=>p.type === type)
}
export  const convertImageToBase64 = (imagePath) => {
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