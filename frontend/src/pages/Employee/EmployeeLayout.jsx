import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";

const EmployeeLayout = () => {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)"
    }}>
      <Navbar title="Employee Portal" />
      <Outlet />
    </div>
  );
};

export default EmployeeLayout;
