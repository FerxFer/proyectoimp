import { Routes, Route } from 'react-router-dom'
import Catalogo from './pages/Catalogo'
import PagoExitoso from './pages/PagoExitoso'
import PagoFallido from './pages/PagoFallido'
import PagoPendiente from './pages/PagoPendiente'
import './App.css'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Catalogo />} />
            <Route path="/pago-exitoso" element={<PagoExitoso />} />
            <Route path="/pago-fallido" element={<PagoFallido />} />
            <Route path="/pago-pendiente" element={<PagoPendiente />} />
        </Routes>
    )
}

export default App