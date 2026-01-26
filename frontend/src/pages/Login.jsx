
import { useState } from "react";
import axios from "../api/axios"; 
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "superadmin") navigate("/admin/dashboard");
      else navigate("/employee/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #43cea2 0%, #185a9d 100%)",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Animated background circles */}
      <div style={{
        position: "absolute",
        width: "500px",
        height: "500px",
        background: "rgba(255, 255, 255, 0.1)",
        borderRadius: "50%",
        top: "-250px",
        right: "150px",
        bottom: "100px",
        animation: "float 6s ease-in-out infinite"
      }}></div>
      <div style={{
        position: "absolute",
        width: "300px",
        height: "300px",
        background: "rgba(255, 255, 255, 0.08)",
        borderRadius: "50%",
        bottom: "-100px",
        left: "-100px",
        animation: "float 8s ease-in-out infinite reverse"
      }}></div>


        <div style={{
        position: "absolute",
        width: "300px",
        height: "300px",
        background: "rgba(255, 255, 255, 0.08)",
        borderRadius: "50%",
        right: "-100px",
        left: "-100px",
        animation: "float 8s ease-in-out infinite reverse"
      }}></div>

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          @keyframes slideIn {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
        `}
      </style>

      <div style={{
        backgroundColor: "white",
        borderRadius: "24px",
        boxShadow: "0 30px 80px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.1)",
        padding: "50px 45px",
        width: "100%",
        maxWidth: "440px",
        margin: "20px",
        position: "relative",
        zIndex: 1,
        animation: "slideIn 0.6s ease-out",
        backdropFilter: "blur(10px)"
      }}>
        <div style={{ textAlign: "center", marginBottom: "45px" }}>
          <div style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            width: "90px",
            height: "90px",
            borderRadius: "50%",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "25px",
            boxShadow: "0 15px 40px rgba(102, 126, 234, 0.5)",
            position: "relative",
            animation: "pulse 3s ease-in-out infinite"
          }}>
            <div style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              border: "3px solid rgba(102, 126, 234, 0.3)",
              animation: "pulse 3s ease-in-out infinite"
            }}></div>
            <span style={{
              fontSize: "36px",
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))"
            }}>🛍️</span>
          </div>
          <h1 style={{
            margin: "0",
            fontSize: "32px",
            fontWeight: "700",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "12px",
            letterSpacing: "-0.5px"
          }}>
            Welcome to Ecommerce Mnagement System
          </h1>
          <p style={{
            color: "#888",
            fontSize: "15px",
            margin: "0",
            fontWeight: "400"
          }}>
            Sign in to continue to your account
          </p>
        </div>

        <form onSubmit={handleLogin} style={{ width: "100%" }}>
          <div style={{ marginBottom: "28px", position: "relative" }}>
            <label style={{
              display: "block",
              fontSize: "13px",
              fontWeight: "600",
              color: "#555",
              marginBottom: "8px",
              letterSpacing: "0.3px"
            }}>
              📧 Email Address
            </label>
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
              style={{
                width: "100%",
                padding: "16px 18px",
                fontSize: "15px",
                border: "2px solid #e8e8e8",
                borderRadius: "12px",
                outline: "none",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                boxSizing: "border-box",
                backgroundColor: "#fafafa",
                color: "#333",
                fontWeight: "500"
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#667eea";
                e.target.style.backgroundColor = "#fff";
                e.target.style.boxShadow = "0 0 0 4px rgba(102, 126, 234, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e8e8e8";
                e.target.style.backgroundColor = "#fafafa";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>
          
          <div style={{ marginBottom: "35px", position: "relative" }}>
            <label style={{
              display: "block",
              fontSize: "13px",
              fontWeight: "600",
              color: "#555",
              marginBottom: "8px",
              letterSpacing: "0.3px"
            }}>
              🔒 Password
            </label>
            <input 
              type="password" 
              placeholder="Enter your password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
              style={{
                width: "100%",
                padding: "16px 18px",
                fontSize: "15px",
                border: "2px solid #e8e8e8",
                borderRadius: "12px",
                outline: "none",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                boxSizing: "border-box",
                backgroundColor: "#fafafa",
                color: "#333",
                fontWeight: "500"
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#667eea";
                e.target.style.backgroundColor = "#fff";
                e.target.style.boxShadow = "0 0 0 4px rgba(102, 126, 234, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e8e8e8";
                e.target.style.backgroundColor = "#fafafa";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>
          
          <button 
            type="submit"
            style={{
              width: "100%",
              padding: "18px",
              fontSize: "16px",
              fontWeight: "700",
              color: "white",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: "0 12px 24px rgba(102, 126, 234, 0.35)",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              position: "relative",
              overflow: "hidden",
              transform: isHovered ? "translateY(-2px)" : "translateY(0)"
            }}
            onMouseEnter={(e) => {
              setIsHovered(true);
              e.target.style.boxShadow = "0 18px 35px rgba(102, 126, 234, 0.45)";
            }}
            onMouseLeave={(e) => {
              setIsHovered(false);
              e.target.style.boxShadow = "0 12px 24px rgba(102, 126, 234, 0.35)";
            }}
          >
            <span style={{ position: "relative", zIndex: 1 }}>Sign In</span>
            <div style={{
              position: "absolute",
              top: 0,
              left: "-100%",
              width: "100%",
              height: "100%",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
              transition: "left 0.5s",
              ...(isHovered && { left: "100%" })
            }}></div>
          </button>
        </form>

        <div style={{
          textAlign: "center",
          marginTop: "35px",
          paddingTop: "25px",
          borderTop: "2px solid #f5f5f5"
        }}>
          <p style={{
            color: "#999",
            fontSize: "13px",
            margin: "0",
            fontWeight: "500"
          }}>
            🔐 Your data is encrypted and secure
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;



//  ////new style
