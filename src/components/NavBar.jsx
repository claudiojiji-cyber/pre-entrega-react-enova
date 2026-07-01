import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext"; 
import "./NavBar.css";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  
  
  const { carrito } = useContext(CartContext);
  const { usuario } = useContext(AuthContext); // Accedemos al usuario

  const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <nav className="navbar">
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <li><Link to="/" onClick={() => setIsOpen(false)}>Inicio</Link></li>
        <li><Link to="/productos" onClick={() => setIsOpen(false)}>Productos</Link></li>
        
        <li>
          <Link to="/carrito" onClick={() => setIsOpen(false)}>
            Carrito ({cantidadTotal})
          </Link>
        </li>
        
        {/* 3. Lógica de renderizado condicional: Solo si hay usuario y es admin */}
        {usuario && usuario.rol === "admin" && (
            <li><Link to="/perfil" onClick={() => setIsOpen(false)}>Dashboard</Link></li>
        )}

        <li><Link to="/login" onClick={() => setIsOpen(false)}>Ingresar</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;