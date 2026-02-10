import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import Purchase from "../models/Purchase.js";
import User from "../models/UserRoute.js";
import PendingPurchase from "../models/PendingPurchase.js";
import Chapter from "../models/Chapter.js";
import { sendMail } from "../utils/sendMail.js";
import { purchaseMailTemplate } from "../utils/purchaseMailTemplate.js";



const router = express.Router();

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// 1️⃣ Create order
router.post("/create-order", async (req, res) => {
  const { userId, chapterId, amount } = req.body;

  if (!userId || !chapterId || !amount) {
    return res.status(400).json({ error: "Missing data" });
  }

  await PendingPurchase.create({ userId, chapterId });

  const options = {
  amount: amount * 100,
  currency: "INR",
  receipt: `receipt_${Date.now()}`,
  notes: {
    userId,
    chapterId,
  },
};


  const order = await razorpay.orders.create(options);

  res.json(order); // send order info to frontend
});

// 2️⃣ Verify payment & save purchase
router.post("/verify", async (req, res) => {
  const {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    chapterId,
    userId,
  } = req.body;

  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generated_signature !== razorpay_signature) {
    return res.status(400).json({ error: "Invalid signature" });
  }

  const chapter = await Chapter.findById(chapterId);
  const user = await User.findById(userId);

  // Save purchase
  await Purchase.create({
    userId,
    chapterId,
    paymentId: razorpay_payment_id,
    expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
  });

  await PendingPurchase.deleteOne({ userId, chapterId });

  console.log("📩 Preparing to send email...");
  console.log("User email:", user.email);
  console.log("Drive link:", chapter.driveLink);


  // 📧 SEND EMAIL
  await sendMail({
  to: user.email,
  subject: `Your ${chapter.title} Notes – MindvsYou Learning`,
  html: purchaseMailTemplate({
    name: user.name,                 // "Gulshan"
    className: "Class 12",
    subject: chapter.subject,        // "Physics"
    driveLink: chapter.driveLink,
  }),
});


  res.json({ success: true });
});


// 3️⃣ Webhook (optional but recommended)
router.post("/webhook", async (req, res) => {
  // Razorpay will call this for events like payment.captured
  const signature = req.headers["x-razorpay-signature"];
  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
    .update(JSON.stringify(req.body))
    .digest("hex");

  if (signature !== generated_signature) return res.sendStatus(400);

  const event = req.body;

  if (event.event === "payment.captured") {
    const payment = event.payload.payment.entity;
    const pending = await PendingPurchase.findOne({ userId: payment.notes.userId, chapterId: payment.notes.chapterId });
    if (!pending) return res.sendStatus(200);

    await Purchase.create({
      userId: pending.userId,
      chapterId: pending.chapterId,
      paymentId: payment.id,
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    });

    await PendingPurchase.deleteOne({ _id: pending._id });
  }

  res.sendStatus(200);
});

export default router;
