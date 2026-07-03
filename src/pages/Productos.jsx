import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import Item from "../components/Item";
import { useParams } from "react-router-dom"; // <-- 1. IMPORTAMOS useParams

function Productos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  
  // Estados para la búsqueda y paginación
  const [busqueda, setBusqueda] = useState("");
  const [pagina, setPagina] = useState(1);
  const productosPorPagina = 4;

  // 2. Capturamos la categoría si el usuario hizo clic en el NavBar
  const { idCategoria } = useParams();

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

  // 3. Reiniciamos la página a 1 cada vez que cambiamos de categoría o buscamos algo
  useEffect(() => {
    setPagina(1);
  }, [idCategoria, busqueda]);

  // 4. SÚPER FILTRO: Filtramos por lo que escriben Y por la categoría del NavBar
  const productosFiltrados = productos.filter((prod) => {
    // Verifica si el texto coincide
    const coincideTexto = prod.nombre.toLowerCase().includes(busqueda.toLowerCase());
    
    // Verifica si la categoría coincide (si es que hay una seleccionada en el NavBar)
    const coincideCategoria = idCategoria ? prod.categoria === idCategoria : true;

    // Solo muestra el producto si cumple AMBAS condiciones
    return coincideTexto && coincideCategoria;
  });

  // Lógica de Paginación (ahora actúa sobre el súper filtro)
  const indiceUltimo = pagina * productosPorPagina;
  const indicePrimero = indiceUltimo - productosPorPagina;
  const productosPaginados = productosFiltrados.slice(indicePrimero, indiceUltimo);
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

  if (cargando) {
    return <h2 style={{ padding: "20px" }}>Cargando productos desde la nube...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      {/* Título dinámico: si estamos en una categoría, muestra el nombre */}
      <h2 style={{ textTransform: "capitalize", color: "#00bfff", marginBottom: "20px" }}>
        {idCategoria ? `Categoría: ${idCategoria}` : "Catálogo de Productos"}
      </h2>

      {/* Barra de Búsqueda */}
      <input
        type="text"
        placeholder="Buscar producto..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{ padding: "10px", marginBottom: "20px", width: "100%", maxWidth: "400px" }}
      />

      {/* Lista de productos filtrada y paginada */}
      <div className="lista-productos" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
        {productosPaginados.length > 0 ? (
          productosPaginados.map((prod) => <Item key={prod.id} producto={prod} />)
        ) : (
          <p style={{ color: "white" }}>No se encontraron productos en esta sección.</p>
        )}
      </div>

      {/* Controles de Paginación */}
      {totalPaginas > 1 && (
        <div style={{ marginTop: "30px", display: "flex", gap: "10px", justifyContent: "center" }}>
          <button disabled={pagina === 1} onClick={() => setPagina(pagina - 1)}>Anterior</button>
          <span style={{ color: "white" }}>Página {pagina} de {totalPaginas}</span>
          <button disabled={pagina >= totalPaginas} onClick={() => setPagina(pagina + 1)}>Siguiente</button>
        </div>
      )}
    </div>
  );
}

export default Productos;