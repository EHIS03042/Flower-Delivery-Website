    // src/utils/api.js
    import axios from "axios";

    /**
     * One source of truth for API baseURL.
     * - In prod on Render: use REACT_APP_API_URL (must end with /api)
     * - In local dev: fall back to http://localhost:3001/api
     */
    const baseURL =
    process.env.REACT_APP_API_URL ||
    (window.location.hostname === "localhost"
        ? "http://localhost:3001/api"
        : "https://flower-delivery-website-af2b.onrender.com/api"); // backend on Render

    const api = axios.create({ baseURL });

    // ✅ Attach JWT if present
    api.interceptors.request.use((config) => {
    const token = localStorage.getItem("fdw_jwt");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
    });

    export default api;
