import { useState, useEffect } from "react";
import axios from "../../api/axios";

const StoreForm = ({ store, onClose, onSaved }) => {
  const [storeName, setName] = useState(store?.storeName || "");
  const [storeLocation, setLocation] = useState(store?.storeLocation || "");
  const [storeEmail, setEmail] = useState(store?.storeEmail || "");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (store?._id) {
        // Edit existing store
        await axios.put(`/stores/${store._id}`, {
          storeName,
          storeLocation,
          storeEmail,
        });
      } else {
        // Add new store
        await axios.post("/stores", { storeName, storeLocation, storeEmail });
      }
      onSaved(); // Refresh list
      onClose(); // Close modal
    } catch (err) {
      alert(err.response?.data?.message || "Save failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={modalStyle}>
      <h3>{store ? "Edit Store" : "Add Store"}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Store Name"
          value={storeName}
          onChange={(e) => setName(e.target.value)}
          required
          style={{
            width: "150px",
            height: "15px",
            fontSize: "16px",
            padding: "10px",
          }}
        />
        <br />
        <br />
        <input
          type="text"
          placeholder="Location"
          value={storeLocation}
          onChange={(e) => setLocation(e.target.value)}
          required
          style={{
            width: "150px",
            height: "15px",
            fontSize: "16px",
            padding: "10px",
          }}
        />
        <br />
        <br />
        <input
          type="text"
          placeholder="Email"
          value={storeEmail}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "150px",
            height: "15px",
            fontSize: "16px",
            padding: "10px",
          }}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>
        <button type="button" onClick={onClose} style={{ marginLeft: "10px" }}>
          Cancel
        </button>
      </form>
    </div>
  );
};

// Simple modal style
const modalStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "#E3E3E3",
  padding: "20px",
  boxShadow: "0 0 10px rgba(0,0,0,0.3)",
  zIndex: 1000,
};

export default StoreForm;
