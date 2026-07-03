import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext"; 
import "./NavBar.css";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { carrito } = useContext(CartContext);
  const { usuario } = useContext(AuthContext);

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
        
        {/* Desplegable de Categorías */}
        <li className="dropdown">
          <span className="dropdown-title">Categorías ▾</span>
          <ul className="dropdown-menu">
            <li><Link to="/categoria/Notebook" onClick={() => setIsOpen(false)}>Notebooks</Link></li>
            <li><Link to="/categoria/tv" onClick={() => setIsOpen(false)}>Televisores</Link></li>
            <li><Link to="/categoria/heladeras" onClick={() => setIsOpen(false)}>Heladeras</Link></li>
            <li><Link to="/categoria/lavarropas carga superior" onClick={() => setIsOpen(false)}>Lavarropas Sup.</Link></li>
            <li><Link to="/categoria/lavarropas carga frontal" onClick={() => setIsOpen(false)}>Lavarropas Front.</Link></li>
            <li><Link to="/categoria/lavavajilla" onClick={() => setIsOpen(false)}>Lavavajillas</Link></li>
            <li><Link to="/categoria/aires acondicionados" onClick={() => setIsOpen(false)}>Aires Acond.</Link></li>
            <li><Link to="/categoria/celular" onClick={() => setIsOpen(false)}>Celulares</Link></li>
          </ul>
        </li>
        
        <li>
          <Link to="/carrito" onClick={() => setIsOpen(false)}>
            Carrito ({cantidadTotal})
          </Link>
        </li>
        
        {usuario && usuario.rol === "admin" && (
            <li><Link to="/perfil" onClick={() => setIsOpen(false)}>Dashboard</Link></li>
        )}

        <li><Link to="/login" onClick={() => setIsOpen(false)}>Ingresar</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;