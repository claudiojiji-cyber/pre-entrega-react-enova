import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { HelmetProvider } from "react-helmet-async"; 

// Importamos los Contexts
import { CartProvider } from "./context/CartContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

// Importamos páginas y componentes
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import ProductoDetalle from "./pages/ProductoDetalle";
import Carrito from "./pages/Carrito";
import Login from "./pages/Login"; 
import Registro from "./pages/Registro"; // <-- 1. IMPORTAMOS EL NUEVO COMPONENTE
import ProtectedRoute from "./components/ProtectedRoute";
import PanelAdmin from "./pages/PanelAdmin"; 
import Checkout from "./pages/Checkout";

function App() {
  return (
    <HelmetProvider> 
      <AuthProvider>
        <CartProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/producto/:id" element={<ProductoDetalle />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Registro />} /> {/* <-- 2. AGREGAMOS LA RUTA AQUÍ */}
              <Route path="/checkout" element={<Checkout />} />
              
              <Route 
                path="/perfil" 
                element={
                  <ProtectedRoute>
                    <PanelAdmin />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </Layout>
        </CartProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;