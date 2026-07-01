import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CartContext } from "../context/CartContext";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

function ProductoDetalle() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const { agregarAlCarrito } = useContext(CartContext);

  useEffect(() => {
    const docRef = doc(db, "productos", id);
    getDoc(docRef).then((snapshot) => {
      if (snapshot.exists()) {
        setProducto({ ...snapshot.data(), id: snapshot.id });
      }
    });
  }, [id]);

  if (!producto) {
    return <h2>Cargando producto desde la nube...</h2>;
  }

  return (
    <>
      <Helmet>
        <title>ENOVA STORE | {producto.nombre}</title>
        <meta name="description" content={producto.descripcion} />
      </Helmet>

      <div className="detalle" style={{ padding: "20px", display: "flex", gap: "20px" }}>
        <img src={producto.imagen} alt={producto.nombre} style={{ maxWidth: "300px" }} />
        
        <div>
          <h2>{producto.nombre}</h2>
          
          {/* Mostramos la categoría y el stock */}
          <p><strong>Categoría:</strong> {producto.categoria}</p>
          <p><strong>Stock disponible:</strong> {producto.stock > 0 ? producto.stock : "Sin stock"}</p>
          
          <p>{producto.descripcion}</p>
          <h3>Precio: ${producto.precio}</h3>

          {/* Botón con validación de stock */}
          <button 
            className="carritoBtn" 
            onClick={() => agregarAlCarrito(producto, 1)}
            disabled={producto.stock === 0} // Deshabilitamos si no hay stock
            style={{ 
              padding: "10px 20px", 
              cursor: producto.stock > 0 ? "pointer" : "not-allowed",
              backgroundColor: producto.stock > 0 ? "#28a745" : "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "5px"
            }}
          >
            {producto.stock > 0 ? "Agregar al carrito" : "Producto sin stock"}
          </button>
        </div>
      </div>
    </>
  );
}

export default ProductoDetalle;