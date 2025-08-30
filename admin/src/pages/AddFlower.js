
//     // Cloudinary Logic Embedded in the AddFlower.js code
//     // src/components/AddFlower.js
// import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "./AddFlower.css";

// function AddFlower() {
//     const [formData, setFormData] = useState({
//         name: "",
//         description: "",
//         price: "",
//         category: "",
//         image: null,
//     });

//     // Handle input fields
//     const handleChange = (e) => {
//         if (e.target.name === "image") {
//         setFormData({ ...formData, image: e.target.files[0] });
//         } else {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//         }
//     };

//     // Submit form
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//         let imageUrl = "";

//         // 1. Upload image to Cloudinary (unsigned upload preset)
//         if (formData.image) {
//             const imageData = new FormData();
//             imageData.append("file", formData.image);
//             imageData.append("upload_preset", "Flowers_Unsigned"); // unsigned preset
            
//             const uploadRes = await axios.post(
//             `https://api.cloudinary.com/v1_1/duq0nbvxs/image/upload`,
//             imageData
//             );

//             imageUrl = uploadRes.data.secure_url;
//         }

//         // 2. Send flower data to backend (MongoDB)
//         const res = await axios.post(
//             "https://flower-delivery-website-af2b.onrender.com/api/flowers",
//             {
//             name: formData.name,
//             description: formData.description,
//             price: formData.price,
//             category: formData.category,
//             image: imageUrl, //  stored as Cloudinary URL
//             }
//         );

//         toast.success("Flower added successfully!");
//         console.log("Saved flower:", res.data);

//         // Reset form
//         setFormData({
//             name: "",
//             description: "",
//             price: "",
//             category: "",
//             image: null,
//         });
//         } catch (err) {
//         console.error(err);
//         toast.error("Failed to add flower.");
//         }
//     };

//     return (
//         <div className="add-flower">
//         <h2>Add Flower</h2>
//         <form onSubmit={handleSubmit} className="add-flower-form">
//             <input
//             type="text"
//             name="name"
//             placeholder="Flower Name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//             />
//             <textarea
//             name="description"
//             placeholder="Description"
//             value={formData.description}
//             onChange={handleChange}
//             required
//             />
//             <input
//             type="number"
//             name="price"
//             placeholder="Price"
//             value={formData.price}
//             onChange={handleChange}
//             required
//             />
//             <input
//             type="text"
//             name="category"
//             placeholder="Category"
//             value={formData.category}
//             onChange={handleChange}
//             required
//             />
//             <input
//             type="file"
//             name="image"
//             accept="image/*"
//             onChange={handleChange}
//             />

//             <button type="submit">Add Flower</button>
//         </form>
//         </div>
//     );
//     }

// export default AddFlower;

// // Re-Code #
// // admin/src/pages/AddFlower.js
// // ---------------------------
// // Client-side Cloudinary upload (unsigned) -> send secure_url to backend as `image`.
// // The backend accepts either this URL or a file upload.

// import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "./AddFlower.css";

// const API_BASE = "https://flower-delivery-website-af2b.onrender.com";
// const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/duq0nbvxs/image/upload";
// const CLOUDINARY_UPLOAD_PRESET = "Flowers_Unsigned"; // make sure this unsigned preset exists in your Cloudinary

// function AddFlower() {
//     const [formData, setFormData] = useState({
//         name: "",
//         description: "",
//         price: "",
//         category: "",
//         image: null,            // File input
//     });
//     const [submitting, setSubmitting] = useState(false);

//     const handleChange = (e) => {
//         if (e.target.name === "image") {
//         setFormData({ ...formData, image: e.target.files[0] });
//         } else {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setSubmitting(true);

//         try {
//         let imageUrl = "";

//         // 1) Upload to Cloudinary (client-side unsigned)
//         if (formData.image) {
//             const imageData = new FormData();
//             imageData.append("file", formData.image);
//             imageData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

//             const uploadRes = await axios.post(CLOUDINARY_UPLOAD_URL, imageData);
//             imageUrl = uploadRes.data.secure_url;
//         }

//         // 2) Send the flower to backend (JSON)
//         const payload = {
//             name: formData.name,
//             description: formData.description,
//             price: formData.price,
//             category: formData.category,
//             image: imageUrl, // Directly pass the Cloudinary URL
//         };

//         const res = await axios.post(`${API_BASE}/api/flowers`, payload);
//         console.log("Saved flower:", res.data);

//         toast.success("Flower added successfully!");
//         setFormData({
//             name: "",
//             description: "",
//             price: "",
//             category: "",
//             image: null,
//         });
//         // Optionally, navigate to list page or refresh list
//         } catch (err) {
//         console.error(err);
//         toast.error("Failed to add flower.");
//         } finally {
//         setSubmitting(false);
//         }
//     };

//     return (
//         <div className="add-flower">
//         <h2>Add Flower</h2>
//         <form onSubmit={handleSubmit} className="add-flower-form">
//             <label>
//             Name
//             <input name="name" value={formData.name} onChange={handleChange} required />
//             </label>

//             <label>
//             Description
//             <textarea name="description" value={formData.description} onChange={handleChange} required />
//             </label>

//             <label>
//             Price
//             <input name="price" value={formData.price} type="number" step="0.01" onChange={handleChange} required />
//             </label>

//             <label>
//             Category
//             <input name="category" value={formData.category} onChange={handleChange} required />
//             </label>

//             <label>
//             Image
//             <input name="image" type="file" accept="image/*" onChange={handleChange} required />
//             </label>

//             <button type="submit" disabled={submitting}>
//             {submitting ? "Saving..." : "Save"}
//             </button>
//         </form>
//         </div>
//     );
//     }

// export default AddFlower;

// // Re-Code ##
// import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

//     function AddFlower() {
//     const [formData, setFormData] = useState({
//         name: "",
//         description: "",
//         price: "",
//         category: "",
//         image: null,
//     });

//     const [preview, setPreview] = useState(null); //  Preview Cloudinary URL

//     // Handle text fields
//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     // Handle image upload (preview locally before sending)
//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//         setFormData({ ...formData, image: file });
//         setPreview(URL.createObjectURL(file)); // temporary local preview
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//         const data = new FormData();
//         data.append("name", formData.name);
//         data.append("description", formData.description);
//         data.append("price", formData.price);
//         data.append("category", formData.category);
//         data.append("image", formData.image);

//         const res = await axios.post(
//             "https://flower-delivery-website-af2b.onrender.com/api/flowers",
//             data,
//             { headers: { "Content-Type": "multipart/form-data" } }
//         );

//         toast.success("Flower added successfully!");

//         //  After successful save, show the Cloudinary-hosted image
//         if (res.data.image) {
//             setPreview(res.data.image); // switch preview to Cloudinary URL
//         }

//         // Reset form (but keep preview so admin sees uploaded image)
//         setFormData({
//             name: "",
//             description: "",
//             price: "",
//             category: "",
//             image: null,
//         });
//         } catch (err) {
//         console.error(err);
//         toast.error("Failed to add flower.");
//         }
//     };

//     return (
//         <div className="add-flower-form">
//         <h2>Add New Flower</h2>
//         <form onSubmit={handleSubmit} encType="multipart/form-data">
//             <input
//             type="text"
//             name="name"
//             placeholder="Flower Name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//             />
//             <textarea
//             name="description"
//             placeholder="Description"
//             value={formData.description}
//             onChange={handleChange}
//             required
//             />
//             <input
//             type="number"
//             name="price"
//             placeholder="Price"
//             value={formData.price}
//             onChange={handleChange}
//             required
//             />
//             <input
//             type="text"
//             name="category"
//             placeholder="Category"
//             value={formData.category}
//             onChange={handleChange}
//             required
//             />
//             <input type="file" name="image" onChange={handleImageChange} />

//             <button type="submit">Save Flower</button>
//         </form>

//         {/*  Image preview (local → switches to Cloudinary after save) */}
//         {preview && (
//             <div className="image-preview">
//             <h4>Preview:</h4>
//             <img src={preview} alt="flower preview" style={{ width: "200px", borderRadius: "8px" }} />
//             </div>
//         )}
//         </div>
//     );
// }

// export default AddFlower;

// Re-Code ###
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./AddFlower.css"; // external stylesheet

function AddFlower() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        image: null,
    });

    const [preview, setPreview] = useState(null);

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
        try {
        const data = new FormData();
        data.append("name", formData.name);
        data.append("description", formData.description);
        data.append("price", formData.price);
        data.append("category", formData.category);
        data.append("image", formData.image);

        const res = await axios.post(
            "https://flower-delivery-website-af2b.onrender.com/api/flowers",
            data,
            { headers: { "Content-Type": "multipart/form-data" } }
        );

        toast.success("Flower added successfully!");

        if (res.data.image) {
            setPreview(res.data.image);
        }

        setFormData({
            name: "",
            description: "",
            price: "",
            category: "",
            image: null,
        });
        } catch (err) {
        console.error(err);
        toast.error("Failed to add flower.");
        }
    };

    return (
        <div className="add-flower-container">
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

            <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            required
            />

            <input type="file" name="image" onChange={handleImageChange} />

            <button type="submit">Save Flower</button>
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
