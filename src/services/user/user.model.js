const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    first_name: { type: String, default: null },
    last_name: { type: String, default: null },
    email: { type: String, sparse: true, required: true },
    password: { type: String, required: true, select: false },
    phone: { type: Number, default: null },
    type: {
      type: String,
      enum: ["user", "seller", "picker", "deliver"],
      default: "user",
    },
    notification: {
      push_notification: {
        type: Boolean,
        default: true,
      },
      sms: {
        type: Boolean,
        default: true,
      },
      email_notification: {
        type: Boolean,
        default: true,
      },
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("User", schema);
