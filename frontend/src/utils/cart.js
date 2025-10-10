    // frontend/src/utils/cart.js

    const KEY = "fdw_cart";

    export function getCart() {
    try {
        const raw = localStorage.getItem(KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
    }

    function saveCart(items) {
    localStorage.setItem(KEY, JSON.stringify(items));
    }

    export function addToCart(product, qty = 1) {
    if (!product?._id && !product?.id) return;
    const id = product._id || product.id;

    const items = getCart();
    const idx = items.findIndex((it) => (it._id || it.id) === id);

    if (idx >= 0) {
        items[idx].quantity = (items[idx].quantity || 1) + qty;
    } else {
        items.push({
        _id: product._id,
        id,
        name: product.name,
        price: Number(product.price || 0),
        image: product.image || product.img || product.images?.[0] || "",
        quantity: qty,
        });
    }
    saveCart(items);
    return items;
    }

    export function updateQty(id, qty) {
    const items = getCart();
    const idx = items.findIndex((it) => (it._id || it.id) === id);
    if (idx >= 0) {
        items[idx].quantity = Math.max(1, qty);
        saveCart(items);
    }
    return getCart();
    }

    export function removeFromCart(id) {
    const items = getCart().filter((it) => (it._id || it.id) !== id);
    localStorage.setItem(KEY, JSON.stringify(items));
    return items;
    }

    export function clearCart() {
    localStorage.removeItem(KEY);
    }
