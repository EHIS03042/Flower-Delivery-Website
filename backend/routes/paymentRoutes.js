    // backend/routes/paymentRoutes.js
    import express from "express";
    import Stripe from "stripe";
    const router = express.Router();

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    router.post("/create-checkout-session", async (req, res) => {
    const { items } = req.body;

    const session = await stripe.paymentIntents.create({
        amount: items.reduce((acc, item) => acc + item.price * 100, 0), // convert to cents
        currency: "usd",
        automatic_payment_methods: { enabled: true },
    });

    res.json({ clientSecret: session.client_secret });
    });

    export default router;
