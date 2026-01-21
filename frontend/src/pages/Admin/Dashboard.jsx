import { Link, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <div style={{ width: "200px", background: "#f0f0f0", padding: "20px" }}>
        <h3>Admin Menu</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li><Link to="stores">Stores</Link></li>
          <li><Link to="employees">Employees</Link></li>
        </ul>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        <h1>Welcome, Super Admin</h1>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
