import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import EmployeeDashboard from "./pages/Employee/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";

// Admin Pages
import AdminLayout from "./pages/Admin/AdminLayout";
import AdminDashboard from "./pages/Admin/Dashboard";
import Stores from "./pages/Admin/Stores";
import Employees from "./pages/Admin/Employees";

// Employee Pages
import EmployeeLayout from "./pages/Employee/EmployeeLayout";

function App() {
  return (
    <Router>
      <Routes>
        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute role="superadmin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="stores" element={<Stores />} />
          <Route path="employees" element={<Employees />} />
        </Route>

        {/* Employee Routes */}
        <Route
          path="/employee/*"
          element={
            <ProtectedRoute role="employee">
              <EmployeeLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<EmployeeDashboard />} />
        </Route>

        {/* Default */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
