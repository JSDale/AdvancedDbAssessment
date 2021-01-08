const mongoose = require("mongoose");
const { Schema } = mongoose;

const quoteSchema = new Schema(
  {
    quote: { type: String, required: [true, 'quote is required'], unique: true }
  }
);
module.exports = mongoose.model("Quote", quoteSchema);