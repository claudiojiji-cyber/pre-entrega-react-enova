import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import Item from "../components/Item";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  
  // Estados para la búsqueda y paginación
  const [busqueda, setBusqueda] = useState("");
  const [pagina, setPagina] = useState(1);
  const productosPorPagina = 4; // Ajusta este número según cuántos quieras ver por fila/página

  useEffect(() => {
    const productosRef = collection(db, "productos");
    getDocs(productosRef)
      .then((snapshot) => {
        const listaProductos = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProductos(listaProductos);
        setCargando(false);
      })
      .catch((error) => {
        console.error("Error al traer productos: ", error);
        setCargando(false);
      });
  }, []);

  // Lógica de Filtro
  const productosFiltrados = productos.filter((prod) =>
    prod.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Lógica de Paginación
  const indiceUltimo = pagina * productosPorPagina;
  const indicePrimero = indiceUltimo - productosPorPagina;
  const productosPaginados = productosFiltrados.slice(indicePrimero, indiceUltimo);
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

  if (cargando) {
    return <h2>Cargando productos desde la nube...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Catálogo de Productos</h2>

      {/* Barra de Búsqueda */}
      <input
        type="text"
        placeholder="Buscar producto..."
        value={busqueda}
        onChange={(e) => {
            setBusqueda(e.target.value);
            setPagina(1); // Reinicio a la página 1 al buscar
        }}
        style={{ padding: "10px", marginBottom: "20px", width: "100%", maxWidth: "400px" }}
      />

      {/* Lista de productos filtrada y paginada */}
      <div className="lista-productos" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
        {productosPaginados.length > 0 ? (
          productosPaginados.map((prod) => <Item key={prod.id} producto={prod} />)
        ) : (
          <p>No se encontraron productos con ese nombre.</p>
        )}
      </div>

      {/* Controles de Paginación */}
      <div style={{ marginTop: "30px", display: "flex", gap: "10px", justifyContent: "center" }}>
        <button disabled={pagina === 1} onClick={() => setPagina(pagina - 1)}>Anterior</button>
        <span>Página {pagina} de {totalPaginas || 1}</span>
        <button disabled={pagina >= totalPaginas} onClick={() => setPagina(pagina + 1)}>Siguiente</button>
      </div>
    </div>
  );
}

export default Productos;