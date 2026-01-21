import { useState, useEffect } from "react";
import axios from "../../api/axios";

const EmployeeForm = ({ employee, stores, onClose, onSaved }) => {
  const [name, setName] = useState(employee?.name || "");
  const [email, setEmail] = useState(employee?.email || "");
  const [password, setPassword] = useState(""); // Only for new employee or reset
  const [storeId, setStoreId] = useState(employee?.store?._id || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (employee?._id) {
        await axios.put(`/employees/${employee._id}`, { name, email, storeId });
      } else {
        await axios.post("/employees", { name, email, password, storeId });
      }
      onSaved();
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || "Save failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={modalStyle}>
      <h3>{employee ? "Edit Employee" : "Add Employee"}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br /><br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br /><br />
        {!employee && (
          <>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <br /><br />
          </>
        )}
        <select value={storeId} onChange={(e) => setStoreId(e.target.value)} required>
          <option value="">Select Store</option>
          {stores.map(store => (
            <option key={store._id} value={store._id}>{store.name}</option>
          ))}
        </select>
        <br /><br />
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

const modalStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "#fff",
  padding: "20px",
  boxShadow: "0 0 10px rgba(0,0,0,0.3)",
  zIndex: 1000,
};

export default EmployeeForm;
