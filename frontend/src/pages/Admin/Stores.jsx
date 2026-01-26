import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import StoreForm from "./StoreForm";

const Stores = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch stores and employee counts
  const fetchStores = async () => {
    try {
      setLoading(true);
      // Fetch all stores
      const res = await axios.get("/stores");
      const storesData = res.data;

      // Fetch all employees
      const empRes = await axios.get("/employees");
      const allEmployees = empRes.data;

      // Attach employees array for each store
      const storesWithEmployees = storesData.map((store) => ({
        ...store,
        employees: allEmployees.filter((emp) => {
          // Handle both populated store object and string ID
          const empStoreId = typeof emp.store === 'object' ? emp.store?._id : emp.store;
          return empStoreId === store._id || String(empStoreId) === String(store._id);
        }),
      }));

      setStores(storesWithEmployees);
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const openModal = (store = null) => {
    setSelectedStore(store);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedStore(null);
  };

  // Filter stores based on search
  const filteredStores = stores.filter(store => 
    store.storeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.storeLocation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.storeEmail?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "18px",
        color: "#888"
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: "60px",
            height: "60px",
            border: "4px solid #f3f4f6",
            borderTop: "4px solid #667eea",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "0 auto 20px"
          }}></div>
          <style>
            {`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}
          </style>
          Loading stores...
        </div>
      </div>
    );
  }

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
            🏪 Store Management
          </h2>
          <p style={{
            margin: 0,
            color: "#666",
            fontSize: "14px"
          }}>
            Manage all your stores in one place
          </p>
        </div>

        <button
          onClick={() => openModal()}
          style={{
            padding: "14px 28px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            fontSize: "15px",
            fontWeight: "600",
            boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 6px 16px rgba(102, 126, 234, 0.4)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(102, 126, 234, 0.3)";
          }}
        >
          <span style={{ fontSize: "18px" }}>➕</span>
          Add Store
        </button>
      </div>

      {/* Search Bar */}
      <div style={{ marginBottom: "25px" }}>
        <input
          type="text"
          placeholder="🔍 Search stores by name, location or email..."
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
            TOTAL STORES
          </div>
          <div style={{ fontSize: "28px", fontWeight: "700", color: "#667eea" }}>
            {stores.length}
          </div>
        </div>
        <div style={{ flex: "1", minWidth: "150px" }}>
          <div style={{ fontSize: "13px", color: "#888", fontWeight: "600", marginBottom: "6px" }}>
            TOTAL EMPLOYEES
          </div>
          <div style={{ fontSize: "28px", fontWeight: "700", color: "#10b981" }}>
            {stores.reduce((sum, store) => sum + (store.employees?.length || 0), 0)}
          </div>
        </div>
        <div style={{ flex: "1", minWidth: "150px" }}>
          <div style={{ fontSize: "13px", color: "#888", fontWeight: "600", marginBottom: "6px" }}>
            SEARCH RESULTS
          </div>
          <div style={{ fontSize: "28px", fontWeight: "700", color: "#f59e0b" }}>
            {filteredStores.length}
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
        {filteredStores.length === 0 ? (
          <div style={{
            padding: "60px",
            textAlign: "center",
            color: "#888",
            fontSize: "16px"
          }}>
            {searchTerm ? "🔍 No stores found matching your search" : "📝 No stores yet. Add your first store!"}
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
                    🏪 STORE NAME
                  </th>
                  <th style={{
                    padding: "16px 20px",
                    textAlign: "left",
                    fontWeight: "600",
                    fontSize: "14px",
                    letterSpacing: "0.5px"
                  }}>
                    📍 LOCATION
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
                    👥 EMPLOYEES
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
                {filteredStores.map((store, index) => (
                  <tr
                    key={store._id}
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
                    <td style={{ padding: "18px 20px" }}>
                      <Link
                        to={`/admin/stores/${store._id}`}
                        style={{
                          color: "#667eea",
                          fontWeight: "600",
                          fontSize: "15px",
                          textDecoration: "none",
                          transition: "all 0.2s ease"
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.color = "#764ba2";
                          e.currentTarget.style.textDecoration = "underline";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.color = "#667eea";
                          e.currentTarget.style.textDecoration = "none";
                        }}
                      >
                        {store.storeName}
                      </Link>
                    </td>
                    <td style={{
                      padding: "18px 20px",
                      fontSize: "14px",
                      color: "#666"
                    }}>
                      {store.storeLocation}
                    </td>
                    <td style={{
                      padding: "18px 20px",
                      fontSize: "14px",
                      color: "#666"
                    }}>
                      {store.storeEmail}
                    </td>
                    <td style={{ padding: "18px 20px" }}>
                      <span style={{
                        backgroundColor: "#e0e7ff",
                        color: "#4f46e5",
                        padding: "6px 12px",
                        borderRadius: "8px",
                        fontSize: "13px",
                        fontWeight: "600"
                      }}>
                        {store.employees?.length || 0} Employees
                      </span>
                    </td>
                    <td style={{
                      padding: "18px 20px",
                      display: "flex",
                      gap: "10px",
                      flexWrap: "wrap"
                    }}>
                      <button
                        onClick={() => openModal(store)}
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
                          if (!window.confirm(`Delete ${store.storeName}? This action cannot be undone.`)) return;
                          try {
                            await axios.delete(`/stores/${store._id}`);
                            setStores(stores.filter((s) => s._id !== store._id));
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
        <StoreForm
          store={selectedStore}
          onClose={closeModal}
          onSaved={fetchStores}
        />
      )}
    </div>
  );
};

export default Stores;
