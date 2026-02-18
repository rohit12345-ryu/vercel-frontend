import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // CHECK token + user on load
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (token) setIsAuthenticated(true);
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = (token, userObj) => {
    if (token) localStorage.setItem("token", token);
    if (userObj) localStorage.setItem("user", JSON.stringify(userObj));
    setIsAuthenticated(true);
    setUser(userObj || null);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
