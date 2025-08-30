    // const BASE_URL = "https://flower-delivery-website-af2b.onrender.com";

    // export const getImageUrl = (image) => {
    // if (!image) return "/placeholder.png"; 
    // return image.startsWith("/uploads/")
    //     ? `${BASE_URL}${image}` // already has /uploads/
    //     : `${BASE_URL}/uploads/${image}`; // just filename
    // };

    // Re-Code
    // admin/src/utils/imageHelper.js
// ------------------------------
// Returns a usable image URL regardless of how it's stored in DB:
//  - Absolute Cloudinary URL → return as-is
//  - "/uploads/filename.png" → prepend backend base
//  - "filename.png"          → normalize to "/uploads/filename.png" on backend base

const BASE_URL = "https://flower-delivery-website-af2b.onrender.com";

    export const getImageUrl = (image) => {
    if (!image) return "/placeholder.png";

    // Absolute URL (Cloudinary, etc.)
    if (/^https?:\/\//i.test(image)) return image;

    // Already includes /uploads/
    if (image.startsWith("/uploads/")) return `${BASE_URL}${image}`;

    // Bare filename from old records → normalize
    return `${BASE_URL}/uploads/${image}`;
    };
