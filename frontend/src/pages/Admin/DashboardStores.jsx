import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";

const DashboardStores = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchStores = async () => {
    try {
      const res = await axios.get("/stores");
      setStores(res.data);
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchStores();
  }, []);

  if (loading) {
    return (
      <div style={{
        minHeight: "60vh",
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

  if (!stores.length) {
    return (
      <div style={{
        backgroundColor: "white",
        borderRadius: "20px",
        padding: "60px 40px",
        textAlign: "center",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        margin: "20px"
      }}>
        <div style={{ fontSize: "80px", marginBottom: "20px", opacity: 0.6 }}>🏪</div>
        <h3 style={{
          fontSize: "24px",
          fontWeight: "700",
          color: "#333",
          marginBottom: "12px"
        }}>
          No Stores Found
        </h3>
        <p style={{
          fontSize: "16px",
          color: "#666",
          margin: 0
        }}>
          Add your first store to get started!
        </p>
      </div>
    );
  }

  return (
    <div style={{
      padding: "20px",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif"
    }}>
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "24px",
        marginTop: "20px"
      }}>
        {stores.map((store, index) => (
          <div
            key={store._id}
            onClick={() => navigate(`/admin/store/${store._id}`)}
            style={{
              padding: "28px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              border: "2px solid transparent",
              animation: `fadeInUp 0.5s ease ${index * 0.1}s backwards`,
              position: "relative",
              overflow: "hidden"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow = "0 12px 28px rgba(102, 126, 234, 0.25)";
              e.currentTarget.style.borderColor = "#667eea";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
              e.currentTarget.style.borderColor = "transparent";
            }}
          >
            {/* Decorative gradient overlay */}
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "4px",
              background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)"
            }}></div>

            {/* Store Icon */}
            <div style={{
              width: "60px",
              height: "60px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "20px",
              boxShadow: "0 8px 16px rgba(102, 126, 234, 0.3)"
            }}>
              <span style={{ fontSize: "28px" }}>🏪</span>
            </div>

            {/* Store Name */}
            <h2 style={{
              margin: "0 0 12px 0",
              fontSize: "22px",
              fontWeight: "700",
              color: "#333",
              lineHeight: "1.3"
            }}>
              {store.storeName}
            </h2>

            {/* Store Location */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "10px",
              color: "#666",
              fontSize: "14px"
            }}>
              <span>📍</span>
              <span style={{ fontWeight: "500" }}>{store.storeLocation}</span>
            </div>

            {/* Store Email */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#666",
              fontSize: "14px",
              marginBottom: "16px",
              wordBreak: "break-word"
            }}>
              <span>📧</span>
              <span style={{ fontWeight: "500" }}>{store.storeEmail}</span>
            </div>

            {/* View Details Button */}
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 16px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: "600",
              marginTop: "8px",
              boxShadow: "0 4px 10px rgba(102, 126, 234, 0.3)"
            }}>
              <span>View Details</span>
              <span style={{ fontSize: "16px" }}>→</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardStores;
