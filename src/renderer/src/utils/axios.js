import axios from 'axios'
const api_uri = import.meta.env.VITE_API_URL
export const request = axios.create({
  baseURL: api_uri
})
export const imageURI = import.meta.env.VITE_API_URL
