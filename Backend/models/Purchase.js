// models/Purchase.js
import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",          // 🔥 THIS IS THE CONNECTION
    required: true,
  },
  chapterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chapter",
    required: true,
  },
  paymentId: String,
  expiresAt: Date,
}, { timestamps: true });

export default mongoose.model("Purchase", purchaseSchema);
