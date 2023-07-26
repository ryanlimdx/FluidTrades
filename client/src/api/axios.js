import axios from 'axios';

export default axios.create({
    // baseURL: "http://localhost:3000",
    baseURL: "https://fluidtrades.onrender.com/",
    headers: { 'Content-Type': 'application/json'},
    withCredentials: true
});