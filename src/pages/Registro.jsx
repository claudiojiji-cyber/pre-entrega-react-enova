import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Registro() {
  const [credenciales, setCredenciales] = useState({ email: "", password: "" });
  const { registro } = useContext(AuthContext); 
  const navigate = useNavigate();

  const manejarCambio = (e) => {
    setCredenciales({
      ...credenciales,
      [e.target.name]: e.target.value
    });
  };

  const manejarSubmit = (e) => {
    e.preventDefault();
    
    const registroExitoso = registro(credenciales.email, credenciales.password);
    
    if (registroExitoso) {
      alert("¡Cuenta creada con éxito!");
      navigate("/"); // Lo mandamos al inicio, NO al dashboard
    } else {
      alert("Error al registrarse. Completa todos los campos.");
    }
  };

  return (
    <div className="login-container" style={{ padding: "40px", textAlign: "center", minHeight: "60vh" }}>
      <h2 style={{ color: "#00bfff", marginBottom: "20px" }}>Crear Cuenta</h2>
      
      <form onSubmit={manejarSubmit} style={{ display: "inline-flex", flexDirection: "column", gap: "15px", width: "300px" }}>
        <input 
          type="email" 
          name="email" 
          placeholder="Tu email" 
          value={credenciales.email}
          onChange={manejarCambio}
          required
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        
        <input 
          type="password" 
          name="password" 
          placeholder="Crea una contraseña" 
          value={credenciales.password}
          onChange={manejarCambio}
          required
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        
        <button type="submit" style={{ padding: "10px", cursor: "pointer", background: "#00bfff", color: "black", border: "none", borderRadius: "5px", fontWeight: "bold" }}>
          Registrarme
        </button>
      </form>

      <div style={{ marginTop: "20px" }}>
        <p style={{ color: "white" }}>¿Ya tienes cuenta?</p>
        <Link to="/login" style={{ color: "#00bfff", textDecoration: "none", fontWeight: "bold" }}>
          Iniciar Sesión
        </Link>
      </div>
    </div>
  );
}

export default Registro;