import { useEffect, useState } from 'react'
import ProductoCard from './components/ProductoCard'
import CarritoDetalle from './components/CarritoDetalle'
import './App.css'

function App() {
    const [productos, setProductos] = useState([])
    const [categorias, setCategorias] = useState([])
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null)
    const [carritoId, setCarritoId] = useState(null)
    const [carrito, setCarrito] = useState(null)
    const [mostrarCarrito, setMostrarCarrito] = useState(false)

    useEffect(() => {
        fetch('http://localhost:8080/api/productos')
            .then(res => res.json())
            .then(data => setProductos(data))

        fetch('http://localhost:8080/api/categorias')
            .then(res => res.json())
            .then(data => setCategorias(data))

        fetch('http://localhost:8080/api/carritos', { method: 'POST' })
            .then(res => res.json())
            .then(data => {
                setCarritoId(data.id)
                setCarrito(data)
            })
    }, [])

    const agregarAlCarrito = (productoId) => {
        fetch(`http://localhost:8080/api/carritos/${carritoId}/items?productoId=${productoId}&cantidad=1`, {
            method: 'POST'
        })
            .then(res => res.json())
            .then(data => setCarrito(data))
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
            .then(res => res.json())
            .then(data => setCarrito(data))
    }

    const productosFiltrados = categoriaSeleccionada
        ? productos.filter(p => p.categoria && p.categoria.id === categoriaSeleccionada)
        : productos

    return (
        <div className="layout">
            <header className="header">
                <h1>Catálogo de productos</h1>
                {carrito && (
                    <p className="carrito-info" onClick={() => setMostrarCarrito(true)}>
                        🛒 {carrito.items.length} items — {carrito.total?.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
                    </p>
                )}
            </header>

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
                    onEliminar={eliminarDelCarrito}
                    onActualizarCantidad={actualizarCantidad}
                    onCerrar={() => setMostrarCarrito(false)}
                />
            )}
        </div>
    )
}

export default App