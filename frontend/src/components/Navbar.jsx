import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ title }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav style={navStyle}>
      <h2>{title}</h2>
      <button onClick={handleLogout} style={buttonStyle}>Logout</button>
    </nav>
  );
};

const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 20px",
  backgroundColor: "#1976d2",
  color: "#fff",
};

const buttonStyle = {
  backgroundColor: "#fff",
  color: "#1976d2",
  border: "none",
  padding: "5px 10px",
  borderRadius: "5px",
  cursor: "pointer",
};

export default Navbar;
