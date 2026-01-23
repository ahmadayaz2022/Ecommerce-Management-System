import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ title }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // ✅ match your app auth logic
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <nav style={styles.navbar}>
      <h2 style={styles.title}>{title}</h2>

      <button onClick={handleLogout} style={styles.logoutBtn}>
        Logout
      </button>
    </nav>
  );
};

const styles = {
  navbar: {
    height: "60px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 24px",
    backgroundColor: "#1976d2",
    color: "#ffffff",
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
  },

  title: {
    fontSize: "20px",
    fontWeight: "600",
    margin: 0,
  },

  logoutBtn: {
    backgroundColor: "#ffffff",
    color: "#1976d2",
    border: "none",
    padding: "6px 14px",
    borderRadius: "6px",
    fontSize: "14px",
    cursor: "pointer",
    transition: "0.2s ease",
  },
};

export default Navbar;
