const User = require("../models/User");
const bcrypt = require("bcryptjs");
// SuperAdmin creates employee
exports.createEmployee = async (req, res) => {
  try {
    const { name, email, password, storeId } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Employee already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const employee = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "employee",
      store: storeId 

    });

    res.status(201).json({
      message: "Employee created successfully",
      employee: {
        id: employee._id,
        name: employee.name,
        email: employee.email,
        store: employee.store,
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};
