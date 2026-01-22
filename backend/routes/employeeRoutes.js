const express = require("express");
const router = express.Router();

const { createEmployee , getEmployee, deleteEmployee, editEmployee } = require("../controllers/employeeController");
const authMiddleware = require("../middleware/authMiddleware");
const { isSuperAdmin } = require("../middleware/roleMiddleware");


router.post("/", authMiddleware, isSuperAdmin, createEmployee);
router.get("/", authMiddleware,  getEmployee);

router.delete("/:id", authMiddleware, isSuperAdmin, deleteEmployee);
router.put("/:id", authMiddleware, isSuperAdmin, editEmployee);



module.exports = router;
