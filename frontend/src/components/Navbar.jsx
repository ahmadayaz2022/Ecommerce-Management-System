import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ title }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    //  match your app auth logic
    localStorage.removeItem("token");
    localStorage.removeItem("role");
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
    height: "85px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 28px",
    background: "linear-gradient(90deg, #1e3a8a, #2563eb)",
    color: "#ffffff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  },

  title: {
    fontSize: "25px",
    fontWeight: "800",
    margin: 0,
    letterSpacing: "0.4px",
  },

  logoutBtn: {
    backgroundColor: "#ffffff",
    color: "#dc2626",
    border: "none",
    padding: "10px 22px",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    gap: "8px",

  },



};

export default Navbar;

