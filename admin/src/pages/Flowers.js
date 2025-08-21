// Flowers.js
// import { useEffect, useState } from "react";
// import axios from "axios";
// import "./Flowers.css";

//     function Flowers() {
//     const [flowers, setFlowers] = useState([]);

//     useEffect(() => {
//         axios.get("https://flower-delivery-website-af2b.onrender.com/api/flowers")
//         .then(res => setFlowers(res.data))
//         .catch(err => console.error(err));
//     }, []);

//     const handleDelete = async (id) => {
//         if (window.confirm("Are you sure you want to delete this flower?")) {
//         await axios.delete(`https://flower-delivery-website-af2b.onrender.com/api/flowers/${id}`);
//         setFlowers(flowers.filter(flower => flower._id !== id));
//         }
//     };

//     return (
//         <div className="flowers-container">
//         {flowers.map(flower => (
//             <div key={flower._id} className="flower-card">
//             <img 
//                 src={`https://flower-delivery-website-af2b.onrender.com/${flower.image}`} 
//                 alt={flower.name} 
//                 className="flower-image"
//             />
//             <div className="flower-details">
//             <p><b>Name:</b> {flower.name}</p>
//             <p><b>Category:</b> {flower.category}</p>
//             <p><b>Price:</b> ${flower.price}</p>
//             <p><b>Description:</b> {flower.description}</p>
//             <button className="delete-btn" onClick={() => handleDelete(flower._id)}>Delete</button>
//             </div>
//             </div>
//         ))}
//         </div>
//     );
// }

// export default Flowers;

// Comment Out ln45&above
// src/components/Flowers.js
    import React, { useEffect, useState } from "react";
    import axios from "axios";
    import "./Flowers.css"; // external styles

    function Flowers() {
    const [flowers, setFlowers] = useState([]);

    // Fetch flowers on load
    useEffect(() => {
        fetchFlowers();
    }, []);

    const fetchFlowers = async () => {
        try {
        const res = await axios.get("http://localhost:3001/api/flowers");
        setFlowers(res.data);
        } catch (err) {
        console.error("Error fetching flowers:", err);
        }
    };

    // Delete flower
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this flower?")) return;

        try {
        await axios.delete(`http://localhost:3001/api/flowers/${id}`);
        setFlowers(flowers.filter((f) => f._id !== id)); // update UI instantly
        } catch (err) {
        console.error("Error deleting flower:", err);
        }
    };


    // return (
    //     <div className="flowers">
    //     <h2>Flower List</h2>
    //     <div className="flower-list">
    //         {flowers.map((flower) => (
    //         <div key={flower._id} className="flower-card">
    //             {flower.image && (
    //             <img
    //                 src={`http://localhost:5000/uploads/${flower.image}`}
    //                 alt={flower.name}
    //             />
    //             )}
    //             <h3>{flower.name}</h3>
    //             <p>{flower.description}</p>
    //             <p><strong>Price:</strong> ${flower.price}</p>
    //             <p><strong>Category:</strong> {flower.category}</p>
    //             <button onClick={() => handleDelete(flower._id)} className="delete-btn">
    //             Delete
    //             </button>
    //         </div>
    //         ))}
    //     </div>
    //     </div>
    // );
    // }

    // export default Flowers;

        return (
        <div className="flowers-container">
        <h2 className="admin-header">Admin Panel</h2>
        <div className="flowers-list">
            {flowers.map((flower) => (
            <div key={flower._id} className="flower-card">
                <div className="flower-image">
                    {flower.image ? (
                    <img
                    src={
                        flower.image.startsWith('/uploads/')
                        ? `http://localhost:3001${flower.image}`
                        : `http://localhost:3001/uploads/${flower.image}`
                    }
                    alt={flower.name}
                    />
                ) : (
                    <div className="image-placeholder">No Image</div>
                )}
                </div>

                <div className="flower-details">
                <p><strong className="label">Name:</strong> {flower.name}</p>
                <p><strong className="label">Category:</strong> {flower.category}</p>
                <p><strong className="label">Price:</strong> ${flower.price}</p>
                <p><strong className="label">Description:</strong> {flower.description}</p>
                <button
            className="delete-btn"
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
    };

    export default Flowers;
