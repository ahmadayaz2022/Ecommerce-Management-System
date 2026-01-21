const express = require("express");
const router = express.Router();

const { createEmployee } = require("../controllers/employeeController");
const authMiddleware = require("../middleware/authMiddleware");
const { isSuperAdmin } = require("../middleware/roleMiddleware");

router.post("/", authMiddleware, isSuperAdmin, createEmployee);

module.exports = router;
