// AddFlower.js
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddFlower.css";

    function AddFlower() {
    const [form, setForm] = useState({ name: "", category: "", price: "", description: "" });
    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.entries(form).forEach(([key, value]) => formData.append(key, value));
        formData.append("image", image);

        try {
        await axios.post("http://localhost:3001/api/flowers", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Flower added successfully!");
        setForm({ name: "", category: "", price: "", description: "" });
        setImage(null);
        } catch (err) {
        toast.error("Error adding flower");
        }
    };

    return (
        <div className="add-flower-container">
        <form onSubmit={handleSubmit} className="add-flower-form">
            <input type="file" onChange={(e) => setImage(e.target.files[0])} required /><br />
            <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required /><br />
            <input name="category" value={form.category} onChange={handleChange} placeholder="Category" required /><br />
            <input name="price" value={form.price} onChange={handleChange} placeholder="Price" required /><br />
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description"></textarea><br />
            <button type="submit" className="submit-btn">SUBMIT</button>
        </form>
        <ToastContainer />
        </div>
    );
    }

export default AddFlower;
