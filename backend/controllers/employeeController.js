const User = require("../models/User");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");

exports.createEmployee = async (req, res) => {
  try {
    const {
      name,
      fathername,
      dateOfBirth,
      profilePicture,
      nationality,
      city,
      cnic,
      Religion,
      PostalAddress,
      PhoneNumber,
      email,
      password,
      storeId,
    } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Employee already exists" });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create employee
    const employee = await User.create({
      name,
      fathername,
      dateOfBirth,
      profilePicture,
      nationality,
      city,
      cnic,
      Religion,
      PostalAddress,
      PhoneNumber,
      email,
      password: hashedPassword,
      role: "employee",
      store: storeId,
    });

    // EMAIL CONTENT
    const emailContent = `
      <h2>Welcome to Our Ecomerce STORE</h2>
      <p>Hello <b>${name}</b>,</p>
      <p>Your employee account has been created, below is your Account detials</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Password:</b> ${password}</p>

      <p>FatherName: <b>${fathername}</b>,</p>
      <p><b>PhoneNumber: </b> ${PhoneNumber} </p>
      <p><b>StoreID: </b> ${storeId} </p>
      <p><b>COUNTRY: </b> ${city} </p>
      <p><b>CNIC: </b> ${cnic} </p>
      <p><b>postal Address: </b> ${PostalAddress} </p>
      <p><b>nationality: </b> ${nationality} </p>
      <p><b>dateOfBirth: </b> ${dateOfBirth} </p>
      <p><b>Religion: </b> ${Religion} </p>

      
      <p>Please Save your password after first login.</p>
      <br/>
      <p>Regards,<br/>Admin Team</p>
    `;
    // SEND EMAIL
    await sendEmail(email, "Employee Account Created", emailContent);
    res.status(201).json({
      message: "Employee created and email sent",
      employee: {
        id: employee._id,
        name: employee.name,
        email: employee.email,
        store: employee.store,
        fathername: employee.fathername,
        dateOfBirth: employee.dateOfBirth,
        profilePicture: employee.profilePicture,
        nationality: employee.nationality,
        city: employee.city,
        cnic: employee.cnic,
        Religion: employee.Religion,
        PostalAddress: employee.PostalAddress,
        PhoneNumber: employee.PhoneNumber,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

 
exports.editEmployee = async (req, res) => {
  try {
    const employee = await User.findOne({
      _id: req.params.id,
      role: "employee",
    });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const {
      name,
      fathername,
      dateOfBirth,
      profilePicture,
      nationality,
      city,
      cnic,
      Religion,
      PostalAddress,
      PhoneNumber,
      email,
      storeId,
    } = req.body;

    employee.name = name;
    employee.email = email;
    employee.store = storeId;
    employee.fathername = fathername;
    employee.dateOfBirth = dateOfBirth;
    employee.profilePicture = profilePicture;
    employee.nationality = nationality;
    employee.city = city;
    employee.cnic = cnic;
    employee.Religion = Religion;
    employee.PostalAddress = PostalAddress;
    employee.PhoneNumber = PhoneNumber;
  
    await employee.save();
    res.json({ message: "Employee updated successfully", employee });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getEmployee = async (req, res) => {
  try {
    const employee = await User.find({ role: "employee" });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;
    // 1️ Find employee user
    const employee = await User.findOne({
      _id: employeeId,
      role: "employee",
      createdBy: req.user._id, // ensure same super admin
    });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
  
    // 2️ Delete employee
    await User.deleteOne({ _id: employeeId });
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.employeeDashboard = async (req, res) => {
  try {
    // Find employee and populate store
    const employee = await User.findById(req.user.id).populate("store");

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({
      employee: {
        id: employee._id,
        name: employee.name,
        fathername: employee.fathername,
        dateOfBirth: employee.dateOfBirth,
        profilePicture: employee.profilePicture,
        email: employee.email,
        nationality: employee.nationality,
        city: employee.city,
        cnic: employee.cnic,
        Religion: employee.Religion,
        PostalAddress: employee.PostalAddress,
        PhoneNumber: employee.PhoneNumber,
      },
      store: employee.store
        ? {
            _id: employee.store._id,
            storeName: employee.store.storeName,
            storeLocation: employee.store.storeLocation,
            storeEmail: employee.store.storeEmail,
          }
        : null,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
