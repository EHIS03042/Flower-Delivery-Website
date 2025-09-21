    // admin/src/pages/Flowers.js
    import React, { useEffect, useState } from "react";
    import axios from "axios";
    import { toast } from "react-toastify";
    import { toOptimizedCloudinary, buildSrcSet } from "../utils/cloudinary";
    import "./Flowers.css";

    function Flowers() {
    const [flowers, setFlowers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [imageLoading, setImageLoading] = useState({});

    // ✅ Base API from .env
    const API_BASE = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchFlowers = async () => {
        try {
            const res = await axios.get(`${API_BASE}/api/flowers`);
            const items = Array.isArray(res.data) ? res.data : [];
            setFlowers(items);

            // initialize spinner state for each flower
            const init = {};
            items.forEach((f) => (init[f._id] = true));
            setImageLoading(init);
        } catch (err) {
            console.error("Error fetching flowers:", err);
            toast.error("Failed to load flowers.");
        } finally {
            setLoading(false);
        }
        };

        fetchFlowers();
    }, [API_BASE]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this flower?")) return;
        try {
        await axios.delete(`${API_BASE}/api/flowers/${id}`);
        toast.success("Flower deleted successfully");
        setFlowers((prev) => prev.filter((f) => f._id !== id));
        } catch (err) {
        console.error("Error deleting flower:", err);
        toast.error("Failed to delete flower.");
        }
    };

    if (loading) return <p>Loading flowers...</p>;

    return (
        <div className="flowers-container">
        <h2 className="admin-header">🌸 Admin: Manage Flowers</h2>

        <div className="flowers-list">
            {flowers.length === 0 ? (
            <p>No flowers available.</p>
            ) : (
            flowers.map((flower) => {
                const original = flower.image;
                const optimizedUrl = toOptimizedCloudinary(original);
                const srcSet = buildSrcSet(original);

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
                            alt={flower.name}
                            loading="lazy"
                            decoding="async"
                            className={`flower-img ${
                            !imageLoading[flower._id] ? "loaded" : ""
                            }`}
                            onLoad={() =>
                            setImageLoading((prev) => ({
                                ...prev,
                                [flower._id]: false,
                            }))
                            }
                            onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "/placeholder.png";
                            setImageLoading((prev) => ({
                                ...prev,
                                [flower._id]: false,
                            }));
                            }}
                        />
                        </>
                    ) : (
                        <div className="image-placeholder">No Image Available</div>
                    )}
                    </div>

                    <div className="flower-details">
                    <h3>{flower.name?.replaceAll('"', "") || "Untitled"}</h3>
                    <p>{flower.description?.replaceAll('"', "") || ""}</p>
                    <p>
                        <span className="label">Category:</span>{" "}
                        {flower.category?.replaceAll('"', "") || ""}
                    </p>
                    <p>
                        <span className="label">Price:</span> $
                        {Number(flower.price).toFixed(2)}
                    </p>

                    <button
                        className="delete-btn"
                        onClick={() => handleDelete(flower._id)}
                    >
                        Delete
                    </button>
                    </div>
                </div>
                );
            })
            )}
        </div>
        </div>
    );
    }

    export default Flowers;
