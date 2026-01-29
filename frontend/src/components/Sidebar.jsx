import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Store, 
  Eye, 
  Users,
  ChevronLeft, 
  ChevronRight
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Add Stores", path: "/admin/stores", icon: <Store size={20} /> },
    { name: "See Stores", path: "/admin/seeStores", icon: <Eye size={20} /> },
    { name: "See Employees", path: "/admin/seeEmployees", icon: <Users size={20} /> },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path);

  return (
    <div 
      style={{
        width: isCollapsed ? "80px" : "260px",
        backgroundColor: "#0f172a",
        minHeight: "100vh",
        padding: "24px 0",
        boxShadow: "4px 0 20px rgba(0, 0, 0, 0.3)",
        transition: "width 0.3s ease",
        flexShrink: 0,
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      {/* Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: isCollapsed ? "center" : "space-between",
        padding: "0 20px 24px",
        borderBottom: "1px solid #1e293b",
        marginBottom: "16px",
      }}>
        {!isCollapsed && (
          <h3 style={{
            color: "#ffffff",
            fontSize: "20px",
            fontWeight: "700",
            letterSpacing: "0.5px",
            margin: 0,
            whiteSpace: "nowrap",
            background: "linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Admin Panel
          </h3>
        )}
        <button
          onClick={toggleSidebar}
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            border: "none",
            borderRadius: "8px",
            color: "#cbd5e1",
            cursor: "pointer",
            padding: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease",
            minWidth: "36px",
            minHeight: "36px",
          }}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Menu Items */}
      <ul style={{
        listStyle: "none",
        padding: "0 12px",
        margin: 0,
      }}>
        {menuItems.map((item) => {
          const active = isActive(item.path);
          return (
            <li key={item.path} style={{ marginBottom: "8px" }}>
              <Link
                to={item.path}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  color: active ? "#60a5fa" : "#cbd5e1",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: active ? "600" : "500",
                  transition: "all 0.2s ease",
                  position: "relative",
                  overflow: "hidden",
                  backgroundColor: active ? "rgba(37, 99, 235, 0.15)" : "transparent",
                  justifyContent: isCollapsed ? "center" : "flex-start",
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
                    e.currentTarget.style.color = "#ffffff";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#cbd5e1";
                  }
                }}
              >
                <span style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: "24px",
                  color: "inherit",
                }}>
                  {item.icon}
                </span>
                {!isCollapsed && (
                  <span style={{
                    whiteSpace: "nowrap",
                    transition: "opacity 0.2s ease",
                  }}>
                    {item.name}
                  </span>
                )}
                {active && !isCollapsed && (
                  <span style={{
                    position: "absolute",
                    right: "12px",
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "#60a5fa",
                    boxShadow: "0 0 8px rgba(96, 165, 250, 0.6)",
                  }} />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
