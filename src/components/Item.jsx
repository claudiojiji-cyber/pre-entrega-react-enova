import { Link } from "react-router-dom";
import { useContext } from "react";

import { CartContext } from "../context/CartContext"; 

function Item({producto}) {
  
  const { agregarAlCarrito } = useContext(CartContext);

  return (
    <div className="card">
      <img src={producto.imagen} alt={producto.nombre} />
      <h3>{producto.nombre}</h3>
      <p>${producto.precio}</p>
      
      <div className="botones">
        <Link to={`/producto/${producto.id}`}>
          <button>Ver detalle</button>
        </Link>

        {/* Agregamos el evento onClick */}
        <button 
          className="carritoBtn" 
          onClick={() => agregarAlCarrito(producto, 1)}
        >
          Agregar carrito
        </button>
      </div>
    </div>
  );
}

export default Item;