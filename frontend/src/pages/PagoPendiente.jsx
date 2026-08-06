import { Link } from 'react-router-dom'

function PagoPendiente() {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>⏳ Pago pendiente</h1>
            <p>Te avisaremos cuando se confirme.</p>
            <Link to="/">Volver al catálogo</Link>
        </div>
    )
}

export default PagoPendiente