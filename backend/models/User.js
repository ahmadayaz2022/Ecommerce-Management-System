
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  fathername: {
    type: String,
    required: false
  },
  dateOfBirth: {
    type: String,
    required: false
  },
  profilePicture: {
    type: String,
    required: false
  },
  nationality: {
    type: String,
    required: false
  },
  city: {
    type: String,
    required: false
  },
  cnic: {
    type: String,
    required: false
  },
  Religion: {
    type: String,
    required: false
  },
  PostalAddress: {
    type: String,
    required: false
  },
  PhoneNumber: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["superadmin", "employee"],
    default: "employee"
  },

  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store",
    default: null
  }

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
