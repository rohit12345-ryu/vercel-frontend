import axios from "axios";

const api = axios.create({
  baseURL: "https://vercel-backend-nu-brown.vercel.app",
  withCredentials: true,
});


export default api;
