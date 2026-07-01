import { useState, useContext } from "react"; // 1. Importa useContext
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext"; // 2. Importa tu contexto
import "./NavBar.css";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  
  // 3. Consumimos el carrito del contexto
  const { carrito } = useContext(CartContext);

  // 4. Calculamos la cantidad total de productos
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
        
        {/* 5. Mostramos la cantidad total */}
        <li>
          <Link to="/carrito" onClick={() => setIsOpen(false)}>
            Carrito ({cantidadTotal})
          </Link>
        </li>
        
        <li><Link to="/login" onClick={() => setIsOpen(false)}>Ingresar</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;  