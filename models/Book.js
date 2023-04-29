const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", BookSchema);
