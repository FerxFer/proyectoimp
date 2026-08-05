import { useEffect, useState } from 'react'
import ProductoCard from './components/ProductoCard'
import './App.css'

function App() {
    const [productos, setProductos] = useState([])
    const [categorias, setCategorias] = useState([])
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null)
    const [carritoId, setCarritoId] = useState(null)
    const [carrito, setCarrito] = useState(null)

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

    const productosFiltrados = categoriaSeleccionada
        ? productos.filter(p => p.categoria && p.categoria.id === categoriaSeleccionada)
        : productos

    return (
        <div>
            <h1>Catálogo de productos</h1>

            {carrito && (
                <p style={{ textAlign: 'center' }}>
                    🛒 Items en carrito: {carrito.items.length} — Total: ${carrito.total}
                </p>
            )}

            <div className="filtros">
                <button
                    className={categoriaSeleccionada === null ? 'activo' : ''}
                    onClick={() => setCategoriaSeleccionada(null)}
                >
                    Todas
                </button>
                {categorias.map(cat => (
                    <button
                        key={cat.id}
                        className={categoriaSeleccionada === cat.id ? 'activo' : ''}
                        onClick={() => setCategoriaSeleccionada(cat.id)}
                    >
                        {cat.nombre}
                    </button>
                ))}
            </div>

            <div className="catalogo">
                {productosFiltrados.map(producto => (
                    <ProductoCard key={producto.id} producto={producto} onAgregar={agregarAlCarrito} />
                ))}
            </div>
        </div>
    )
}

export default App