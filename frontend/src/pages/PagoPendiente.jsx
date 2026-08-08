import { Link } from 'react-router-dom'

function PagoPendiente() {
    return (
        <div className="pago-resultado">
            <div className="pago-resultado-card">
                <div className="pago-icono pendiente">⏳</div>
                <h1>Pago pendiente</h1>
                <p>Te avisaremos cuando se confirme.</p>
                <Link to="/" className="pago-boton">Volver al catálogo</Link>
            </div>
        </div>
    )
}

export default PagoPendiente