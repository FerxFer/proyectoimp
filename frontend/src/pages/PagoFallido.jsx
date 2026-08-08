import { Link } from 'react-router-dom'

function PagoFallido() {
    return (
        <div className="pago-resultado">
            <div className="pago-resultado-card">
                <div className="pago-icono fallido">❌</div>
                <h1>El pago no se pudo procesar</h1>
                <p>Intentá nuevamente o usá otro medio de pago.</p>
                <Link to="/" className="pago-boton">Volver al catálogo</Link>
            </div>
        </div>
    )
}

export default PagoFallido