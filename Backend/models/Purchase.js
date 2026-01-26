import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  chapterId: mongoose.Schema.Types.ObjectId,
  expiresAt: Date,
  paymentId: String,
});

export default mongoose.model("Purchase", purchaseSchema);
