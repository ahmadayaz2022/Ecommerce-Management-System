import { useState } from "react";
import axios from "../api/axios"; // We'll create this next
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif"
    }}>
      <div style={{
        backgroundColor: "white",
        borderRadius: "20px",
        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
        padding: "40px",
        width: "100%",
        maxWidth: "400px",
        margin: "20px",
        transform: "translateY(0)",
        transition: "transform 0.3s ease"
      }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
            boxShadow: "0 10px 30px rgba(102, 126, 234, 0.4)"
          }}>
            <span style={{
              color: "white",
              fontSize: "28px",
              fontWeight: "bold"
            }}>🔐</span>
          </div>
          <h1 style={{
            margin: "0",
            fontSize: "28px",
            fontWeight: "600",
            color: "#333",
            marginBottom: "10px"
          }}>
            Welcome TO Ecommerce Store
          </h1>
          <p style={{
            color: "#666",
            fontSize: "14px",
            margin: "0"
          }}>
            Sign in to continue to your account
          </p>
        </div>

        <form onSubmit={handleLogin} style={{ width: "100%" }}>
          <div style={{ marginBottom: "25px" }}>
            <input 
              type="email" 
              placeholder="Email address" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
              style={{
                width: "100%",
                padding: "15px",
                fontSize: "16px",
                border: "2px solid #e0e0e0",
                borderRadius: "10px",
                outline: "none",
                transition: "all 0.3s ease",
                boxSizing: "border-box"
              }}
              onFocus={(e) => e.target.style.borderColor = "#667eea"}
              onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
            />
          </div>
          
          <div style={{ marginBottom: "30px" }}>
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
              style={{
                width: "100%",
                padding: "15px",
                fontSize: "16px",
                border: "2px solid #e0e0e0",
                borderRadius: "10px",
                outline: "none",
                transition: "all 0.3s ease",
                boxSizing: "border-box"
              }}
              onFocus={(e) => e.target.style.borderColor = "#667eea"}
              onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
            />
          </div>
          
          <button 
            type="submit"
            style={{
              width: "100%",
              padding: "16px",
              fontSize: "16px",
              fontWeight: "600",
              color: "white",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 10px 20px rgba(102, 126, 234, 0.3)"
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 15px 30px rgba(102, 126, 234, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 10px 20px rgba(102, 126, 234, 0.3)";
            }}
          >
            Sign In
          </button>
        </form>

        <div style={{
          textAlign: "center",
          marginTop: "30px",
          paddingTop: "20px",
          borderTop: "1px solid #f0f0f0"
        }}>
          <p style={{
            color: "#666",
            fontSize: "14px",
            margin: "0"
          }}>

          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;