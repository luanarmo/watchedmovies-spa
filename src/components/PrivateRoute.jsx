import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { SessionContext } from '../context/session.jsx'

export function PrivateRoute({ children }) {
    const { session, deleteExpiredSession } = useContext(SessionContext)
    const navigate = useNavigate()

    useEffect(() => {
        const isExpired = () => session.expiresAt ? Date.now() > session.expiresAt : true
        if (!session.auth || isExpired()) {
            deleteExpiredSession()
            navigate('/login')
        }
    }, [])

    return session.auth ? children : null
}
