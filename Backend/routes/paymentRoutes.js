import express from "express";
import Purchase from "../models/Purchase.js";

const router = express.Router();

/* Pabbly Webhook */
router.post("/webhook", async (req, res) => {
  const { userId, chapterId, paymentId } = req.body;

  await Purchase.create({
    userId,
    chapterId,
    paymentId,
    expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
  });

  res.json({ success: true });
});

export default router;
