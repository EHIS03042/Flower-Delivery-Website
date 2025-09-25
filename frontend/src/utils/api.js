    import axios from "axios";

    const api = axios.create({
    baseURL: "https://flower-delivery-website-af2b.onrender.com/api",
    });

    api.interceptors.request.use((config) => {
    const token = localStorage.getItem("fdw_jwt");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
    });

    export default api;
