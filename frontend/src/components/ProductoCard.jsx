function ProductoCard({ producto, onAgregar }) {
    return (
        <div className="producto-card">
            <img src={producto.imagenUrl} alt={producto.nombre} />
            <h3>{producto.nombre}</h3>
            <p className="precio">${producto.precio}</p>
            <button onClick={() => onAgregar(producto.id)}>Agregar al carrito</button>
        </div>
    )
}

export default ProductoCard