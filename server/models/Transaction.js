import mongoose from "mongoose";
const { Schema } = mongoose;

const transactionSchema = new Schema({
  amount: Number,
  description: String,
  user_id: mongoose.Types.ObjectId,
  date: { type: Date, default: new Date() },
  createdAt: { type: Date, default: Date.now },
});

// ✅ Check if model already exists to prevent OverwriteModelError
export default mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema);
