import { useEffect, useState } from 'react'
import ProductoCard from '../components/ProductoCard'
import CarritoDetalle from '../components/CarritoDetalle'

function Catalogo() {
    const [productos, setProductos] = useState([])
    const [categorias, setCategorias] = useState([])
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null)
    const [carritoId, setCarritoId] = useState(null)
    const [carrito, setCarrito] = useState(null)
    const [mostrarCarrito, setMostrarCarrito] = useState(false)
    const [textoBusqueda, setTextoBusqueda] = useState('')

    useEffect(() => {
        fetch('http://localhost:8080/api/productos')
            .then(res => res.json())
            .then(data => setProductos(data))

        fetch('http://localhost:8080/api/categorias')
            .then(res => res.json())
            .then(data => setCategorias(data))

        const idGuardado = localStorage.getItem('carritoId')

        if (idGuardado) {
            fetch(`http://localhost:8080/api/carritos/${idGuardado}`)
                .then(res => res.json())
                .then(data => {
                    setCarritoId(data.id)
                    setCarrito(data)
                })
        } else {
            fetch('http://localhost:8080/api/carritos', { method: 'POST' })
                .then(res => res.json())
                .then(data => {
                    setCarritoId(data.id)
                    setCarrito(data)
                    localStorage.setItem('carritoId', data.id)
                })
        }
    }, [])

    const agregarAlCarrito = (productoId) => {
        fetch(`http://localhost:8080/api/carritos/${carritoId}/items?productoId=${productoId}&cantidad=1`, {
            method: 'POST'
        })
            .then(res => {
                if (!res.ok) {
                    return res.text().then(msg => { throw new Error(msg) })
                }
                return res.json()
            })
            .then(data => setCarrito(data))
            .catch(err => alert(err.message))
    }

    const eliminarDelCarrito = (itemId) => {
        fetch(`http://localhost:8080/api/carritos/${carritoId}/items/${itemId}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => setCarrito(data))
    }

    const actualizarCantidad = (itemId, nuevaCantidad) => {
        if (nuevaCantidad < 1) return
        fetch(`http://localhost:8080/api/carritos/${carritoId}/items/${itemId}?cantidad=${nuevaCantidad}`, {
            method: 'PUT'
        })
            .then(res => {
                if (!res.ok) {
                    return res.text().then(msg => { throw new Error(msg) })
                }
                return res.json()
            })
            .then(data => setCarrito(data))
            .catch(err => alert(err.message))
    }
    const normalizar = (texto) =>
        texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

    const productosFiltrados = productos
        .filter(p => categoriaSeleccionada === null || (p.categoria && p.categoria.id === categoriaSeleccionada))
        .filter(p => normalizar(p.nombre).includes(normalizar(textoBusqueda)))
    return (
        <div className="layout">
            <header className="header">
                <div className="logo">
                    <span className="logo-icon">🦽</span>
                    <span className="logo-texto">BL <strong>Importaciones</strong></span>
                </div>
                <h1>Catálogo de productos</h1>
                <input
                    type="text"
                    placeholder="Buscar productos..."
                    value={textoBusqueda}
                    onChange={(e) => setTextoBusqueda(e.target.value)}
                    className="buscador-input"
                />
                {carrito && (
                    <p className="carrito-info" onClick={() => setMostrarCarrito(true)}>
                        🛒 {carrito.items.length} items — {carrito.total?.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
                    </p>
                )}
            </header>

            <div className="banner">
                <p>🚚 Envíos a todo el país — Pagá con Mercado Pago en cuotas</p>
            </div>

            <div className="contenido">
                <aside className="sidebar">
                    <h3>Categorías</h3>
                    <ul>
                        <li
                            className={categoriaSeleccionada === null ? 'activo' : ''}
                            onClick={() => setCategoriaSeleccionada(null)}
                        >
                            Todas
                        </li>
                        {categorias.map(cat => (
                            <li
                                key={cat.id}
                                className={categoriaSeleccionada === cat.id ? 'activo' : ''}
                                onClick={() => setCategoriaSeleccionada(cat.id)}
                            >
                                {cat.nombre}
                            </li>
                        ))}
                    </ul>
                </aside>

                <main className="catalogo">
                    {productosFiltrados.map(producto => (
                        <ProductoCard key={producto.id} producto={producto} onAgregar={agregarAlCarrito} />
                    ))}
                </main>
            </div>

            {mostrarCarrito && (
                <CarritoDetalle
                    carrito={carrito}
                    carritoId={carritoId}
                    onEliminar={eliminarDelCarrito}
                    onActualizarCantidad={actualizarCantidad}
                    onCerrar={() => setMostrarCarrito(false)}
                />
            )}
        </div>
    )
}

export default Catalogo