import { createContext, useState } from "react";
import { AUTH_STORAGE } from "../constans";

// Context yaratish
export const AuthContext = createContext(null);

// Context Provider
export const AuthProvider = ({ children }) => {
  const isLogin = JSON.parse(localStorage.getItem(AUTH_STORAGE)) || false;
  const [isAuth, setIsAuth] = useState(isLogin);
  

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
