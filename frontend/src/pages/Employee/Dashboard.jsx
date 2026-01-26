
  const employee = dashboardData?.employee;
  const store = dashboardData?.store;
  const storeStats = dashboardData?.storeStats;
  const quickActions = dashboardData?.quickActions || [];

  return (
    <div style={{
      padding: "30px",
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      minHeight: "100vh",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif"
    }}>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
        `}
      </style>

      {/* Welcome Header */}
      <div style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        borderRadius: "20px",
        padding: "40px",
        marginBottom: "30px",
        boxShadow: "0 10px 30px rgba(102, 126, 234, 0.3)",
        color: "white",
        animation: "fadeIn 0.6s ease"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
          <div style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "40px",
            backdropFilter: "blur(10px)",
            border: "3px solid rgba(255, 255, 255, 0.3)"
          }}>
            👤
          </div>
          <div style={{ flex: 1 }}>
            <h1 style={{
              margin: "0 0 8px 0",
              fontSize: "36px",
              fontWeight: "700",
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.2)"
            }}>
              Welcome back, {employee?.name || "Employee"}! 👋
            </h1>
            <p style={{
              margin: 0,
              fontSize: "16px",
              opacity: 0.95,
              fontWeight: "400"
            }}>
              {store ? `Working at ${store.storeName}` : "You're not assigned to any store yet"}
            </p>
          </div>
          <div style={{
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            padding: "12px 20px",
            borderRadius: "12px",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.3)"
          }}>
            <div style={{ fontSize: "12px", opacity: 0.9, marginBottom: "4px" }}>STATUS</div>
            <div style={{ fontSize: "16px", fontWeight: "700" }}>
              ✅ {employee?.status || "Active"}
            </div>
          </div>
        </div>
      </div>

      {store ? (
        <>
          {/* Store Information Card */}
          <div style={{
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "30px",
            marginBottom: "30px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            animation: "fadeIn 0.6s ease 0.1s backwards"
          }}>
            <h2 style={{
              margin: "0 0 25px 0",
              fontSize: "24px",
              fontWeight: "700",
              color: "#333",
              display: "flex",
              alignItems: "center",
              gap: "12px"
            }}>
              🏪 Your Store Details
            </h2>
            
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px"
            }}>
              <div style={{
                padding: "20px",
                background: "linear-gradient(135deg, #e0e7ff 0%, #f3e8ff 100%)",
                borderRadius: "12px",
                border: "2px solid #c7d2fe"
              }}>
                <div style={{ fontSize: "13px", color: "#6366f1", fontWeight: "600", marginBottom: "8px" }}>
                  STORE NAME
                </div>
                <div style={{ fontSize: "20px", fontWeight: "700", color: "#4338ca" }}>
                  {store.storeName}
                </div>
              </div>

              <div style={{
                padding: "20px",
                background: "linear-gradient(135deg, #dbeafe 0%, #e0f2fe 100%)",
                borderRadius: "12px",
                border: "2px solid #bfdbfe"
              }}>
                <div style={{ fontSize: "13px", color: "#0284c7", fontWeight: "600", marginBottom: "8px" }}>
                  📍 LOCATION
                </div>
                <div style={{ fontSize: "18px", fontWeight: "700", color: "#075985" }}>
                  {store.storeLocation}
                </div>
              </div>

              <div style={{
                padding: "20px",
                background: "linear-gradient(135deg, #dcfce7 0%, #d1fae5 100%)",
                borderRadius: "12px",
                border: "2px solid #bbf7d0"
              }}>
                <div style={{ fontSize: "13px", color: "#16a34a", fontWeight: "600", marginBottom: "8px" }}>
                  📧 EMAIL
                </div>
                <div style={{ fontSize: "16px", fontWeight: "600", color: "#166534", wordBreak: "break-word" }}>
                  {store.storeEmail}
                </div>
              </div>

              {store.storePhone && (
                <div style={{
                  padding: "20px",
                  background: "linear-gradient(135deg, #fed7aa 0%, #fdba74 100%)",
                  borderRadius: "12px",
                  border: "2px solid #fb923c"
                }}>
                  <div style={{ fontSize: "13px", color: "#c2410c", fontWeight: "600", marginBottom: "8px" }}>
                    📞 PHONE
                  </div>
                  <div style={{ fontSize: "18px", fontWeight: "700", color: "#9a3412" }}>
                    {store.storePhone}
                  </div>
                </div>
              )}

              {store.openingHours && (
                <div style={{
                  padding: "20px",
                  background: "linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)",
                  borderRadius: "12px",
                  border: "2px solid #f9a8d4"
                }}>
                  <div style={{ fontSize: "13px", color: "#db2777", fontWeight: "600", marginBottom: "8px" }}>
                    🕒 HOURS
                  </div>
                  <div style={{ fontSize: "18px", fontWeight: "700", color: "#9f1239" }}>
                    {store.openingHours}
                  </div>
                </div>
              )}

              {store.storeManager && (
                <div style={{
                  padding: "20px",
                  background: "linear-gradient(135deg, #e9d5ff 0%, #f3e8ff 100%)",
                  borderRadius: "12px",
                  border: "2px solid #d8b4fe"
                }}>
                  <div style={{ fontSize: "13px", color: "#9333ea", fontWeight: "600", marginBottom: "8px" }}>
                    👔 MANAGER
                  </div>
                  <div style={{ fontSize: "18px", fontWeight: "700", color: "#6b21a8" }}>
                    {store.storeManager}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Store Statistics */}
          {storeStats && (
            <div style={{
              backgroundColor: "white",
              borderRadius: "20px",
              padding: "30px",
              marginBottom: "30px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              animation: "fadeIn 0.6s ease 0.2s backwards"
            }}>
              <h2 style={{
                margin: "0 0 25px 0",
                fontSize: "24px",
                fontWeight: "700",
                color: "#333",
                display: "flex",
                alignItems: "center",
                gap: "12px"
              }}>
                📊 Store Statistics
              </h2>
              
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: "20px"
              }}>
                <div style={{
                  textAlign: "center",
                  padding: "25px",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  borderRadius: "16px",
                  color: "white",
                  boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)"
                }}>
                  <div style={{ fontSize: "36px", marginBottom: "8px" }}>📦</div>
                  <div style={{ fontSize: "32px", fontWeight: "700", marginBottom: "6px" }}>
                    {storeStats.totalProducts}
                  </div>
                  <div style={{ fontSize: "13px", opacity: 0.9 }}>Total Products</div>
                </div>

                <div style={{
                  textAlign: "center",
                  padding: "25px",
                  background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                  borderRadius: "16px",
                  color: "white",
                  boxShadow: "0 4px 12px rgba(245, 158, 11, 0.3)"
                }}>
                  <div style={{ fontSize: "36px", marginBottom: "8px" }}>🛒</div>
                  <div style={{ fontSize: "32px", fontWeight: "700", marginBottom: "6px" }}>
                    {storeStats.totalOrders}
                  </div>
                  <div style={{ fontSize: "13px", opacity: 0.9 }}>Total Orders</div>
                </div>

                <div style={{
                  textAlign: "center",
                  padding: "25px",
                  background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  borderRadius: "16px",
                  color: "white",
                  boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)"
                }}>
                  <div style={{ fontSize: "36px", marginBottom: "8px" }}>👥</div>
                  <div style={{ fontSize: "32px", fontWeight: "700", marginBottom: "6px" }}>
                    {storeStats.totalCustomers}
                  </div>
                  <div style={{ fontSize: "13px", opacity: 0.9 }}>Total Customers</div>
                </div>

                <div style={{
                  textAlign: "center",
                  padding: "25px",
                  background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                  borderRadius: "16px",
                  color: "white",
                  boxShadow: "0 4px 12px rgba(239, 68, 68, 0.3)"
                }}>
                  <div style={{ fontSize: "36px", marginBottom: "8px" }}>💰</div>
                  <div style={{ fontSize: "32px", fontWeight: "700", marginBottom: "6px" }}>
                    ${storeStats.monthlySales}
                  </div>
                  <div style={{ fontSize: "13px", opacity: 0.9 }}>Monthly Sales</div>
                </div>

                <div style={{
                  textAlign: "center",
                  padding: "25px",
                  background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                  borderRadius: "16px",
                  color: "white",
                  boxShadow: "0 4px 12px rgba(139, 92, 246, 0.3)"
                }}>
                  <div style={{ fontSize: "36px", marginBottom: "8px" }}>⭐</div>
                  <div style={{ fontSize: "32px", fontWeight: "700", marginBottom: "6px" }}>
                    {storeStats.rating}
                  </div>
                  <div style={{ fontSize: "13px", opacity: 0.9 }}>Store Rating</div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          {quickActions.length > 0 && (
            <div style={{
              backgroundColor: "white",
              borderRadius: "20px",
              padding: "30px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              animation: "fadeIn 0.6s ease 0.3s backwards"
            }}>
              <h2 style={{
                margin: "0 0 25px 0",
                fontSize: "24px",
                fontWeight: "700",
                color: "#333",
                display: "flex",
                alignItems: "center",
                gap: "12px"
              }}>
                ⚡ Quick Actions
              </h2>
              
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "16px"
              }}>
                {quickActions.map((action) => (
                  <div
                    key={action.id}
                    style={{
                      padding: "20px",
                      background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
                      borderRadius: "12px",
                      border: "2px solid #e2e8f0",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      textAlign: "center"
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow = "0 8px 20px rgba(102, 126, 234, 0.2)";
                      e.currentTarget.style.borderColor = "#667eea";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.borderColor = "#e2e8f0";
                    }}
                  >
                    <div style={{ fontSize: "40px", marginBottom: "10px" }}>
                      {action.icon}
                    </div>
                    <div style={{ fontSize: "16px", fontWeight: "600", color: "#333" }}>
                      {action.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div style={{
          backgroundColor: "white",
          borderRadius: "20px",
          padding: "60px 40px",
          textAlign: "center",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
        }}>
          <div style={{ fontSize: "80px", marginBottom: "20px", opacity: 0.6 }}>🏪</div>
          <h3 style={{
            fontSize: "24px",
            fontWeight: "700",
            color: "#333",
            marginBottom: "12px"
          }}>
            No Store Assigned
          </h3>
          <p style={{
            fontSize: "16px",
            color: "#666",
            margin: 0
          }}>
            You haven't been assigned to any store yet. Please contact your administrator.
          </p>
        </div>
      )}
    </div>
  );
};

export default EmployeeDashboard;
