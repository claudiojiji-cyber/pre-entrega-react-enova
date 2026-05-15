import { useEffect, useState } from "react"
import Item from "./Item"

function ItemListContainer() {

const [productos, setProductos] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)

useEffect(() => {

fetch("/productos.json")

.then((respuesta) => {

if (!respuesta.ok) {
throw new Error("Error al cargar productos")
}

return respuesta.json()

})

.then((data) => {
setProductos(data)
})

.catch((error) => {
setError(error.message)
})

.finally(() => {
setLoading(false)
})

}, [])

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