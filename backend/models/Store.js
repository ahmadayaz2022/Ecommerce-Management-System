const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
  storeName: {
    type: String,
    required: true
  },
  storeLocation: {
    type: String
  },
  storeEmail: {
    type: String
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Store", storeSchema);
