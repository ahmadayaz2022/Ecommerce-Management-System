const express = require("express");
const router = express.Router();


const {
  createEmployee,
  getEmployee,
  deleteEmployee,
  editEmployee,
  employeeDashboard,
} = require("../controllers/employeeController");
const authMiddleware = require("../middleware/authMiddleware");
const { isSuperAdmin, isEmployee } = require("../middleware/roleMiddleware");

router.post("/", authMiddleware, isSuperAdmin, createEmployee);
router.get("/", authMiddleware, getEmployee);

router.delete("/:id", authMiddleware, isSuperAdmin, deleteEmployee);
router.put("/:id", authMiddleware, isSuperAdmin, editEmployee);

router.get("/dashboard", authMiddleware ,isEmployee, employeeDashboard);

module.exports = router;
