    // frontend/src/utils/cart.js

    const KEY = "fdw_cart";

    // Robust ID getter (_id | id)
    const getId = (x) => (x?._id ?? x?.id ?? "").toString();

    // Total count helper
    function totalCount(items) {
    return items.reduce((n, it) => n + (Number(it.quantity) || 1), 0);
    }

    // Save + broadcast to the app (Navbar listens for this)
    function saveCart(items) {
    localStorage.setItem(KEY, JSON.stringify(items));
    // 🔔 Tell listeners (Navbar) that cart changed
    window.dispatchEvent(
        new CustomEvent("cart:updated", {
        detail: { items, count: totalCount(items) },
        })
    );
    return items;
    }

    export function getCart() {
    try {
        const raw = localStorage.getItem(KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
    }

    // Optional helper if you ever want the number directly
    export function getCartCount() {
    return totalCount(getCart());
    }

    export function addToCart(product, qty = 1) {
    if (!product?._id && !product?.id) return getCart();

    const id = getId(product);
    const items = getCart();
    const idx = items.findIndex((it) => getId(it) === id);

    const addQty = Number(qty || 1);

    if (idx >= 0) {
        items[idx].quantity = (Number(items[idx].quantity) || 1) + addQty;
    } else {
        items.push({
        _id: product._id,                  // preserve your existing shape
        id,                                // keep id field too
        name: product.name,
        price: Number(product.price || 0),
        image: product.image || product.img || product.images?.[0] || "",
        quantity: addQty,
        });
    }

    return saveCart(items);
    }

    export function updateQty(id, qty) {
    const targetId = getId({ _id: id, id }) || id;
    let items = getCart();
    const newQty = Number(qty);

    if (newQty <= 0 || Number.isNaN(newQty)) {
        // remove if <= 0
        items = items.filter((it) => getId(it) !== targetId);
        return saveCart(items);
    }

    const idx = items.findIndex((it) => getId(it) === targetId);
    if (idx >= 0) {
        items[idx].quantity = Math.max(1, newQty);
    }
    return saveCart(items);
    }

    export function removeFromCart(id) {
    const targetId = getId({ _id: id, id }) || id;
    const items = getCart().filter((it) => getId(it) !== targetId);
    return saveCart(items);
    }

    export function clearCart() {
    return saveCart([]); // emit update so badge resets immediately
    }
