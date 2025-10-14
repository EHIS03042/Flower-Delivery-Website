    // ✅ frontend/src/utils/cloudinary.js
    // Lightweight Cloudinary URL optimizer for fast image loading
    // - Adds responsive resizing, automatic format/quality, and progressive delivery
    // - Leaves non-Cloudinary URLs untouched

    const DEFAULT_TRANSFORMS = "w_600,c_fill,q_auto,f_auto,dpr_auto,fl_progressive";

    /**
     * Returns an optimized Cloudinary URL with transforms applied.
     * @param {string} src - Original Cloudinary URL (secure_url from DB)
     * @param {string} transforms - Optional transform string
     */
    export function toOptimizedCloudinary(src, transforms = DEFAULT_TRANSFORMS) {
    if (!src || typeof src !== "string") return src;

    // If not a Cloudinary URL, return as-is
    const isCloudinary =
        src.includes("res.cloudinary.com/") && src.includes("/image/upload/");
    if (!isCloudinary) return src;

    // Find the /upload/ segment
    const uploadIndex = src.indexOf("/upload/");
    if (uploadIndex === -1) return src;

    const prefix = src.slice(0, uploadIndex + "/upload/".length);
    const rest = src.slice(uploadIndex + "/upload/".length);

    // If transforms already exist, replace them
    const alreadyTransformed = /^[a-z0-9_,-]+\//i.test(rest);
    if (alreadyTransformed) {
        const afterFirstSlash = rest.indexOf("/");
        const restAfter = afterFirstSlash === -1 ? "" : rest.slice(afterFirstSlash + 1);
        return `${prefix}${transforms}/${restAfter}`;
    }

    // Otherwise, insert transforms
    return `${prefix}${transforms}/${rest}`;
    }

    /**
     * Generates a responsive `srcSet` for Cloudinary images.
     * Improves loading speed on mobile & retina displays.
     * @param {string} src - Original image URL
     * @param {number[]} widths - Breakpoint widths
     */
    export function buildSrcSet(src, widths = [200, 400, 600, 800, 1000]) {
    const isCloudinary =
        src && src.includes("res.cloudinary.com/") && src.includes("/image/upload/");
    if (!isCloudinary) return "";

    return widths
        .map(
        (w) =>
            `${toOptimizedCloudinary(
            src,
            `w_${w},c_fill,q_auto,f_auto,dpr_auto,fl_progressive`
            )} ${w}w`
        )
        .join(", ");
    }
