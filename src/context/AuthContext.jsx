import { createContext, useContext, useState, useCallback } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("@quadras:token"));
  const [user, setUser]   = useState(() => {
    const stored = localStorage.getItem("@quadras:user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = useCallback((jwt, userData = null) => {
    localStorage.setItem("@quadras:token", jwt);
    if (userData) localStorage.setItem("@quadras:user", JSON.stringify(userData));
    setToken(jwt);
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("@quadras:token");
    localStorage.removeItem("@quadras:user");
    setToken(null);
    setUser(null);
  }, []);

  const isAuthenticated = Boolean(token);

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de <AuthProvider>");
  return ctx;
}
