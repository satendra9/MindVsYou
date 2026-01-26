import express from "express";
import Chapter from "../models/Chapter.js";
import Purchase from "../models/Purchase.js";
import authMiddleware from "../middleware/middleware.js";

const router = express.Router();

/* Get chapters */
router.get("/:section/:subject", async (req, res) => {
  const chapters = await Chapter.find(req.params);
  res.json(chapters);
});

/* Check access */
router.get("/access/:chapterId", authMiddleware, async (req, res) => {
  const purchase = await Purchase.findOne({
    userId: req.user.id,
    chapterId: req.params.chapterId,
    expiresAt: { $gt: new Date() },
  });

  if (!purchase) return res.status(403).json({ message: "No access" });

  const chapter = await Chapter.findById(req.params.chapterId);
  res.json({ driveLink: chapter.driveLink });
});

export default router;
