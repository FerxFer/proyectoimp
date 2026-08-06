import { Link } from 'react-router-dom'

function PagoExitoso() {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>✅ ¡Pago exitoso!</h1>
            <p>Gracias por tu compra.</p>
            <Link to="/">Volver al catálogo</Link>
        </div>
    )
}

export default PagoExitoso