const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    street: { type: String, default: null, required: true },
    house_no: { type: String, default: null, required: true },
    delivery_instruction: { type: String, default: null },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("Address", schema);
