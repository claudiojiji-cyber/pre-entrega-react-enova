import { useContext } from "react";
// Importo mi contexto para poder acceder a los datos y funciones del carrito
import { CartContext } from "../context/CartContext";
// Importo useNavigate para poder saltar a la pantalla de checkout
import { useNavigate } from "react-router-dom";

function Carrito() {
  // Me traigo el array del carrito y todas las herramientas que armé en mi motor (el Context)
  const { 
    carrito, 
    eliminarDelCarrito, 
    vaciarCarrito, 
    incrementarCantidad, 
    decrementarCantidad, 
    calcularTotal 
  } = useContext(CartContext);

  // Defino navigate para usarlo en el botón de finalizar compra
  const navigate = useNavigate();

  return (
    <section className="carrito" style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2>Carrito de compras</h2>

      {/* Evalúo si el carrito está vacío para mostrar un mensaje, o si tiene algo para armar la lista */}
      {carrito.length === 0 ? (
        <p>No hay productos agregados.</p>
      ) : (
        <div className="carrito-contenedor">
          {carrito.map((producto) => (
            <div key={producto.id} className="carrito-item" style={{ display: "flex", alignItems: "center", borderBottom: "1px solid #ccc", padding: "15px 0", gap: "20px" }}>
              
              {/* IMAGEN DEL PRODUCTO EN EL CARRITO */}
              <img 
                src={producto.imagen} 
                alt={producto.nombre} 
                style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "5px", border: "1px solid #eee" }} 
              />
              
              <div style={{ flex: 1 }}>
                <h3>{producto.nombre}</h3>
                <p>Precio unitario: ${producto.precio}</p>
                
                {/* Bloquecito para controlar la cantidad */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "10px 0" }}>
                  <button 
                    onClick={() => decrementarCantidad(producto.id)}
                    style={{ padding: "5px 10px", cursor: "pointer", fontWeight: "bold" }}
                  >
                    -
                  </button>
                  
                  <span>Cantidad: {producto.cantidad}</span>
                  
                  <button 
                    onClick={() => incrementarCantidad(producto.id)}
                    style={{ padding: "5px 10px", cursor: "pointer", fontWeight: "bold" }}
                  >
                    +
                  </button>
                </div>
                
                <p><strong>Subtotal: ${producto.precio * producto.cantidad}</strong></p>
              </div>
              
              {/* Botón de eliminar individual */}
              <button 
                onClick={() => eliminarDelCarrito(producto.id)}
                style={{ backgroundColor: "#dc3545", color: "white", border: "none", padding: "8px 15px", cursor: "pointer", borderRadius: "5px" }}
              >
                Eliminar
              </button>
            </div>
          ))}

          {/* Sección final con los totales y los botones de acción generales */}
          <div className="carrito-resumen" style={{ marginTop: "30px", textAlign: "right" }}>
            <h2>Total a Pagar: ${calcularTotal()}</h2>
            
            <div style={{ marginTop: "15px" }}>
              <button 
                onClick={vaciarCarrito}
                style={{ padding: "10px 20px", marginRight: "10px", cursor: "pointer", backgroundColor: "#6c757d", color: "white", border: "none", borderRadius: "5px" }}
              >
                Vaciar Carrito
              </button>
              
              <button 
                onClick={() => navigate("/checkout")}
                style={{ padding: "10px 20px", cursor: "pointer", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px", fontSize: "16px" }}
              >
                Finalizar Compra
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Carrito;