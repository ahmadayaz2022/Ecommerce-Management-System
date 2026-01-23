const Store = require("../models/Store");
const User = require("../models/User");

// Create Store (SuperAdmin only)
exports.createStore = async (req, res) => {
  try {
    const { storeName, storeLocation, storeEmail } = req.body;

    const store = await Store.create({
      storeName,
      storeLocation,
      storeEmail,
      createdBy: req.user.id, // super admin ID from auth middleware
    });

    res.status(201).json({
      storeName: store.storeName,
      storeLocation: store.storeLocation,
      storeEmail: store.storeEmail,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Stores for SuperAdmin
exports.getStores = async (req, res) => {
  try {
    const stores = await Store.find({ createdBy: req.user.id });
    res.json(stores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single Store by ID
exports.getStoreById = async (req, res) => {
  try {
    const store = await Store.findOne({
      _id: req.params.id,
      createdBy: req.user.id,
    });

    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    res.json(store);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Edit Store
exports.editStore = async (req, res) => {
  try {
    const storeId = req.params.id;
    const { storeName, storeLocation, storeEmail } = req.body;

    // 1️⃣ Find store owned by logged-in super admin
    const store = await Store.findOne({
      _id: storeId,
      createdBy: req.user.id,
    });

    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    // 2️⃣ Update fields
    store.storeName = storeName;
    store.storeLocation = storeLocation;
    store.storeEmail = storeEmail;

    // 3️⃣ Save updated store
    await store.save();

    res.json({
      message: "Store updated successfully",
      store,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Store
exports.deleteStore = async (req, res) => {
  try {
    const storeId = req.params.id;

    // 1️⃣ Find store owned by logged-in super admin
    const store = await Store.findOne({
      _id: storeId,
      createdBy: req.user.id,
    });

    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    // 2️⃣ Delete store
    await Store.deleteOne({ _id: storeId });

    await User.deleteMany({ store: storeId });



    res.json({ message: "Store deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
