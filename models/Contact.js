import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 60,
    },
    email: {
      type: String,
      required: true,
    },
    mobNo: {
      type: String,
      required: true,
      maxLength: 10,
      minLength: 10,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Contact ||
  mongoose.model("Contact", ContactSchema);
