import pokeemon from '../../src/assets/images/pokeemon-01.png'
import { FaMotorcycle } from 'react-icons/fa6'
import React from 'react'
import { GrUserAdmin } from "react-icons/gr";
import { MdAdminPanelSettings } from "react-icons/md";

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


export const convertImageToBase64 = () => {
  return new Promise((resolve, reject) => {
    const image = new Image()

    // This assumes that `pokeemon` is a valid URL or base64 string
    image.src = pokeemon

    image.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = image.width
      canvas.height = image.height
      ctx.drawImage(image, 0, 0)
      resolve(canvas.toDataURL())
    }

    image.onerror = (error) => {
      reject(error)
    }
  })
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

