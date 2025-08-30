// Flowers.js
//     import React, { useEffect, useState } from "react";
//     import axios from "axios";
//     import "./Flowers.css"; // external styles

//     function Flowers() {
//     const [flowers, setFlowers] = useState([]);

//     // Fetch flowers on load
//     useEffect(() => {
//         fetchFlowers();
//     }, []);
//     const API_URL = process.env.REACT_APP_API_URL;

//     const fetchFlowers = async () => {
//         try {
//         const res = await axios.get("https://flower-delivery-website-af2b.onrender.com/api/flowers");
//         setFlowers(res.data);
//         } catch (err) {
//         console.error("Error fetching flowers:", err);
//         }
//     };

//     // Delete flower
//     const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this flower?")) return;

//     try {
//         await axios.delete(`https://flower-delivery-website-af2b.onrender.com/api/flowers/${id}`);
//         setFlowers(flowers.filter((f) => f._id !== id));
//     } catch (err) {
//         console.error("Error deleting flower:", err);
//     }
// };

//         return (
//         <div className="flowers-container">
//         <h2 className="admin-header">Admin Panel</h2>
//         <div className="flowers-list">
//             {flowers.map((flower) => (
//             <div key={flower._id} className="flower-card">
//                 <div className="flower-image">
//                     {flower.image ? (
//                     <img
//                     src={
//                         flower.image.startsWith('/uploads/')
//                         ? `https://flower-delivery-website-af2b.onrender.com${flower.image}`
//                         : `https://flower-delivery-website-af2b.onrender.com/uploads/${flower.image}`
//                     }
//                     alt={flower.name}
//                     />
//                 ) : (
//                     <div className="image-placeholder">No Image</div>
//                 )}
//                 </div>

//                 <div className="flower-details">
//                 <p><strong className="label">Name:</strong> {flower.name}</p>
//                 <p><strong className="label">Category:</strong> {flower.category}</p>
//                 <p><strong className="label">Price:</strong> ${flower.price}</p>
//                 <p><strong className="label">Description:</strong> {flower.description}</p>
//                 <button
//             className="delete-btn"
//             onClick={() => handleDelete(flower._id)}
//             >
//             Delete
//             </button>
//                 </div>
//             </div>
//             ))}
//         </div>
//         </div>
//     );
//     };

//     export default Flowers;

//     // Re-Flower.js
//     // src/components/Flowers.js
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { getImageUrl } from "../utils/imageHelper";
// import "./Flowers.css"; // external styles

// function Flowers() {
//     const [flowers, setFlowers] = useState([]);


//     // Fetch flowers on load
//     useEffect(() => {
//         fetchFlowers();
//     }, []);

//     const fetchFlowers = async () => {
//         try {
//         const res = await axios.get(
//             "https://flower-delivery-website-af2b.onrender.com/api/flowers"
//         );
//         setFlowers(res.data);
//         } catch (err) {
//         console.error("Error fetching flowers:", err);
//         }
//     };

//     // Delete flower
//     const handleDelete = async (id) => {
//         if (!window.confirm("Are you sure you want to delete this flower?")) return;

//         try {
//         await axios.delete(
//             `https://flower-delivery-website-af2b.onrender.com/api/flowers/${id}`
//         );
//         setFlowers(flowers.filter((f) => f._id !== id)); // update UI instantly
//         } catch (err) {
//         console.error("Error deleting flower:", err);
//         }
//     };

//     return (
//         <div className="flowers-container">
//         <h2 className="admin-header">Admin Panel</h2>
//         <div className="flowers-list">
//             {flowers.map((flower) => (
//             <div key={flower._id} className="flower-card">
//                 <div className="flower-image">
//                 {flower.image ? (
//                     <img src={`https://flower-delivery-website-af2b.onrender.com/${flower.image}`} alt={flower.name} />
//                 ) : (
//                     <div className="image-placeholder">No Image</div>
//                 )}
//                 </div>

//                 <div className="flower-details">
//                 <p>
//                     <strong className="label">Name:</strong> {flower.name}
//                 </p>
//                 <p>
//                     <strong className="label">Category:</strong> {flower.category}
//                 </p>
//                 <p>
//                     <strong className="label">Price:</strong> ${flower.price}
//                 </p>
//                 <p>
//                     <strong className="label">Description:</strong>{" "}
//                     {flower.description}
//                 </p>
//                 <button
//                     className="delete-btn"
//                     onClick={() => handleDelete(flower._id)}
//                 >
//                     Delete
//                 </button>
//                 </div>
//             </div>
//             ))}
//         </div>
//         </div>
//     );
// }

// export default Flowers;

// Re-Code 2
// admin/src/pages/Flowers.js
// --------------------------
// Renders list of flowers and uses getImageUrl() for every <img>.
// NOTE: Adjust API_BASE if your admin talks to a different host in dev.

import React, { useEffect, useState } from "react";
import axios from "axios";
import { getImageUrl } from "../utils/imageHelper";

const API_BASE = "https://flower-delivery-website-af2b.onrender.com";

function Flowers() {
    const [flowers, setFlowers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchFlowers = async () => {
        try {
        const res = await axios.get(`${API_BASE}/api/flowers`);
        setFlowers(res.data || []);
        } catch (err) {
        console.error(err);
        } finally {
        setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
        await axios.delete(`${API_BASE}/api/flowers/${id}`);
        setFlowers((prev) => prev.filter((f) => f._id !== id));
        } catch (err) {
        console.error(err);
        }
    };

    useEffect(() => {
        fetchFlowers();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="flowers-container" style={{ padding: 16 }}>
        <h2>Flowers</h2>
        <div className="flowers-grid" style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
            {flowers.map((flower) => (
            <div key={flower._id} className="flower-card" style={{ border: "1px solid #eee", borderRadius: 12, padding: 12 }}>
                <div style={{ aspectRatio: "1/1", overflow: "hidden", borderRadius: 12, marginBottom: 8, background: "#fafafa" }}>
                <img
                    src={getImageUrl(flower.image)}
                    alt={flower.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    onError={(e) => { e.currentTarget.src = "/placeholder.png"; }}
                />
                </div>

                <h3 style={{ margin: "8px 0 4px" }}>{flower.name}</h3>
                <p style={{ margin: 0 }}>{flower.description}</p>
                <p style={{ margin: "8px 0 0", fontWeight: 600 }}>₵{Number(flower.price).toFixed(2)}</p>
                <p style={{ margin: "4px 0 12px", color: "#555" }}>{flower.category}</p>

                <div style={{ display: "flex", gap: 8 }}>
                {/* You can add Edit later */}
                <button
                    className="delete-btn"
                    style={{ background: "#e11d48", color: "#fff", border: 0, borderRadius: 8, padding: "8px 12px", cursor: "pointer" }}
                    onClick={() => handleDelete(flower._id)}
                >
                    Delete
                </button>
                </div>
            </div>
            ))}
        </div>
        </div>
    );
    }

export default Flowers;
