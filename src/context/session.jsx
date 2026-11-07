import { createContext, useState, useEffect } from 'react';

export const SessionContext = createContext();

const defaultSession = { auth: false, access: null, refresh: null, expiresAt: null };

export const SessionProvider = ({ children }) => {
    const [session, setSession] = useState(() => {
        try {
            const stored = localStorage.getItem('sesion');
            return stored ? JSON.parse(stored) : defaultSession;
        } catch {
            return defaultSession;
        }
    });

    useEffect(() => {
        if (session.auth) {
            localStorage.setItem('sesion', JSON.stringify(session));
        }
    }, [session]); // Solo se actualiza si la sesión cambia

    const isExpired = () => {
        if (session.expiresAt) {
            return Date.now() > session.expiresAt;
        }
        return true; // Si no hay fecha de expiración, consideramos que ha expirado
    };

    const deleteExpiredSession = () => {
        localStorage.removeItem('sesion');
        setSession(defaultSession);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (isExpired()) {
                deleteExpiredSession();
            }
        }, 60000); // Cada 60 segundos

        return () => clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonta
    }, [session]);

    return (
        <SessionContext.Provider value={{ session, setSession, deleteExpiredSession }}>
            {children}
        </SessionContext.Provider>
    );
};
