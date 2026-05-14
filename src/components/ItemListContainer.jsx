import { useEffect, useState } from "react"
import Item from "./Item"

function ItemListContainer() {

  const [productos, setProductos] = useState([])

  useEffect(() => {

    fetch("/productos.json")
      .then((response) => response.json())
      .then((data) => setProductos(data))

  }, [])

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