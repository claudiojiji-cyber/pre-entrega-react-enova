import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { usuario } = useContext(AuthContext);

  if (!usuario) {
    // Si no hay usuario, mandamos al login
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;