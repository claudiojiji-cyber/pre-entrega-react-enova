import { Helmet } from "react-helmet-async";
import ItemListContainer from "../components/ItemListContainer";

function Home() {
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
      <ItemListContainer/>
    </>
  );
}

export default Home;