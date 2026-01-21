import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";

const EmployeeLayout = () => {
  return (
    <div>
      <Navbar title="Employee Dashboard" />
      <div style={{ padding: "20px" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default EmployeeLayout;
