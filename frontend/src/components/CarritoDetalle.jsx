function CarritoDetalle({ carrito, onEliminar, onActualizarCantidad, onCerrar }) {
    if (!carrito) return null

    return (
        <div className="carrito-overlay" onClick={onCerrar}>
            <div className="carrito-panel" onClick={(e) => e.stopPropagation()}>
                <h2>Tu carrito</h2>
                {carrito.items.length === 0 ? (
                    <p>El carrito está vacío</p>
                ) : (
                    carrito.items.map(item => (
                        <div key={item.id} className="carrito-item">
                            <img src={item.producto.imagenUrl} alt={item.producto.nombre} />
                            <div className="carrito-item-info">
                                <p>{item.producto.nombre}</p>
                                <div className="cantidad-control">
                                    <button onClick={() => onActualizarCantidad(item.id, item.cantidad - 1)}>-</button>
                                    <span>{item.cantidad}</span>
                                    <button onClick={() => onActualizarCantidad(item.id, item.cantidad + 1)}>+</button>
                                </div>
                            </div>
                            <button className="eliminar-btn" onClick={() => onEliminar(item.id)}>✕</button>
                        </div>
                    ))
                )}
                <div className="carrito-total">
                    Total: {carrito.total?.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
                </div>
                <button className="cerrar-btn" onClick={onCerrar}>Cerrar</button>
            </div>
        </div>
    )
}

export default CarritoDetalle