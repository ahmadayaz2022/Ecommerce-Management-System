import { useState, useEffect } from "react";
import axios from "../../api/axios";

const EmployeeForm = ({ employee, stores, onClose, onSaved }) => {
  const [formData, setFormData] = useState({
    name: "",
    fathername: "",
    dateOfBirth: "",
    profilePicture: "",
    nationality: "",
    city: "",
    cnic: "",
    Religion: "",
    PostalAddress: "",
    PhoneNumber: "",
    email: "",
    password: "",
    storeId: "",
  });

  const [loading, setLoading] = useState(false);

  // Fill form when editing
  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name || "",
        fathername: employee.fathername || "",
        dateOfBirth: employee.dateOfBirth || "",
        profilePicture: employee.profilePicture || "",
        nationality: employee.nationality || "",
        city: employee.city || "",
        cnic: employee.cnic || "",
        Religion: employee.Religion || "",
        PostalAddress: employee.PostalAddress || "",
        PhoneNumber: employee.PhoneNumber || "",
        email: employee.email || "",
        password: "",
        storeId: employee.store || "",
      });
    } else {
      setFormData({
        name: "",
        fathername: "",
        dateOfBirth: "",
        profilePicture: "",
        nationality: "",
        city: "",
        cnic: "",
        Religion: "",
        PostalAddress: "",
        PhoneNumber: "",
        email: "",
        password: "",
        storeId: "",
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (employee?._id) {
        // EDIT
        await axios.put(`/employees/${employee._id}`, formData);
      } else {
        // CREATE
        await axios.post("/employees", formData);
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

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "8px" }}
      >
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="fathername"
          placeholder="Father Name"
          value={formData.fathername}
          onChange={handleChange}
        />
        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
        />

        {/* <input name="profilePicture" placeholder="Profile Picture URL" value={formData.profilePicture} onChange={handleChange} /> */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
              setFormData({
                ...formData,
                profilePicture: reader.result, // base64
              });
            };
            reader.readAsDataURL(file);
          }}
        />

        <input
          name="nationality"
          placeholder="Nationality"
          value={formData.nationality}
          onChange={handleChange}
        />

        <input
          name="city"
          placeholder="Country"
          value={formData.city}
          onChange={handleChange}
        />
        <input
          name="cnic"
          placeholder="CNIC"
          value={formData.cnic}
          onChange={handleChange}
        />
        <input
          name="Religion"
          placeholder="Religion"
          value={formData.Religion}
          onChange={handleChange}
        />
        <input
          name="PostalAddress"
          placeholder="Postal Address"
          value={formData.PostalAddress}
          onChange={handleChange}
        />
        <input
          name="PhoneNumber"
          placeholder="Phone Number"
          value={formData.PhoneNumber}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        {!employee && (
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        )}

        <select
          name="storeId"
          value={formData.storeId}
          onChange={handleChange}
          required
        >
          <option value="">Select Store</option>
          {stores.map((store) => (
            <option key={store._id} value={store._id}>
              {store.storeName}
            </option>
          ))}
        </select>

        <div style={{ marginTop: "10px" }}>
          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            onClick={onClose}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        </div>
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
  boxShadow: "0 0 15px rgba(0,0,0,0.3)",
  zIndex: 1000,
  width: "320px",
};

export default EmployeeForm;
