import { useEffect, useState } from "react"
import Item from "./Item"
import "./Productos.css"
import { useParams } from "react-router-dom" // <-- IMPORTAMOS useParams

function ItemListContainer() {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Capturamos la categoría desde la URL (lo que configuramos en App.jsx)
  const { idCategoria } = useParams() 

  useEffect(() => {
    setLoading(true) // Ponemos a cargar cada vez que cambiamos de categoría

    fetch("/productos.json")
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error("Error al cargar productos")
        }
        return respuesta.json()
      })
      .then((data) => {
        // LÓGICA DE FILTRADO
        if (idCategoria) {
          // Si hay categoría en la URL, filtramos el JSON
          const productosFiltrados = data.filter((prod) => prod.categoria === idCategoria)
          setProductos(productosFiltrados)
        } else {
          // Si no hay categoría (estamos en "/productos"), mostramos todos
          setProductos(data)
        }
      })
      .catch((error) => {
        setError(error.message)
      })
      .finally(() => {
        setLoading(false)
      })
      
  // Le avisamos a useEffect que vuelva a ejecutar esto si idCategoria cambia
  }, [idCategoria]) 

  if (loading) {
    return <h2>Cargando productos...</h2>
  }

  if (error) {
    return <h2>{error}</h2>
  }

  return (
    <div className="productos-grid">
      {productos.map((producto) => (
        <Item
          key={producto.id}
          producto={producto}
        />
      ))}
    </div>
  )
}

export default ItemListContainer