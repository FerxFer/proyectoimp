function CarritoDetalle({ carrito, carritoId, onEliminar, onActualizarCantidad, onCerrar }) {
    if (!carrito) return null

    const pagar = () => {
        fetch(`http://localhost:8080/api/pagos/${carritoId}`, { method: 'POST' })
            .then(res => res.json())
            .then(data => {
                window.location.href = data.linkPago
            })
    }

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
                {carrito.items.length > 0 && (
                    <button className="pagar-btn" onClick={pagar}>Pagar</button>
                )}
                <button className="cerrar-btn" onClick={onCerrar}>Cerrar</button>
            </div>
        </div>
    )
}

export default CarritoDetalle