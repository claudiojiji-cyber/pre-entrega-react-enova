import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  // Armo el estado inicial con email y password vacíos para atajar lo que escriba el usuario
  const [credenciales, setCredenciales] = useState({ email: "", password: "" });
  
  // Me traigo la función login de mi contexto de autenticación
  const { login } = useContext(AuthContext); 
  const navigate = useNavigate();

  // Con esta función voy actualizando el estado a medida que completan los inputs
  const manejarCambio = (e) => {
    setCredenciales({
      ...credenciales,
      [e.target.name]: e.target.value
    });
  };

  // Atajo el submit del formulario para que no me recargue la página por defecto
  const manejarSubmit = (e) => {
    e.preventDefault();
    
    // Llamo a mi función de login pasándole los datos exactos que escribió el usuario en los inputs
    const ingresoExitoso = login(credenciales.email, credenciales.password);
    
    if (ingresoExitoso) {
      // Si la validación me devuelve true, significa que es el admin, así que lo derivo directo al panel de gestión
      navigate("/perfil"); 
    } else {
      // Si me devuelve false, freno la navegación y le muestro una alerta en pantalla
      alert("Credenciales incorrectas. Por favor, verificá tu email o contraseña e intentá nuevamente.");
    }
  };

  return (
    <div className="login-container" style={{ padding: "40px", textAlign: "center" }}>
      <h2>Iniciar Sesión</h2>
      
      <form onSubmit={manejarSubmit} style={{ display: "inline-flex", flexDirection: "column", gap: "15px", width: "300px" }}>
        <input 
          type="email" 
          name="email" 
          placeholder="Tu email" 
          value={credenciales.email}
          onChange={manejarCambio}
          required
          style={{ padding: "8px" }}
        />
        
        {/* Agregué el campo de password que me faltaba para cumplir con el requerimiento del Admin */}
        <input 
          type="password" 
          name="password" 
          placeholder="Tu contraseña" 
          value={credenciales.password}
          onChange={manejarCambio}
          required
          style={{ padding: "8px" }}
        />
        
        <button type="submit" style={{ padding: "10px", cursor: "pointer" }}>
          Ingresar
        </button>
      </form>
    </div>
  );
}

export default Login;