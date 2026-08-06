import { Link } from 'react-router-dom'

function PagoFallido() {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>❌ El pago no se pudo procesar</h1>
            <p>Intentá nuevamente o usá otro medio de pago.</p>
            <Link to="/">Volver al catálogo</Link>
        </div>
    )
}

export default PagoFallido