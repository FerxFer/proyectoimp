function ProductoCard({ producto }) {
    return (
        <div className="producto-card">
            <img src={producto.imagenUrl} alt={producto.nombre} />
            <h3>{producto.nombre}</h3>
            <p className="precio">${producto.precio}</p>
            <button>Agregar al carrito</button>
        </div>
    )
}

export default ProductoCard