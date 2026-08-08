function ProductoCard({ producto, onAgregar }) {
    const precioFormateado = producto.precio.toLocaleString('es-AR', {
        style: 'currency',
        currency: 'ARS'
    })

    return (
        <div className="producto-card">
            <img src={producto.imagenUrl} alt={producto.nombre} />
            <h3>{producto.nombre}</h3>
            <p className="descripcion-corta">{producto.descripcion}</p>
            <p className="precio">{precioFormateado}</p>
            <button onClick={() => onAgregar(producto.id)}>Agregar al carrito</button>
        </div>
    )
}

export default ProductoCard