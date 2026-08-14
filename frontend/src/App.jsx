import { Routes, Route } from 'react-router-dom'
import Catalogo from './pages/Catalogo'
import PagoExitoso from './pages/PagoExitoso'
import PagoFallido from './pages/PagoFallido'
import PagoPendiente from './pages/PagoPendiente'
import './App.css'
import ProductoDetalle from './pages/ProductoDetalle'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Catalogo />} />
            <Route path="/pago-exitoso" element={<PagoExitoso />} />
            <Route path="/pago-fallido" element={<PagoFallido />} />
            <Route path="/pago-pendiente" element={<PagoPendiente />} />
            <Route path="/producto/:id" element={<ProductoDetalle />} />
        </Routes>
    )
}

export default App