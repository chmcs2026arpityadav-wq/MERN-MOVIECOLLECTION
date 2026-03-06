import axios from "axios";

const api = axios.create({
  //baseURL: "http://localhost:3000", // your backend URL
  baseURL: "https://mern-moviecollection.onrender.com"
});

export default api;
