import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

function ProductoDetalle() {
    const { id } = useParams()
    const [producto, setProducto] = useState(null)
    const [carritoId, setCarritoId] = useState(null)
    const [mensaje, setMensaje] = useState('')
    const [todosLosProductos, setTodosLosProductos] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8080/api/productos/${id}`)
            .then(res => res.json())
            .then(data => setProducto(data))

        fetch('http://localhost:8080/api/productos')
            .then(res => res.json())
            .then(data => setTodosLosProductos(data))

        const idGuardado = localStorage.getItem('carritoId')
        if (idGuardado) {
            setCarritoId(idGuardado)
        } else {
            fetch('http://localhost:8080/api/carritos', { method: 'POST' })
                .then(res => res.json())
                .then(data => {
                    setCarritoId(data.id)
                    localStorage.setItem('carritoId', data.id)
                })
        }
    }, [id])

    const agregarAlCarrito = () => {
        fetch(`http://localhost:8080/api/carritos/${carritoId}/items?productoId=${producto.id}&cantidad=1`, {
            method: 'POST'
        })
            .then(res => {
                if (!res.ok) {
                    return res.text().then(msg => { throw new Error(msg) })
                }
                return res.json()
            })
            .then(() => setMensaje('Producto agregado al carrito ✔'))
            .catch(err => setMensaje(err.message))
    }

    if (!producto) {
        return <div className="detalle-cargando">Cargando producto...</div>
    }

    const precioFormateado = producto.precio.toLocaleString('es-AR', {
        style: 'currency',
        currency: 'ARS'
    })

    const precioCuota = (producto.precio / 3).toLocaleString('es-AR', {
        style: 'currency',
        currency: 'ARS'
    })

    const stockBajo = producto.stock > 0 && producto.stock < 5
    const sinStock = producto.stock === 0

    const relacionados = todosLosProductos.filter(p =>
        p.id !== producto.id && p.categoria?.id === producto.categoria?.id
    ).slice(0, 4)

    return (
        <div className="detalle-layout">
            <header className="detalle-header">
                <Link to="/" className="detalle-volver">← Volver al catálogo</Link>
                <span className="detalle-logo">🦽 BL <strong>Importaciones</strong></span>
            </header>

            <div className="detalle-contenido">
                <div className="detalle-imagen">
                    <img src={producto.imagenUrl} alt={producto.nombre} />
                </div>

                <div className="detalle-info">
                    {producto?.categoria?.nombre && (
                        <span className="detalle-categoria">{producto.categoria.nombre}</span>
                    )}
                    <h1>{producto.nombre}</h1>

                    <div className="detalle-precio-bloque">
                        <span className="detalle-precio">{precioFormateado}</span>
                        <span className="detalle-cuotas">3x {precioCuota} sin interés</span>
                    </div>

                    <div className="detalle-stock">
                        {sinStock && <span className="badge-sin-stock">Sin stock</span>}
                        {stockBajo && <span className="badge-stock-bajo">¡Últimas {producto.stock} unidades!</span>}
                        {!sinStock && !stockBajo && <span className="badge-en-stock">✔ En stock</span>}
                    </div>

                    <span className="detalle-envio">🚚 Envío en 24-48hs a todo el país</span>

                    <button
                        className="detalle-boton-agregar"
                        onClick={agregarAlCarrito}
                        disabled={sinStock}
                    >
                        {sinStock ? 'Sin stock' : 'Agregar al carrito'}
                    </button>

                    {mensaje && <p className="detalle-mensaje">{mensaje}</p>}
                </div>
            </div>

            <div className="detalle-descripcion-completa">
                <h2>Descripción del producto</h2>
                <p>{producto.descripcion}</p>
            </div>

            {relacionados.length > 0 && (
                <div className="detalle-relacionados">
                    <h2>Productos relacionados</h2>
                    <div className="detalle-relacionados-grid">
                        {relacionados.map(p => (
                            <a key={p.id} href={`/producto/${p.id}`} className="relacionado-card">
                                <img src={p.imagenUrl} alt={p.nombre} />
                                <p className="relacionado-nombre">{p.nombre}</p>
                                <p className="relacionado-precio">
                                    {p.precio.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
                                </p>
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductoDetalle