import { useState, useEffect } from "react";
import axios from "../../api/axios";

const EmployeeDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get("/employees/dashboard");
        setDashboardData(res.data);
      } catch (err) {
        console.log(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        Loading dashboard...
      </div>
    );
  }

  const employee = dashboardData?.employee;
  const store = dashboardData?.store;

  return (
    <div
      style={{
        padding: "30px",
        background: "linear-gradient(#E3E3E3)",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #667eea, #764ba2)",
          padding: "30px",
          borderRadius: "20px",
          color: "#fff",
          display: "flex",
          gap: "20px",
          alignItems: "center",
        }}
      >
<img
  src={employee.profilePicture || "/default-avatar.png"}
  alt="Profile"
  style={{ width: "80px", height: "80px", borderRadius: "50%" }}
/>
        <div>
          <h1 style={{ margin: 0 }}>Welcome, {employee?.name}</h1>
          <p style={{ margin: 0, opacity: 0.9 }}>
            {store ? store.storeName : "No store assigned"}
          </p>
        </div>
      </div>

      {/* Store Info */}
      {store && (
        <div style={cardStyle}>
          <h2>🏪 Store Details</h2>
          <p><b>Name:</b> {store.storeName}</p>
          <p><b>Location:</b> {store.storeLocation}</p>
          <p><b>Email:</b> {store.storeEmail}</p>
        </div>
      )}

      {/* Employee Info */}
      {employee && (
        <div style={cardStyle}>
          <h2>👤 My Details</h2>

          <div style={gridStyle}>
            <Info label="Name" value={employee.name} />
            <Info label="Father Name" value={employee.fathername} />
            <Info label="Date of Birth" value={employee.dateOfBirth} />
            <Info label="Email" value={employee.email} />
            <Info label="Phone" value={employee.PhoneNumber} />
            <Info label="Nationality" value={employee.nationality} />
            <Info label="City" value={employee.city} />
            <Info label="CNIC" value={employee.cnic} />
            <Info label="Religion" value={employee.Religion} />
            <Info label="Postal Address" value={employee.PostalAddress} />
          </div>
        </div>
      )}
    </div>
  );
};

const Info = ({ label, value }) => (
  <div
    style={{
      background: "#f9fafb",
      padding: "15px",
      borderRadius: "10px",
      border: "1px solid #e5e7eb",
    }}
  >
    <div style={{ fontSize: "13px", color: "#6b7280" }}>{label}</div>
    <div style={{ fontWeight: "600" }}>{value || "—"}</div>
  </div>
);

const cardStyle = {
  background: "white",
  marginTop: "30px",
  padding: "25px",
  borderRadius: "20px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "15px",
};

export default EmployeeDashboard;
