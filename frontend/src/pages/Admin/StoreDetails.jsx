import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import EmployeeForm from "./EmployeeForm";

const StoreDetails = () => {
  const { storeId } = useParams(); // get store ID from URL
  const [store, setStore] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Fetch store details and employees
  const fetchStoreDetails = async () => {
    try {
      setLoading(true);

      // 1️⃣ Get store info
      const storeRes = await axios.get(`/stores/${storeId}`);
      setStore(storeRes.data);

      // 2️⃣ Get all employees
      const empRes = await axios.get("/employees");
      // filter employees of this store
      const storeEmployees = empRes.data.filter((emp) => emp.store === storeId);
//       const storeEmployees = res.data.filter(
//   emp => emp.store && emp.store._id === id
// );

      setEmployees(storeEmployees);
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStoreDetails();
  }, [storeId]);

  const openModal = (employee = null) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEmployee(null);
  };

  if (loading)
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>Loading store...</p>
    );

  if (!store)
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>Store not found.</p>
    );

  return (
    <div style={{ padding: "20px" }}>
      {/* Store Header */}
      <h1 style={{ marginBottom: "10px", color: "#1f2937" }}>
        {store.storeName} - Employees
      </h1>
      <p style={{ marginBottom: "20px", color: "#6b7280" }}>
        Location: {store.storeLocation || "N/A"} | Email:{" "}
        {store.storeEmail || "N/A"}
      </p>

      {/* Add Employee Button */}
      <button
        onClick={() => openModal()}
        style={{
          padding: "10px 20px",
          marginBottom: "20px",
          backgroundColor: "#4f46e5",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#4338ca")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4f46e5")}
      >
        Add Employee
      </button>

      {/* Employees Table */}
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "#fff",
            boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
            borderRadius: "10px",
          }}
        >
          <thead style={{ backgroundColor: "#f3f4f6", color: "#374151" }}>
            <tr>
              <th style={{ padding: "12px", textAlign: "left" }}>Name</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Email</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr
                key={emp._id}
                style={{
                  borderBottom: "1px solid #e5e7eb",
                  transition: "background-color 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f9fafb")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#fff")
                }
              >
                <td style={{ padding: "12px" }}>{emp.name}</td>
                <td style={{ padding: "12px" }}>{emp.email}</td>
                <td style={{ padding: "12px", display: "flex", gap: "10px" }}>
                  <button
                    onClick={() => openModal(emp)}
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "#f59e0b",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = "#d97706")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "#f59e0b")
                    }
                  >
                    Edit
                  </button>
                  <button
                    onClick={async () => {
                      if (!window.confirm("Delete this employee?")) return;
                      await axios.delete(`/employees/${emp._id}`);
                      setEmployees(employees.filter((e) => e._id !== emp._id));
                    }}
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "#ef4444",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = "#b91c1c")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "#ef4444")
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Employee Modal */}
      {showModal && (
        <EmployeeForm
          employee={selectedEmployee}
          stores={[store]} // only this store
          onClose={closeModal}
          onSaved={fetchStoreDetails}
        />
      )}
    </div>
  );
};

export default StoreDetails;
