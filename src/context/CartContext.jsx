import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Arranco con mi carrito vacío
  const [carrito, setCarrito] = useState([]);

  // Función para agregar, cumpliendo el requerimiento de que NO se me dupliquen los productos
  const agregarAlCarrito = (producto, cantidad = 1) => {
    // Me fijo si el producto ya está en mi array del carrito usando el ID que me da Firebase
    const productoExistente = carrito.find((item) => item.id === producto.id);

    if (productoExistente) {
      // Si ya lo tengo adentro, recorro el carrito y solo le sumo la cantidad al que coincide
      const carritoActualizado = carrito.map((item) =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + cantidad }
          : item
      );
      setCarrito(carritoActualizado);
    } else {
      // Si es un producto nuevo, lo meto al array con su cantidad inicial
      setCarrito([...carrito, { ...producto, cantidad }]);
    }
  };

  // Función para sumar 1 a la cantidad directamente desde la vista del carrito
  const incrementarCantidad = (id) => {
    const carritoActualizado = carrito.map((item) =>
      item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
    );
    setCarrito(carritoActualizado);
  };

  // Función para restar 1 (y me aseguro de que no baje de 1, si quiere 0 que use el botón de eliminar)
  const decrementarCantidad = (id) => {
    const carritoActualizado = carrito.map((item) =>
      item.id === id && item.cantidad > 1
        ? { ...item, cantidad: item.cantidad - 1 }
        : item
    );
    setCarrito(carritoActualizado);
  };

  // Función para volar un producto específico del carrito
  const eliminarDelCarrito = (id) => {
    // Filtro el array para quedarme con todos MENOS el que tiene el ID que quiero borrar
    const carritoFiltrado = carrito.filter((item) => item.id !== id);
    setCarrito(carritoFiltrado);
  };

  // Función clave para calcular el monto total a pagar
  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
  };
const vaciarCarrito = () => setCarrito([]);
  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        incrementarCantidad,
        decrementarCantidad,
        eliminarDelCarrito,
        calcularTotal,
        vaciarCarrito
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
