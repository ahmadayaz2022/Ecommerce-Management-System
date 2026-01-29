import { Link, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  const actionCards = [
    {
      to: "/admin/stores",
      title: "Add Store",
      emoji: "🏪",
      color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      description: "Create new stores"
    },
    {
      to: "stores",
      title: "See Stores",
      emoji: "🏪🏪",
      color: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
      description: "View all stores"
    },
    // {
    //   to: "employees",
    //   title: "Add Employee",
    //   emoji: "👤",
    //   color: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    //   description: "Register new team members to stores"
    // },


    {
      to: "employees",
      title: "See Employees",
      emoji: "👥",
      color: "linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)",
      description: "Browse All employee"
    }

  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#DEDEDE",
        padding: "40px 24px",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
      }}
    >
      {/* Header */}
      <div style={{ 
        marginBottom: "48px", 
        textAlign: "center",
        maxWidth: "800px",
        margin: "0 auto 48px"
      }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          borderRadius: "16px",
          padding: "12px 24px",
          marginBottom: "24px",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)"
        }}>
          <span style={{
            width: "12px",
            height: "12px",
            backgroundColor: "#10b981",
            borderRadius: "50%",
            marginRight: "8px",
            animation: "pulse 2s infinite"
          }}></span>
          <span style={{ 
            color: "#6b7280", 
            fontSize: "14px",
            fontWeight: "500"
          }}>
            Admin Portal
          </span>
        </div>
        
        <h1 style={{ 
          color: "#1e293b", 
          marginBottom: "12px",
          fontSize: "32px",
          fontWeight: "700",
          background: "linear-gradient(135deg, #1e293b 0%, #475569 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          Welcome back, Super Admin 👋
        </h1>
        <p style={{ 
          color: "#64748b", 
          fontSize: "18px",
          lineHeight: "1.6",
          maxWidth: "600px",
          margin: "0 auto"
        }}>
          Manage your stores and team members from the dashboard below
        </p>
      </div>

      {/* Action Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "24px",
          maxWidth: "1100px",
          margin: "0 auto 60px",
          padding: "0 20px"
        }}
      >
        {actionCards.map((card, index) => (
          <Link
            key={index}
            to={card.to}
            style={{
              textDecoration: "none",
              display: "block"
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "20px",
                padding: "32px 24px",
                height: "100%",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
                border: "1px solid rgba(226, 232, 240, 0.5)",
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.1)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.05)";
              }}
            >
              {/* Gradient Background */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "6px",
                  background: card.color,
                  opacity: 0.9
                }}
              />
              
              {/* Emoji/Icon Container */}
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "24px",
                  background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)",
                  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.08)",
                  fontSize: "32px"
                }}
              >
                {card.emoji}
              </div>
              
              {/* Title */}
              <h3
                style={{
                  color: "#1e293b",
                  marginBottom: "8px",
                  fontSize: "20px",
                  fontWeight: "600"
                }}
              >
                {card.title}
              </h3>
              
              {/* Description */}
              <p
                style={{
                  color: "#64748b",
                  fontSize: "14px",
                  lineHeight: "1.5",
                  marginBottom: "24px"
                }}
              >
                {card.description}
              </p>
              
              {/* CTA Arrow */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "#4f46e5",
                  fontSize: "14px",
                  fontWeight: "500"
                }}
              >
                <span>Get started</span>
                <span style={{ marginLeft: "8px", transition: "transform 0.2s" }}>
                  →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Divider */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto 40px",
          padding: "0 20px"
        }}
      >
        <div
          style={{
            height: "1px",
            background: "linear-gradient(90deg, transparent, #e2e8f0, transparent)",
            margin: "20px 0"
          }}
        />
      </div>

      {/* Nested Pages */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 20px"
        }}
      >
        <Outlet />
      </div>

      {/* Global Styles */}
      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          
          *:focus {
            outline: 2px solid #4f46e5;
            outline-offset: 2px;
          }
          
          body {
            margin: 0;
          }
        `}
      </style>
    </div>
  );
};

export default AdminDashboard;
