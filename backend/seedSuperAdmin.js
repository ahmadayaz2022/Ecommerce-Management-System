const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

const CHANGE_PASSWORD = false; // 🔥 set true ONLY when changing password
const CHANGE_EMAIL = false;    // 🔥 set true ONLY when changing email

const NEW_PASSWORD = "ahmad123";
const NEW_EMAIL = "admin123@gmail.com";

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    const admin = await User.findOne({ role: "superadmin" });

    // ❌ SuperAdmin not found → create first time
    if (!admin) {
      const hashedPassword = await bcrypt.hash("123456", 10);

      await User.create({
        name: "Super Admin",
        email: "admin@gmail.com",
        password: hashedPassword,
        role: "superadmin",
      });

      console.log("✅ SuperAdmin created successfully");
      process.exit();
    }

    // 🟡 Update operations
    let updated = false;

    if (CHANGE_PASSWORD) {
      admin.password = await bcrypt.hash(NEW_PASSWORD, 10);
      updated = true;
      console.log("🔐 Password updated");
    }

    if (CHANGE_EMAIL) {
      admin.email = NEW_EMAIL;
      updated = true;
      console.log("📧 Email updated");
    }

    if (!updated) {
      console.log("ℹ️ No changes requested");
    } else {
      await admin.save();
      console.log("✅ SuperAdmin updated successfully");
    }

    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
