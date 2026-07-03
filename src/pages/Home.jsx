import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import Item from "../components/Item";

function Home() {
  const [productosDestacados, setProductosDestacados] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Conectamos a Firebase igual que en el catálogo
    const productosRef = collection(db, "productos");
    getDocs(productosRef)
      .then((snapshot) => {
        const listaProductos = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        // Extraemos solamente los primeros 6 productos para la portada
        setProductosDestacados(listaProductos.slice(0, 6));
        setCargando(false);
      })
      .catch((error) => {
        console.error("Error al traer destacados: ", error);
        setCargando(false);
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>ENOVA STORE | Inicio</title>
        <meta name="description" content="Bienvenido a ENOVA STORE. Tecnología y electrodomésticos al mejor precio." />
      </Helmet>

      <section className="hero">
        <h1>Bienvenido a ENOVA STORE</h1>
        <p>Tecnología y electrodomésticos al mejor precio.</p>
      </section>

      <h2 className="titulo">Productos Destacados</h2>

      {/* Grilla dinámica conectada a Firebase */}
      {cargando ? (
        <h2 style={{ textAlign: "center", color: "#00bfff" }}>Cargando destacados...</h2>
      ) : (
        <div className="productos-grid">
          {productosDestacados.map((prod) => (
            <Item key={prod.id} producto={prod} />
          ))}
        </div>
      )}
    </>
  );
}

export default Home;