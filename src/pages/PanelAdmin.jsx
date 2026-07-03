import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";

function PanelAdmin() {
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    imagen: "",
    categoria: "",
    stock: ""
  });

  const [productos, setProductos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  const cargarProductos = async () => {
    const querySnapshot = await getDocs(collection(db, "productos"));
    const lista = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setProductos(lista);
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const manejarCambio = (e) => {
    setNuevoProducto({
      ...nuevoProducto,
      [e.target.name]: e.target.value
    });
  };

  const guardarProducto = async (e) => {
    e.preventDefault();
    try {
      const datosProducto = {
        nombre: nuevoProducto.nombre,
        precio: Number(nuevoProducto.precio),
        descripcion: nuevoProducto.descripcion,
        imagen: nuevoProducto.imagen,
        categoria: nuevoProducto.categoria,
        stock: Number(nuevoProducto.stock)
      };

      if (editandoId) {
        const docRef = doc(db, "productos", editandoId);
        await updateDoc(docRef, datosProducto);
        alert("Producto actualizado con éxito");
        setEditandoId(null);
      } else {
        await addDoc(collection(db, "productos"), datosProducto);
        alert("Producto agregado con éxito");
      }
      
      setNuevoProducto({ nombre: "", precio: "", descripcion: "", imagen: "", categoria: "", stock: "" }); 
      cargarProductos();
    } catch (error) {
      console.error("Error al guardar: ", error);
      alert("Hubo un error en la carga.");
    }
  };

  const eliminarProducto = async (id) => {
    if (window.confirm("¿Seguro que querés eliminar este producto?")) {
      try {
        await deleteDoc(doc(db, "productos", id));
        alert("Producto eliminado");
        cargarProductos();
      } catch (error) {
        console.error("Error al eliminar: ", error);
      }
    }
  };

  const iniciarEdicion = (prod) => {
    setNuevoProducto({
      nombre: prod.nombre,
      precio: prod.precio,
      descripcion: prod.descripcion,
      imagen: prod.imagen,
      categoria: prod.categoria || "",
      stock: prod.stock || 0
    });
    setEditandoId(prod.id);
  };

  return (
    <div className="panel-admin" style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      <h2>{editandoId ? "Editar Producto" : "Alta de Productos"}</h2>
      
      <form onSubmit={guardarProducto} style={{ display: "flex", flexDirection: "column", gap: "15px", marginBottom: "40px" }}>
        <input type="text" name="nombre" placeholder="Nombre" value={nuevoProducto.nombre} onChange={manejarCambio} required />
        <input type="number" name="precio" placeholder="Precio" value={nuevoProducto.precio} onChange={manejarCambio} required />
        <input type="text" name="descripcion" placeholder="Descripción" value={nuevoProducto.descripcion} onChange={manejarCambio} required />
        <input type="text" name="imagen" placeholder="URL Imagen" value={nuevoProducto.imagen} onChange={manejarCambio} required />
        <input type="text" name="categoria" placeholder="Categoría" value={nuevoProducto.categoria} onChange={manejarCambio} required />
        <input type="number" name="stock" placeholder="Stock" value={nuevoProducto.stock} onChange={manejarCambio} required />
        
        <button type="submit" style={{ padding: "10px", backgroundColor: editandoId ? "#28a745" : "#007bff", color: "white", border: "none", cursor: "pointer" }}>
          {editandoId ? "Guardar Cambios" : "Ingresar Producto al Sistema"}
        </button>
        
        {editandoId && (
          <button type="button" onClick={() => { setEditandoId(null); setNuevoProducto({ nombre: "", precio: "", descripcion: "", imagen: "", categoria: "", stock: "" }); }} style={{ padding: "10px", backgroundColor: "#dc3545", color: "white", border: "none", cursor: "pointer" }}>
            Cancelar Edición
          </button>
        )}
      </form>

      <h2>Lista de Productos</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {productos.map((prod) => (
          <div key={prod.id} style={{ display: "flex", alignItems: "center", border: "1px solid #ddd", padding: "10px", borderRadius: "8px", gap: "15px", backgroundColor: "#f9f9f9" }}>
            {/* Miniatura visual de la imagen */}
            <img 
              src={prod.imagen} 
              alt={prod.nombre} 
              style={{ width: "70px", height: "70px", objectFit: "cover", borderRadius: "5px", border: "1px solid #ccc" }} 
            />
            
            <div style={{ flex: 1 }}>
              <strong style={{ fontSize: "1.1rem" }}>{prod.nombre}</strong> <br />
              <span style={{ color: "#555" }}>${prod.precio} | Stock: {prod.stock} | Cat: {prod.categoria}</span>
            </div>
            
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => iniciarEdicion(prod)} style={{ padding: "6px 12px", cursor: "pointer" }}>Editar</button>
              <button onClick={() => eliminarProducto(prod.id)} style={{ backgroundColor: "#dc3545", color: "white", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PanelAdmin;