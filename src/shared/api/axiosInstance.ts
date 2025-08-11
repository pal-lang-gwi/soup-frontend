import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE,
    //cookie 자동 전송
    withCredentials: true,
});
