import { useEffect, useState } from 'react'
import ProductoCard from './components/ProductoCard'
import './App.css'

function App() {
    const [productos, setProductos] = useState([])

    useEffect(() => {
        fetch('http://localhost:8080/api/productos')
            .then(res => res.json())
            .then(data => setProductos(data))
    }, [])

    return (
        <div>
            <h1>Catálogo de productos</h1>
            <div className="catalogo">
                {productos.map(producto => (
                    <ProductoCard key={producto.id} producto={producto} />
                ))}
            </div>
        </div>
    )
}

export default App