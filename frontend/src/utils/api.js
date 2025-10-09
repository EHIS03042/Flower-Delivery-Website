    import axios from "axios";

    const api = axios.create({
    baseURL:
        process.env.REACT_APP_API_URL ||
        (window.location.hostname === "localhost"
        ? "http://localhost:3001/api"
        : "https://flower-delivery-website-af2b.onrender.com/api"), // ✅ your actual backend URL
    });

    // ✅ Attach JWT token automatically
    api.interceptors.request.use((config) => {
    const token = localStorage.getItem("fdw_jwt");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
    });

    export default api;
