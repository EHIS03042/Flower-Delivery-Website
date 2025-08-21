// AddFlower.js

// import { useState } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./AddFlower.css";

//     function AddFlower() {
//     const [form, setForm] = useState({ name: "", category: "", price: "", description: "" });
//     const [image, setImage] = useState(null);

//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const formData = new FormData();
//         Object.entries(form).forEach(([key, value]) => formData.append(key, value));
//         formData.append("image", image);

//         try {
//         await axios.post("http://localhost:3001/api/flowers", formData, {
//             headers: { "Content-Type": "multipart/form-data" },
//         });
//         toast.success("Flower added successfully!");
//         setForm({ name: "", category: "", price: "", description: "" });
//         setImage(null);
//         } catch (err) {
//         toast.error("Error adding flower");
//         }
//     };

//     return (
//         <div className="add-flower-container">
//         <form onSubmit={handleSubmit} className="add-flower-form">
//             <input type="file" onChange={(e) => setImage(e.target.files[0])} required /><br />
//             <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required /><br />
//             <input name="category" value={form.category} onChange={handleChange} placeholder="Category" required /><br />
//             <input name="price" value={form.price} onChange={handleChange} placeholder="Price" required /><br />
//             <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description"></textarea><br />
//             <button type="submit" className="submit-btn">SUBMIT</button>
//         </form>
//         <ToastContainer />
//         </div>
//     );
//     }

// export default AddFlower;

// src/components/AddFlower.js
    import React, { useState } from "react";
    import axios from "axios";
    import "./AddFlower.css"; // external styles

    function AddFlower() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        image: null,
    });
    const [message, setMessage] = useState("");

    // Handle input fields
    const handleChange = (e) => {
        if (e.target.name === "image") {
        setFormData({ ...formData, image: e.target.files[0] });
        } else {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        const data = new FormData();
        data.append("name", formData.name);
        data.append("description", formData.description);
        data.append("price", formData.price);
        data.append("category", formData.category);
        if (formData.image) data.append("image", formData.image);

        const res = await axios.post("http://localhost:3001/api/flowers", data, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        setMessage("✅ Flower added successfully!");
        console.log("Saved flower:", res.data);

        // Reset form
        setFormData({
            name: "",
            description: "",
            price: "",
            category: "",
            image: null,
        });
        } catch (err) {
        console.error(err);
        setMessage(" Failed to add flower.");
        }
    };

    return (
        <div className="add-flower">
        <h2>Add Flower</h2>
        <form onSubmit={handleSubmit} className="add-flower-form">
            <input
            type="text"
            name="name"
            placeholder="Flower Name"
            value={formData.name}
            onChange={handleChange}
            required
            />
            <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
            />
            <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
            />
            <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            required
            />
            <input type="file" name="image" accept="image/*" onChange={handleChange} />

            <button type="submit">Add Flower</button>
        </form>

        {message && <p className="popup-message">{message}</p>}
        </div>
    );
    }

export default AddFlower;
