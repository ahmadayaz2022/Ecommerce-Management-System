import { useState, useEffect } from "react";
import axios from "../../api/axios";
import EmployeeForm from "./EmployeeForm";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [stores, setStores] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch employees
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/employees");
      setEmployees(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch stores
  const fetchStores = async () => {
    try {
      const res = await axios.get("/stores");
      setStores(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchStores();
  }, []);

  const openModal = (employee = null) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEmployee(null);
  };

  // Filter employees based on search
  const filteredEmployees = employees.filter(emp => 
    emp.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{
      padding: "30px",
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      minHeight: "100vh",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif"
    }}>
      {/* Header Section */}
      <div style={{
        marginBottom: "30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "20px"
      }}>
        <div>
          <h2 style={{
            margin: "0 0 8px 0",
            fontSize: "32px",
            fontWeight: "700",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
            👥 Employee Management
          </h2>
          <p style={{
            margin: 0,
            color: "#666",
            fontSize: "14px"
          }}>
            Manage your store employees efficiently
          </p>
        </div>

        <button
          onClick={() => openModal()}
          style={{
            padding: "14px 28px",
            backgroundColor: "#10b981",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            fontSize: "15px",
            fontWeight: "600",
            boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#059669";
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 6px 16px rgba(16, 185, 129, 0.4)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#10b981";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(16, 185, 129, 0.3)";
          }}
        >
          <span style={{ fontSize: "18px" }}>➕</span>
          Add Employee
        </button>
      </div>

      {/* Search Bar */}
      <div style={{ marginBottom: "25px" }}>
        <input
          type="text"
          placeholder="🔍 Search employees by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            maxWidth: "500px",
            padding: "14px 18px",
            fontSize: "15px",
            border: "2px solid #e5e7eb",
            borderRadius: "12px",
            outline: "none",
            transition: "all 0.3s ease",
            backgroundColor: "white",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#667eea";
            e.target.style.boxShadow = "0 0 0 4px rgba(102, 126, 234, 0.1)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#e5e7eb";
            e.target.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
          }}
        />
      </div>

      {/* Stats Card */}
      <div style={{
        backgroundColor: "white",
        borderRadius: "16px",
        padding: "20px",
        marginBottom: "25px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        display: "flex",
        gap: "30px",
        flexWrap: "wrap"
      }}>
        <div style={{ flex: "1", minWidth: "150px" }}>
          <div style={{ fontSize: "13px", color: "#888", fontWeight: "600", marginBottom: "6px" }}>
            TOTAL EMPLOYEES
          </div>
          <div style={{ fontSize: "28px", fontWeight: "700", color: "#667eea" }}>
            {employees.length}
          </div>
        </div>
        <div style={{ flex: "1", minWidth: "150px" }}>
          <div style={{ fontSize: "13px", color: "#888", fontWeight: "600", marginBottom: "6px" }}>
            TOTAL STORES
          </div>
          <div style={{ fontSize: "28px", fontWeight: "700", color: "#10b981" }}>
            {stores.length}
          </div>
        </div>
        <div style={{ flex: "1", minWidth: "150px" }}>
          <div style={{ fontSize: "13px", color: "#888", fontWeight: "600", marginBottom: "6px" }}>
            SEARCH RESULTS
          </div>
          <div style={{ fontSize: "28px", fontWeight: "700", color: "#f59e0b" }}>
            {filteredEmployees.length}
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div style={{
        backgroundColor: "white",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        overflow: "hidden"
      }}>
        {loading ? (
          <div style={{
            padding: "60px",
            textAlign: "center",
            color: "#888",
            fontSize: "16px"
          }}>
            ⏳ Loading employees...
          </div>
        ) : filteredEmployees.length === 0 ? (
          <div style={{
            padding: "60px",
            textAlign: "center",
            color: "#888",
            fontSize: "16px"
          }}>
            {searchTerm ? "🔍 No employees found matching your search" : "📝 No employees yet. Add your first employee!"}
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{
              width: "100%",
              borderCollapse: "collapse"
            }}>
              <thead>
                <tr style={{
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white"
                }}>
                  <th style={{
                    padding: "16px 20px",
                    textAlign: "left",
                    fontWeight: "600",
                    fontSize: "14px",
                    letterSpacing: "0.5px"
                  }}>
                    👤 NAME
                  </th>
                  <th style={{
                    padding: "16px 20px",
                    textAlign: "left",
                    fontWeight: "600",
                    fontSize: "14px",
                    letterSpacing: "0.5px"
                  }}>
                    📧 EMAIL
                  </th>
                  <th style={{
                    padding: "16px 20px",
                    textAlign: "left",
                    fontWeight: "600",
                    fontSize: "14px",
                    letterSpacing: "0.5px"
                  }}>
                    🏪 ASSIGNED STORE
                  </th>
                  <th style={{
                    padding: "16px 20px",
                    textAlign: "left",
                    fontWeight: "600",
                    fontSize: "14px",
                    letterSpacing: "0.5px"
                  }}>
                    ⚡ ACTIONS
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredEmployees.map((emp, index) => (
                  <tr
                    key={emp._id}
                    style={{
                      borderBottom: "1px solid #f0f0f0",
                      transition: "all 0.2s ease",
                      backgroundColor: index % 2 === 0 ? "#fafafa" : "white"
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = "#f3f4f6";
                      e.currentTarget.style.transform = "scale(1.01)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = index % 2 === 0 ? "#fafafa" : "white";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <td style={{
                      padding: "18px 20px",
                      fontSize: "15px",
                      color: "#333",
                      fontWeight: "500"
                    }}>
                      {emp.name}
                    </td>
                    <td style={{
                      padding: "18px 20px",
                      fontSize: "14px",
                      color: "#666"
                    }}>
                      {emp.email}
                    </td>
                    <td style={{
                      padding: "18px 20px",
                      fontSize: "14px"
                    }}>
                      <span style={{
                        backgroundColor: "#e0e7ff",
                        color: "#4f46e5",
                        padding: "6px 12px",
                        borderRadius: "8px",
                        fontSize: "13px",
                        fontWeight: "600"
                      }}>
                        {emp.store?.storeName || stores.find((store) => store._id === emp.store)?.storeName || "No Store"}
                      </span>
                    </td>
                    <td style={{
                      padding: "18px 20px",
                      display: "flex",
                      gap: "10px",
                      flexWrap: "wrap"
                    }}>
                      <button
                        onClick={() => openModal(emp)}
                        style={{
                          padding: "8px 16px",
                          backgroundColor: "#f59e0b",
                          color: "#fff",
                          border: "none",
                          borderRadius: "8px",
                          cursor: "pointer",
                          fontSize: "13px",
                          fontWeight: "600",
                          transition: "all 0.2s ease",
                          boxShadow: "0 2px 6px rgba(245, 158, 11, 0.3)"
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = "#d97706";
                          e.currentTarget.style.transform = "translateY(-2px)";
                          e.currentTarget.style.boxShadow = "0 4px 10px rgba(245, 158, 11, 0.4)";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor = "#f59e0b";
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow = "0 2px 6px rgba(245, 158, 11, 0.3)";
                        }}
                      >
                        ✏️ Edit
                      </button>

                      <button
                        onClick={async () => {
                          if (!window.confirm(`Delete ${emp.name}? This action cannot be undone.`)) return;
                          try {
                            await axios.delete(`/employees/${emp._id}`);
                            setEmployees(employees.filter((e) => e._id !== emp._id));
                          } catch (err) {
                            alert(err.response?.data?.message || "Delete failed");
                          }
                        }}
                        style={{
                          padding: "8px 16px",
                          backgroundColor: "#ef4444",
                          color: "#fff",
                          border: "none",
                          borderRadius: "8px",
                          cursor: "pointer",
                          fontSize: "13px",
                          fontWeight: "600",
                          transition: "all 0.2s ease",
                          boxShadow: "0 2px 6px rgba(239, 68, 68, 0.3)"
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = "#dc2626";
                          e.currentTarget.style.transform = "translateY(-2px)";
                          e.currentTarget.style.boxShadow = "0 4px 10px rgba(239, 68, 68, 0.4)";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor = "#ef4444";
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow = "0 2px 6px rgba(239, 68, 68, 0.3)";
                        }}
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <EmployeeForm
          employee={selectedEmployee}
          stores={stores}
          onClose={closeModal}
          onSaved={fetchEmployees}
        />
      )}
    </div>
  );
};

export default Employees;
