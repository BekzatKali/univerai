import mongoose, { Schema, models } from "mongoose";

const dataSchema = new Schema({
  userEmail: {
    type: String,
    ref: "User",
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  }
  
}, { timestamps: true });

const Data = models.Data || mongoose.model("Data", dataSchema);
export default Data;

