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
      store: storeId,
    });

    res.status(201).json({
      // message: "Employee created successfully",
      employee: {
        id: employee._id,
        name: employee.name,
        email: employee.email,
        store: employee.store,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

// Get all employee
exports.getEmployee = async (req, res) => {
  try {
    const employee = await User.find({});
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//deleteemployee

exports.deleteEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;

    // 1️⃣ Find employee user
    const employee = await User.findOne({
      _id: employeeId,
      role: "employee",
      createdBy: req.user._id, // ensure same super admin
    });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // 2️⃣ Delete employee
    await User.deleteOne({ _id: employeeId });

    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//editemployee
exports.editEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const { name, email, store } = req.body; // match backend field 'store'

    // Find employee by ID and role only
    const employee = await User.findOne({
      _id: employeeId,
      role: "employee",
    });

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    // Update fields
    employee.name = name;
    employee.email = email;
    employee.store = store; // must match frontend value

    await employee.save();

    res.json({
      message: "Employee updated successfully",
      employee,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};