import axios from "axios";
import { API_URL } from "../constants";

const instance = axios.create(
    {
        baseURL: API_URL,
        headers: {
            'Authorization': `Bearer ${typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') as string) !== null ? JSON.parse(localStorage.getItem('user') as string).token : "" : ""}`
        }
    });
instance.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response.data;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    }
);
export default instance;