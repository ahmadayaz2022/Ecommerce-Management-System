import { useState, useEffect } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

const EmployeeDashboard = () => {
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch assigned store
  const fetchStore = async () => {
    try {
      const res = await axios.get("/employee/store"); // API: returns assigned store
      setStore(res.data);
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStore();
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  if (loading) return <p>Loading your store...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Employee Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {store ? (
        <div style={{ marginTop: "40px" }}>
          <h2>Your Store</h2>
          <p><strong>Name:</strong> {store.name}</p>
          <p><strong>Location:</strong> {store.location}</p>
          <p><strong>Number of Employees:</strong> {store.employees?.length || 0}</p>
        </div>
      ) : (
        <p>You are not assigned to any store.</p>
      )}
    </div>
  );
};

export default EmployeeDashboard;
