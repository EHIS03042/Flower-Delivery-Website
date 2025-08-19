// Flowers.js
import { useEffect, useState } from "react";
import axios from "axios";
import "./Flowers.css";

    function Flowers() {
    const [flowers, setFlowers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/api/flowers")
        .then(res => setFlowers(res.data))
        .catch(err => console.error(err));
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this flower?")) {
        await axios.delete(`http://localhost:3001/api/flowers/${id}`);
        setFlowers(flowers.filter(flower => flower._id !== id));
        }
    };

    return (
        <div className="flowers-container">
        {flowers.map(flower => (
            <div key={flower._id} className="flower-card">
            <img 
                src={`http://localhost:3001/${flower.image}`} 
                alt={flower.name} 
                className="flower-image"
            />
            <div className="flower-details">
            <p><b>Name:</b> {flower.name}</p>
            <p><b>Category:</b> {flower.category}</p>
            <p><b>Price:</b> ${flower.price}</p>
            <p><b>Description:</b> {flower.description}</p>
            <button className="delete-btn" onClick={() => handleDelete(flower._id)}>Delete</button>
            </div>
            </div>
        ))}
        </div>
    );
}

export default Flowers;
