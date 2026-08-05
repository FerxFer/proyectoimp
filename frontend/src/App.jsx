import { useEffect, useState } from 'react'

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
        <ul>
          {productos.map(producto => (
              <li key={producto.id}>{producto.nombre} - ${producto.precio}</li>
          ))}
        </ul>
      </div>
  )
}

export default App