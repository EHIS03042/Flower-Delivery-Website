    // ✅ paymentRoutes.js
    const express = require("express");
    const Stripe = require("stripe");
    const router = express.Router();

    // ✅ Initialize Stripe with your secret key from .env
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    router.post("/create-checkout-session", async (req, res) => {
    try {
        const { items } = req.body;

        // ✅ Validate request
        if (!items || !Array.isArray(items)) {
        return res.status(400).json({ error: "Invalid cart items" });
        }

        // ✅ Build Stripe line items (required for checkout.sessions.create)
        const lineItems = items.map((item) => ({
        price_data: {
            currency: "usd", // ✅ currency defined per item
            product_data: {
            name: item.name,
            images: item.image ? [item.image] : [], // optional image array
            },
            unit_amount: item.price * 100, // ✅ convert dollars → cents
        },
        quantity: item.quantity || 1,
        }));

        // ✅ Create a checkout session
        const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"], // ✅ required
        mode: "payment", // ✅ one-time payment mode
        line_items: lineItems, // ✅ array of products
        success_url: `${process.env.CLIENT_URL}/?payment=success`, // ✅ redirect URL on success
        cancel_url: `${process.env.CLIENT_URL}/checkout?payment=failed`, // ✅ redirect URL on cancel
        });

        // ✅ Respond with Stripe-hosted checkout page URL
        res.json({ url: session.url });
    } catch (error) {
        console.error("❌ Stripe Checkout Error:", error.message);
        res.status(500).json({ error: error.message });
    }
    });

    module.exports = router;
