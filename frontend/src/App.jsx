import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import EmployeeDashboard from "./pages/Employee/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";

// Admin Pages
import AdminLayout from "./pages/Admin/AdminLayout";
import AdminDashboard from "./pages/Admin/Dashboard";
import Stores from "./pages/Admin/Stores";
import DashboardStores from "./pages/Admin/DashboardStores";

import StorePage from "./pages/Admin/StorePage";

import Employees from "./pages/Admin/Employees";
import StoreDetails from "./pages/Admin/StoreDetails";

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
          {/* Dashboard */}
          <Route path="dashboard" element={<AdminDashboard />} />
          {/* <Route path="dashboard/stores" element={<StoreDetails />} /> */}

          <Route path="dashboard/stores" element={<DashboardStores />} />
          <Route path="store/:storeId" element={<StorePage />} />

          {/* Stores */}
          <Route path="stores" element={<Stores />} />
          <Route path="stores/:storeId" element={<StoreDetails />} />

          {/* Employees */}
          <Route path="employees" element={<Employees />} />
          <Route path="dashboard/employees" element={<Employees />} />


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
