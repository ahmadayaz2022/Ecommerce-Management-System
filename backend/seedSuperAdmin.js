const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("../models/User");


mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const adminExists = await User.findOne({ role: "superadmin" });

    if (adminExists) {
      console.log("SuperAdmin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("123456", 10);

    await User.create({
      name: "Super Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "superadmin"
    });

    console.log("SuperAdmin created successfully");
    process.exit();
  })
  .catch(err => console.log(err));
