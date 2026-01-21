const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role, store: user.store },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      // message: "Login successful",
      token,
      role:user.role
      // user: {
      //   id: user._id,
      //   name: user.name,
      //   role: user.role,
      //   store: user.store
      // }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
