import axios from 'axios'
const api_uri = import.meta.env.VITE_API_URL
export const request = axios.create({
  baseURL: 'http://localhost:5000/api'
})
export const imageURI = import.meta.env.VITE_API_URL
