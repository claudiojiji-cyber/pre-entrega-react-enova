import { Link } from "react-router-dom";
import { useContext } from "react";
// Importamos nuestro contexto
import { CartContext } from "../context/CartContext"; 

function Item({producto}) {
  // Extraemos la función agregarAlCarrito de nuestro Context
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