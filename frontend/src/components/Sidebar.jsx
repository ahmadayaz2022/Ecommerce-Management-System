import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Stores", path: "/admin/stores" },
    { name: "Employees", path: "/admin/employees" },
  ];

  return (
    <div style={sidebarStyle}>
      <h3>Admin Menu</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {menuItems.map(item => (
          <li key={item.path} style={{ margin: "10px 0" }}>
            <Link
              to={item.path}
              style={{
                color: location.pathname.startsWith(item.path) ? "#1976d2" : "#000",
                textDecoration: "none",
                fontWeight: location.pathname.startsWith(item.path) ? "bold" : "normal",
              }}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const sidebarStyle = {
  width: "200px",
  backgroundColor: "#f0f0f0",
  padding: "20px",
  minHeight: "100vh",
};

export default Sidebar;
