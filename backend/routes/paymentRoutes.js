import express from "express";
import Stripe from "stripe";
import orderModel from "../models/orderModel.js";

const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", async (req, res) => {
  try {
    const { cartItems, userId, amount } = req.body;

    const line_items = cartItems.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL.replace(/\/$/, '')}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL.replace(/\/$/, '')}/cart`,
    });

    // Order pehle save karo pending status ke saath
    const order = new orderModel({
      userId,
      items: cartItems,
      amount,
      paymentStatus: "Pending",
      sessionId: session.id,
    });

    await order.save();

    res.json({ url: session.url });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Payment verify karo aur order update karo
router.post("/verify", async (req, res) => {
  try {
    const { sessionId } = req.body;

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      await orderModel.findOneAndUpdate(
        { sessionId },
        { paymentStatus: "Paid" }
      );
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;