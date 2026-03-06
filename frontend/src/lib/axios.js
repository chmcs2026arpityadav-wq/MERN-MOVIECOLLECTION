import axios from "axios";

const api = axios.create({
  //baseURL: "http://localhost:3000", // your backend URL
  baseURL:"https://moviecollection-u34e.onrender.com"
});

export default api;
