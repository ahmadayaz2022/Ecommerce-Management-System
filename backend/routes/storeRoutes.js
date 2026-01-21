const express = require("express");
const router = express.Router();

const { createStore, getStores } = require("../controllers/storeController");
const authMiddleware = require("../middleware/authMiddleware");
const { isSuperAdmin } = require("../middleware/roleMiddleware");

router.post("/", authMiddleware, isSuperAdmin, createStore);
router.get("/", authMiddleware, isSuperAdmin, getStores);

module.exports = router;
