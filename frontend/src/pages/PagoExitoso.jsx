import { Link } from 'react-router-dom'

function PagoExitoso() {
    return (
        <div className="pago-resultado">
            <div className="pago-resultado-card">
                <div className="pago-icono exito">✅</div>
                <h1>¡Pago exitoso!</h1>
                <p>Gracias por tu compra. Te vamos a contactar para coordinar la entrega.</p>
                <Link to="/" className="pago-boton">Volver al catálogo</Link>
            </div>
        </div>
    )
}

export default PagoExitoso