import { createContext, useState } from "react";
import { AUTH_STORAGE } from "../constans";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const savedAuth = localStorage.getItem(AUTH_STORAGE);
  const initialAuth = savedAuth ? JSON.parse(savedAuth) : false;

  const [isAuth, setIsAuth] = useState(initialAuth);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
