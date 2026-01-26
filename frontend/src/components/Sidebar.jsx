import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Add Stores", path: "/admin/stores" },
    { name: "See Stores", path: "/admin/dashboard/stores" },
    { name: "Add Employees", path: "/admin/employees" },
    { name: "See Employees", path: "/admin/employees" },
  ];

  return (
    <div style={sidebarStyle}>
      <h3 style={titleStyle}>Admin Panel</h3>

      <ul style={menuListStyle}>
        {menuItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);

          return (
            <li key={item.path}>
              <Link
                to={item.path}
                style={{
                  ...menuItemStyle,
                  ...(isActive ? activeMenuItemStyle : {}),
                }}
              >
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

/* ================= STYLES ================= */

const sidebarStyle = {
  width: "220px",
  backgroundColor: "#1e293b", // dark slate
  padding: "24px 16px",
  minHeight: "100vh",
  boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
};

const titleStyle = {
  color: "#fff",
  marginBottom: "24px",
  fontSize: "18px",
  fontWeight: "600",
  textAlign: "center",
};

const menuListStyle = {
  listStyle: "none",
  padding: 0,
  margin: 0,
};

const menuItemStyle = {
  display: "block",
  padding: "10px 14px",
  marginBottom: "8px",
  borderRadius: "8px",
  color: "#cbd5e1",
  textDecoration: "none",
  fontSize: "14px",
  transition: "all 0.2s ease",
};

const activeMenuItemStyle = {
  backgroundColor: "#2563eb",
  color: "#fff",
  fontWeight: "600",
};

export default Sidebar;

