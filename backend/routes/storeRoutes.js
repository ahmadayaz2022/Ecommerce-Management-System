const express = require("express");
const router = express.Router();

const { createStore, getStores, deleteStore , editStore} = require("../controllers/storeController");
const authMiddleware = require("../middleware/authMiddleware");
const { isSuperAdmin } = require("../middleware/roleMiddleware");

router.post("/", authMiddleware, isSuperAdmin, createStore);
router.get("/", authMiddleware, isSuperAdmin, getStores);

router.delete("/:id", authMiddleware, isSuperAdmin, deleteStore);
router.put("/:id", authMiddleware, isSuperAdmin, editStore);


module.exports = router;
