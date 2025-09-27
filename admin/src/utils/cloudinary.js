    // admin/src/utils/cloudinary.js
    // Robust builder that:
    //  - Applies strong thumbnail transforms for list views
    //  - Works with any incoming Cloudinary secure_url that contains /image/upload/
    //  - Leaves non-Cloudinary URLs unchanged (falls back)

    const DEFAULT_TRANSFORMS = "w_400,h_400,c_fill,q_auto,f_auto,dpr_auto,g_auto";

    export function toOptimizedCloudinary(src, transforms = DEFAULT_TRANSFORMS) {
    if (!src || typeof src !== "string") return src;

    // Already a Cloudinary delivery URL?
    const isCloudinary =
        src.includes("res.cloudinary.com/") && src.includes("/image/upload/");
    if (!isCloudinary) return src;

    // Avoid double-applying transforms
    const uploadIndex = src.indexOf("/upload/");
    if (uploadIndex === -1) return src;

    // If it already has a transform block after /upload/, replace the first chunk
    // else insert our transform block right after /upload/
    const prefix = src.slice(0, uploadIndex + "/upload/".length);
    const rest = src.slice(uploadIndex + "/upload/".length);

    // If rest already starts like "w_...,h_...," it's a transform block
    const alreadyTransformed = /^[a-z0-9_,-]+\//i.test(rest);
    if (alreadyTransformed) {
        // Replace only the first transform segment with our desired transforms
        const afterFirstSlash = rest.indexOf("/");
        const restAfter = afterFirstSlash === -1 ? "" : rest.slice(afterFirstSlash + 1);
        return `${prefix}${transforms}/${restAfter}`;
    }

    // Insert transforms
    return `${prefix}${transforms}/${rest}`;
    }

    // Useful for responsive images (srcSet)
    export function buildSrcSet(src, widths = [200, 320, 480, 640, 800]) {
    const isCloudinary =
        src && src.includes("res.cloudinary.com/") && src.includes("/image/upload/");
    if (!isCloudinary) return "";

    return widths
        .map(
        (w) =>
            `${toOptimizedCloudinary(
            src,
            `w_${w},h_${w},c_fill,q_auto,f_auto,dpr_auto,g_auto`
            )} ${w}w`
        )
        .join(", ");
    }
