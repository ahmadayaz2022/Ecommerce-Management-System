import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem("token"),
    role: localStorage.getItem("role"),
  });

  useEffect(() => {
    if (!auth.token) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    }
  }, [auth.token]);

  const login = (token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    setAuth({ token, role });
  };

  const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  setAuth({ token: null, role: null }); // triggers re-render
  window.location.href = "/login";
};


  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
