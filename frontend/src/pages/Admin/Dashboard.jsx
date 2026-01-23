import { Link, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
        padding: "40px",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "40px" }}>
        <h1 style={{ color: "#1f2937", marginBottom: "8px" }}>
          Welcome, Super Admin 👋
        </h1>
        <p style={{ color: "#6b7280" }}>
          Choose what you want to manage
        </p>
      </div>

      {/* Action Circles */}
      <div
        style={{
          display: "flex",
          gap: "40px",
          justifyContent: "center",
          marginBottom: "50px",
          flexWrap: "wrap",
        }}
      >
        {/* Stores */}
        <Link
          to="stores"
          style={{
            textDecoration: "none",
          }}
        >
          <div
            style={{
              width: "180px",
              height: "180px",
              borderRadius: "50%",
              backgroundColor: "#4f46e5",
              color: "#fff",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              fontWeight: "600",
              boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
              cursor: "pointer",
              transition: "transform 0.2s ease",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            <div style={{ fontSize: "40px", marginBottom: "10px" }}>🏪</div>
            Stores
          </div>
        </Link>

        {/* Employees */}
        <Link
          to="employees"
          style={{
            textDecoration: "none",
          }}
        >
          <div
            style={{
              width: "180px",
              height: "180px",
              borderRadius: "50%",
              backgroundColor: "#10b981",
              color: "#fff",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              fontWeight: "600",
              boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
              cursor: "pointer",
              transition: "transform 0.2s ease",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            <div style={{ fontSize: "40px", marginBottom: "10px" }}>👤</div>
            Employees
          </div>
        </Link>
      </div>

      {/* Nested Pages (Stores / Employees will appear below) */}
      <Outlet />
    </div>
  );
};

export default AdminDashboard;
