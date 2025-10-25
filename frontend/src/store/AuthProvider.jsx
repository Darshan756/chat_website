import { createContext, useState, useEffect, useCallback } from "react";
import jwt_decode from "jwt-decode"; // ✅ Correct for Vite
import { axiosInstance } from "../axios";

const AuthContext = createContext({
  accessToken: null,
  refreshToken: null,
  user: null,
  loading: true,
  setAccessToken: () => {},
  setRefreshToken: () => {},
  setUser: () => {},
  logout: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }, []);

  const refreshAccessToken = useCallback(async () => {
    try {
      if (!refreshToken) throw new Error("No refresh token available");

      const response = await axiosInstance.post("/auth/refresh", {
        refresh: refreshToken,
      });

      const newAccess = response.data.access;
      const newRefresh = response.data.refresh;

      setAccessToken(newAccess);
      setRefreshToken(newRefresh);
      localStorage.setItem("accessToken", newAccess);
      localStorage.setItem("refreshToken", newRefresh);

      const decoded = jwt_decode(newAccess);
      setUser({ username: decoded.username });
    } catch (err) {
      console.error("Failed to refresh token:", err);
      logout();
    }
  }, [refreshToken, logout]);

  useEffect(() => {
    const initAuth = async () => {
      const storedAccess = localStorage.getItem("accessToken");
      const storedRefresh = localStorage.getItem("refreshToken");

      if (storedAccess && storedRefresh) {
        try {
          const decoded = jwt_decode(storedAccess);
          const now = Date.now() / 1000;

          if (decoded.exp > now) {
            setAccessToken(storedAccess);
            setRefreshToken(storedRefresh);
            setUser({ username: decoded.username });
          } else {
            setRefreshToken(storedRefresh);
            await refreshAccessToken();
          }
        } catch (err) {
          console.log("Invalid token, logging out.", err);
          logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, [refreshAccessToken, logout]);

  useEffect(() => {
    if (!accessToken) return;

    const decoded = jwt_decode(accessToken);
    const now = Date.now();
    const expiresIn = decoded.exp * 1000 - now;
    const refreshTime = expiresIn - 30000; // 30s before expiry

    const timeout = setTimeout(() => {
      refreshAccessToken();
    }, refreshTime > 0 ? refreshTime : 0);

    return () => clearTimeout(timeout);
  }, [accessToken, refreshAccessToken]);

  const contextValues = {
    accessToken,
    refreshToken,
    user,
    loading,
    setAccessToken,
    setRefreshToken,
    setUser,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
