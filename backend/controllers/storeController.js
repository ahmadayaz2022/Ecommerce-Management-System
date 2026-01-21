const Store = require("../models/Store");

// Create store (SuperAdmin only)
exports.createStore = async (req, res) => {
  try {
    const { storeName,storeLocation, storeEmail } = req.body;

    const store = await Store.create({
      storeName,
      storeLocation,
      storeEmail,
      createdBy: req.user.id
    });

    res.status(201).json({
      // message: "Store created successfully",
      storeName: store.storeName,
      storeLocation: store.storeLocation,
      storeEmail: store.storeEmail
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all stores (SuperAdmin)
exports.getStores = async (req, res) => {
  try {
    const stores = await Store.find({ createdBy: req.user.id });
    res.json(stores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

