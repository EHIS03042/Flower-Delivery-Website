    // src/pages/AddFlower.js
    import React, { useState } from "react";
    import axios from "axios";
    import { toast } from "react-toastify";
    import { useNavigate } from "react-router-dom";
    import "./AddFlower.css";

    function AddFlower() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        image: null,
    });

    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    // ✅ Define categories with slug + label
    const categories = [
        { slug: "fresh-flowers", label: "Fresh Flowers" },
        { slug: "dried-flowers", label: "Dried Flowers" },
        { slug: "live-plants", label: "Live Plants" },
        { slug: "aroma-candles", label: "Aroma Candles" },
        { slug: "fresheners", label: "Fresheners" },
        { slug: "bouquets", label: "Bouquets" },
        { slug: "luxury-arrangements", label: "Luxury Arrangements" },
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
        setFormData({ ...formData, image: file });
        setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
        const data = new FormData();
        data.append("name", formData.name);
        data.append("description", formData.description);
        data.append("price", formData.price);
        data.append("category", formData.category);
        data.append("image", formData.image);

        const res = await axios.post(
            `${process.env.REACT_APP_API_URL || "http://localhost:3001"}/api/flowers`,
            data,
            { headers: { "Content-Type": "multipart/form-data" } }
        );

        toast.success("🌸 Flower added successfully!");
        if (res.data.image) setPreview(res.data.image);

        // ✅ Reset form
        setFormData({
            name: "",
            description: "",
            price: "",
            category: "",
            image: null,
        });

        navigate("/flowers");
        } catch (err) {
        console.error(err);
        toast.error("❌ Failed to add flower.");
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="add-flower-container">
        <h1 className="admin-title">Admin Panel</h1>

        {/* ✅ Inline navigation bar */}
        <nav className="admin-nav">
            <a href="/flowers">Flowers</a>
            <a href="/add-flower">Add Flowers</a>
        </nav>

        <h2>Add New Flower</h2>

        <form
            className="add-flower-form"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
        >
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

            {/* ✅ Slug-based category dropdown */}
            <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                {cat.label}
                </option>
            ))}
            </select>

            <input type="file" name="image" onChange={handleImageChange} required />

            <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Flower"}
            </button>
        </form>

        {preview && (
            <div className="image-preview">
            <h4>Preview:</h4>
            <img src={preview} alt="flower preview" />
            </div>
        )}
        </div>
    );
    }

    export default AddFlower;
