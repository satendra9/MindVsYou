import express from "express";
import Chapter from "../models/Chapter.js";
import Purchase from "../models/Purchase.js";
import authMiddleware from "../middleware/middleware.js";
import optionalAuth from "../middleware/optionalAuth.js";

const router = express.Router();

/* Get chapters */
/* Check access — MUST COME FIRST */
router.get("/access/:chapterId", authMiddleware, async (req, res) => {
  const purchase = await Purchase.findOne({
    userId: req.user.id,
    chapterId: req.params.chapterId,
    expiresAt: { $gt: new Date() },
  });

  if (!purchase) {
    return res.status(403).json({ message: "No access" });
  }

  const chapter = await Chapter.findById(req.params.chapterId);
  res.json({ driveLink: chapter.driveLink });
});

/* Get chapters — ALWAYS LAST */
router.get("/:section/:subject", optionalAuth, async (req, res) => {
  const { section, subject } = req.params;

  const chapters = await Chapter.find({ section, subject });

  let purchasedIds = [];

  if (req.user) {
    const purchases = await Purchase.find({
      userId: req.user.id,
    });

    purchasedIds = purchases.map(p => p.chapterId.toString());
  }

  const updatedChapters = chapters.map(ch => ({
    ...ch.toObject(),
    isPurchased: purchasedIds.includes(ch._id.toString()),
  }));

  res.json(updatedChapters);
});


export default router;
