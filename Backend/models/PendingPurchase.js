import mongoose from "mongoose";

const pendingPurchaseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  chapterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chapter",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 900 // auto-delete after 15 minutes
  }
});

export default mongoose.model("PendingPurchase", pendingPurchaseSchema);
