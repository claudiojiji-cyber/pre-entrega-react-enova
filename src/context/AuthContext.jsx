import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Arranco con el usuario en null porque al iniciar la aplicación nadie está logueado
  const [usuario, setUsuario] = useState(null);

  // Armo mi función de login con la validación estricta que me piden en los requerimientos
  const login = (email, password) => {
    // Valido que las credenciales sean exactamente las del administrador principal
    if (email === "admin@gmail.com" && password === "1234") {
      // Si coinciden, guardo en el estado que el usuario es admin y le doy el pase
      setUsuario({ email: email, rol: "admin" });
      return true; // Retorno true para avisarle a mi componente Login que salió todo bien
    } else {
      // Si ingresan mal la contraseña o el mail, bloqueo el acceso
      return false; // Retorno false para poder mostrar una alerta de error en la pantalla
    }
  };

  // Función simple para limpiar el estado y cerrar la sesión cuando sea necesario
  const logout = () => setUsuario(null);

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};