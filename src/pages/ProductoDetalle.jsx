import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function ProductoDetalle() {

  const { id } = useParams()

  const [producto, setProducto] = useState(null)

  useEffect(() => {
    fetch("/productos.json")
      .then((response) => response.json())
      .then((data) => {
        const productoEncontrado = data.find(
          (item) => item.id === Number(id)
        )

        setProducto(productoEncontrado)
      })
  }, [id])

  if (!producto) {
    return <h2>Cargando producto...</h2>
  }

  return (
    <div className="detalle">
      <img src={producto.imagen} alt={producto.nombre} />

      <div>
        <h2>{producto.nombre}</h2>

        <p>{producto.descripcion}</p>

        <h3>${producto.precio}</h3>
      </div>
    </div>
  )
}

export default ProductoDetalle