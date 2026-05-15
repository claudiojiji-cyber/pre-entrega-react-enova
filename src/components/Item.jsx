import { Link } from "react-router-dom"

function Item({producto}) {

return(

<div className="card">

<img
src={producto.imagen}
alt={producto.nombre}
/>

<h3>{producto.nombre}</h3>

<p>${producto.precio}</p>

<div className="botones">

<Link to={`/producto/${producto.id}`}>

<button>
Ver detalle
</button>

</Link>

<button className="carritoBtn">
Agregar carrito
</button>

</div>

</div>

)

}

export default Item