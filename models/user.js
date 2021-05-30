const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    occupation: {
        type: String,
        required: true,
    },
    signupReason: {
      type: String,
      required: true,
  },
    isEmailVerified: {
        type: Boolean,
        required: true,
        default: false,
    },
    isApproved: {
        type: Boolean,
        required: true,
        default: false,
    },
    verificationToken: {
      type: String,
      default: null,
      select: false,
    },
    approvalToken: {
      type: String,
      default: null,
      select: false,
    },
    resetToken: {
      type: String,
      default: null,
      select: false,
    },
    resetTokenExpiry: {
      type: Date,
      default: null,
      select: false,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
