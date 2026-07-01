import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { db } from "../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function Checkout() {
  const { carrito, calcularTotal, vaciarCarrito } = useContext(CartContext);
  const [datos, setDatos] = useState({ nombre: "", email: "", telefono: "" });

  const manejarCambio = (e) => setDatos({ ...datos, [e.target.name]: e.target.value });

  const finalizarCompra = async (e) => {
    e.preventDefault();
    
    // Armo el objeto de la orden tal como lo pide el sistema
    const orden = {
      comprador: datos,
      items: carrito,
      total: calcularTotal(),
      fecha: serverTimestamp()
    };

    try {
      // Guardo en la colección 'ordenes'
      const docRef = await addDoc(collection(db, "ordenes"), orden);
      alert("¡Compra realizada! Tu ID de seguimiento es: " + docRef.id);
      vaciarCarrito(); // Limpio el carrito tras el éxito
    } catch (error) {
      console.error("Error al registrar la orden:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Finalizar Compra</h2>
      <form onSubmit={finalizarCompra} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
        <input name="nombre" placeholder="Nombre" onChange={manejarCambio} required />
        <input name="email" type="email" placeholder="Email" onChange={manejarCambio} required />
        <input name="telefono" placeholder="Teléfono" onChange={manejarCambio} required />
        <button type="submit" style={{ backgroundColor: "green", color: "white" }}>Confirmar Orden</button>
      </form>
    </div>
  );
}

export default Checkout;