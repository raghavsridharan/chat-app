import axios from "axios";

export const axiosInstance = axios.create({
    // backend server
    baseURL : "http://localhost:5001/api",
    withCredentials : true,  
})

