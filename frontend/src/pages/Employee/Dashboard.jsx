import { useState, useEffect } from "react";
import axios from "../../api/axios";

const EmployeeDashboard = () => {
  const [store, setStore] = useState(null);
  const [employeeName, setEmployeeName] = useState("Employee");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get("/employees/dashboard");
        setStore(res.data.store || null);
        setEmployeeName(res.data.employee?.name || "Employee");
      } catch (err) {
        console.log(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <p>Loading your dashboard...</p>;

  return (
    <div style={{ padding: "20px" }}>
      {/* Only show welcome and store info */}
      <h2>Welcome, {employeeName}! to {store.storeName}</h2>

      {store ? (
        <div style={{ marginTop: "40px" }}>
          <h2>Your Store</h2>
          <p><strong>Name:</strong> {store.storeName}</p>
          <p><strong>Location:</strong> {store.storeLocation}</p>
          <p><strong>Email:</strong> {store.storeEmail}</p>
        </div>
      ) : (
        <p style={{ marginTop: "20px" }}>You are not assigned to any store.</p>
      )}
    </div>
  );
};

export default EmployeeDashboard;
