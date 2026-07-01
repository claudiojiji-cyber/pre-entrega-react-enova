import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  const login = (email, password) => {
    
    if (email === "admin@gmail.com" && password === "1234") {
      setUsuario({ email: email, rol: "admin" });
      return true;
    } 
    
    else if (email !== "" && password !== "") {
      setUsuario({ email: email, rol: "usuario" });
      return true;
    } else {
      return false; 
    }
  };

  
  const registro = (email, password) => {
    if (email !== "" && password !== "") {
      setUsuario({ email: email, rol: "usuario" });
      return true;
    }
    return false;
  };

  const logout = () => setUsuario(null);

  return (
    <AuthContext.Provider value={{ usuario, login, registro, logout }}>
      {children}
    </AuthContext.Provider>
  );
};