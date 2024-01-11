import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    googleId: String,
    displayName: String,
    email: String,
    image: String,
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);

export default User;
