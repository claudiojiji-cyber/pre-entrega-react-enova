import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { usuario } = useContext(AuthContext);

  // 1. Si no hay nadie logueado, lo mandamos al login
  if (!usuario) {
    return <Navigate to="/login" />;
  }

  // 2. Si hay un usuario logueado, pero su rol NO es "admin", lo rebotamos al inicio
  if (usuario.rol !== "admin") {
    
    alert("Acceso denegado: Área exclusiva para administradores.");
    return <Navigate to="/" />;
  }

  // 3. Si pasó todas las barreras (es el admin), le mostramos el Dashboard
  return children;
}

export default ProtectedRoute;