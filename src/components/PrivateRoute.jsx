import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { SesionContext } from '../context/sesion.jsx'

export function PrivateRoute({ children }) {
    const { sesion, deleteSesionExpiredSession } = useContext(SesionContext)
    const navigate = useNavigate()

    useEffect(() => {
        const isExpired = () => sesion.expiresAt ? Date.now() > sesion.expiresAt : true
        if (!sesion.auth || isExpired()) {
            deleteSesionExpiredSession()
            navigate('/login')
        }
    }, [])

    return sesion.auth ? children : null
}
