const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

const CHANGE_PASSWORD = false; // 🔥 set true ONLY when you want to change password
const NEW_PASSWORD = "ahmad111"; // 👈 change password here

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const adminExists = await User.findOne({ role: "superadmin" });

    // Normal behavior (no change)
    if (adminExists && !CHANGE_PASSWORD) {
      console.log("SuperAdmin already exists");
      process.exit();
    }

    // Manual password change
    if (adminExists && CHANGE_PASSWORD) {
      adminExists.password = await bcrypt.hash(NEW_PASSWORD, 10);
      await adminExists.save();

      console.log("✅ SuperAdmin password changed");
      process.exit();
    }

    // 🆕 First-time creation
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
