        // import React, { useEffect, useState } from "react";
        // import axios from "axios";
        // import { toast } from "react-toastify";
        // import { toOptimizedCloudinary, buildSrcSet } from "../utils/cloudinary";
        // import "./Flowers.css";

        // function Flowers() {
        // const [flowers, setFlowers] = useState([]);
        // const [loading, setLoading] = useState(true);
        // const [imageLoading, setImageLoading] = useState({});

        // const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:3001";

        // useEffect(() => {
        //     const fetchFlowers = async () => {
        //     try {
        //         const res = await axios.get(`${API_BASE}/api/flowers`);
        //         const items = Array.isArray(res.data) ? res.data : [];
        //         setFlowers(items);

        //         const init = {};
        //         items.forEach((f) => (init[f._id] = true));
        //         setImageLoading(init);
        //     } catch (err) {
        //         console.error("❌ Error fetching flowers:", err);
        //         toast.error("Failed to load flowers. Please check your API connection.");
        //     } finally {
        //         setLoading(false);
        //     }
        //     };

        //     fetchFlowers();
        // }, [API_BASE]);

        // const handleDelete = async (id) => {
        //     if (!window.confirm("Are you sure you want to delete this flower?")) return;
        //     try {
        //     await axios.delete(`${API_BASE}/api/flowers/${id}`);
        //     toast.success("🌸 Flower deleted successfully.");
        //     setFlowers((prev) => prev.filter((f) => f._id !== id));
        //     } catch (err) {
        //     console.error("❌ Error deleting flower:", err);
        //     toast.error("Failed to delete flower. Try again.");
        //     }
        // };

        // return (
        //     <div className="flowers-container">
        //     <h1 className="admin-title">Admin Panel</h1>

        //     {/* ✅ Inline navigation bar */}
            
        //     <nav className="admin-nav">
        //     <a href="/flowers">Flowers</a>
        //     <a href="/add-flower">Add Flowers</a>
        //     </nav>


        //     <h2 className="admin-header">🌸 Admin: Manage Flowers</h2>

        //     {loading ? (
        //         <p className="loading-text">Loading flowers, please wait...</p>
        //     ) : flowers.length === 0 ? (
        //         <div className="empty-state">
        //         <p>No flowers available yet.</p>
        //         <p>Start by adding a new flower from the “Add Flowers” tab.</p>
        //         </div>
        //     ) : (
        //         <div className="flowers-list">
        //         {flowers.map((flower) => {
        //             const optimizedUrl = toOptimizedCloudinary(flower.image);
        //             const srcSet = buildSrcSet(flower.image);

        //             return (
        //             <div className="flower-card" key={flower._id}>
        //                 <div className="flower-image">
        //                 {optimizedUrl ? (
        //                     <>
        //                     {imageLoading[flower._id] && (
        //                         <div className="image-placeholder">
        //                         <div className="spinner" />
        //                         </div>
        //                     )}
        //                     <img
        //                         src={optimizedUrl}
        //                         srcSet={srcSet || undefined}
        //                         sizes="(max-width: 600px) 100vw, 260px"
        //                         alt={flower.name}
        //                         loading="lazy"
        //                         decoding="async"
        //                         className={`flower-img ${
        //                         !imageLoading[flower._id] ? "loaded" : ""
        //                         }`}
        //                         onLoad={() =>
        //                         setImageLoading((prev) => ({
        //                             ...prev,
        //                             [flower._id]: false,
        //                         }))
        //                         }
        //                         onError={(e) => {
        //                         e.currentTarget.onerror = null;
        //                         e.currentTarget.src = "/placeholder.png";
        //                         setImageLoading((prev) => ({
        //                             ...prev,
        //                             [flower._id]: false,
        //                         }));
        //                         }}
        //                     />
        //                     </>
        //                 ) : (
        //                     <div className="image-placeholder">No Image Available</div>
        //                 )}
        //                 </div>

        //                 <div className="flower-details">
        //                 <h3>{flower.name?.replaceAll('"', "") || "Untitled"}</h3>
        //                 <p className="flower-description">
        //                     {flower.description?.replaceAll('"', "") || "No description"}
        //                 </p>
        //                 <p>
        //                     <span className="label">Category:</span>{" "}
        //                     {flower.category?.replaceAll('"', "") || "Uncategorized"}
        //                 </p>
        //                 <p>
        //                     <span className="label">Price:</span> $
        //                     {Number(flower.price).toFixed(2)}
        //                 </p>

        //                 <button
        //                     className="delete-btn"
        //                     onClick={() => handleDelete(flower._id)}
        //                 >
        //                     Delete
        //                 </button>
        //                 </div>
        //             </div>
        //             );
        //         })}
        //         </div>
        //     )}
        //     </div>
        // );
        // }

        // export default Flowers;

        // src/pages/Flower.js
    import React, { useEffect, useState } from "react";
    import { Link } from "react-router-dom"; // use SPA links, not <a>
    import { toast } from "react-toastify";
    import api from "../utils/api"; // ✅ one source of truth for baseURL
    import { toOptimizedCloudinary, buildSrcSet } from "../utils/cloudinary";
    import "./Flowers.css";

    function Flowers() {
    const [flowers, setFlowers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [imageLoading, setImageLoading] = useState({});

    // ✅ No local API_BASE. All calls go through `api` (configured to /api)
    useEffect(() => {
        const fetchFlowers = async () => {
        try {
            // relative path; api.baseURL already includes /api
            const { data } = await api.get("/flowers");
            const items = Array.isArray(data) ? data : Array.isArray(data?.items) ? data.items : [];
            setFlowers(items);

            const init = {};
            items.forEach((f) => (init[f._id] = true));
            setImageLoading(init);
        } catch (err) {
            console.error("❌ Error fetching flowers:", err?.response?.data || err?.message || err);
            toast.error("Failed to load flowers. Please check your API connection.");
        } finally {
            setLoading(false);
        }
        };

        fetchFlowers();
    }, []); // ✅ no API_BASE dependency

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this flower?")) return;
        try {
        await api.delete(`/flowers/${id}`); // ✅ relative, consistent base
        toast.success("🌸 Flower deleted successfully.");
        setFlowers((prev) => prev.filter((f) => f._id !== id));
        } catch (err) {
        console.error("❌ Error deleting flower:", err?.response?.data || err?.message || err);
        toast.error("Failed to delete flower. Try again.");
        }
    };

    return (
        <div className="flowers-container">
        <h1 className="admin-title">Admin Panel</h1>

        {/* ✅ Use <Link> so you don't full-reload */}
        <nav className="admin-nav">
            <Link to="/flowers">Flowers</Link>
            <Link to="/add-flower">Add Flowers</Link>
        </nav>

        <h2 className="admin-header">🌸 Admin: Manage Flowers</h2>

        {loading ? (
            <p className="loading-text">Loading flowers, please wait...</p>
        ) : flowers.length === 0 ? (
            <div className="empty-state">
            <p>No flowers available yet.</p>
            <p>Start by adding a new flower from the “Add Flowers” tab.</p>
            </div>
        ) : (
            <div className="flowers-list">
            {flowers.map((flower) => {
                const optimizedUrl = toOptimizedCloudinary(flower.image);
                const srcSet = buildSrcSet(flower.image);

                return (
                <div className="flower-card" key={flower._id}>
                    <div className="flower-image">
                    {optimizedUrl ? (
                        <>
                        {imageLoading[flower._id] && (
                            <div className="image-placeholder">
                            <div className="spinner" />
                            </div>
                        )}
                        <img
                            src={optimizedUrl}
                            srcSet={srcSet || undefined}
                            sizes="(max-width: 600px) 100vw, 260px"
                            alt={flower.name || "Flower"}
                            loading="lazy"
                            decoding="async"
                            className={`flower-img ${!imageLoading[flower._id] ? "loaded" : ""}`}
                            onLoad={() =>
                            setImageLoading((prev) => ({
                                ...prev,
                                [flower._id]: false,
                            }))
                            }
                            onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "/images/placeholder.png"; // safer default path
                            setImageLoading((prev) => ({ ...prev, [flower._id]: false }));
                            }}
                        />
                        </>
                    ) : (
                        <div className="image-placeholder">No Image Available</div>
                    )}
                    </div>

                    <div className="flower-details">
                    <h3>{flower.name?.replaceAll('"', "") || "Untitled"}</h3>
                    <p className="flower-description">
                        {flower.description?.replaceAll('"', "") || "No description"}
                    </p>
                    <p>
                        <span className="label">Category:</span>{" "}
                        {flower.category?.replaceAll('"', "") || "Uncategorized"}
                    </p>
                    <p>
                        <span className="label">Price:</span> ${Number(flower.price || 0).toFixed(2)}
                    </p>

                    <button className="delete-btn" onClick={() => handleDelete(flower._id)}>
                        Delete
                    </button>
                    </div>
                </div>
                );
            })}
            </div>
        )}
        </div>
    );
    }

    export default Flowers;
