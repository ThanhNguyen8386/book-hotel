import axios, { AxiosRequestConfig } from "axios";
import { API_URL } from "../constants";
import { refresh } from "./refreshToken";

const instance = axios.create(
    {
        baseURL: API_URL,
    });
const isClient = typeof window !== 'undefined';
instance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        config.headers = config.headers || {};
        // Thêm token từ localStorage hoặc cookie nếu có
        if (isClient) {
            const token = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') as string) !== null ? JSON.parse(localStorage.getItem('user') as string).token : false : false;
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
const refreshToken = async () => {
    try {
        const refreshToken = JSON.parse(localStorage.getItem('user') as string).refreshToken;
        const response = await refresh({ token: refreshToken });
        const _newToken = response.data.accessToken;
        const user = JSON.parse(localStorage.getItem('user') as string);
        localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify({ ...user, token: _newToken }));
        return response.data.accessToken;
    } catch (error) {
        // Xử lý logout nếu refresh token thất bại
        localStorage.removeItem('user');
        window.location.href = '/signin';
    }
};

instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Kiểm tra nếu là lỗi 401 và chưa thử refresh token
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const newToken = await refreshToken();
                // Cập nhật header Authorization với token mới
                originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

                // Thử lại request ban đầu
                return instance(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export const fetcher = (url: string) => instance.get(url).then(res => res.data);
export default instance;