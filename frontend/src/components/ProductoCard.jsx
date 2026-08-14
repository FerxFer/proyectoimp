import { Link } from 'react-router-dom'

function ProductoCard({ producto, onAgregar }) {
    const precioFormateado = producto.precio.toLocaleString('es-AR', {
        style: 'currency',
        currency: 'ARS'
    })

    return (
        <div className="producto-card">
            <Link to={`/producto/${producto.id}`} target="_blank" rel="noopener noreferrer" className="producto-link">
                <img src={producto.imagenUrl} alt={producto.nombre} />
                <h3>{producto.nombre}</h3>
                <p className="descripcion-corta">{producto.descripcion}</p>
                <p className="precio">{precioFormateado}</p>
            </Link>
            <button onClick={() => onAgregar(producto.id)}>Agregar al carrito</button>
        </div>
    )
}

export default ProductoCard