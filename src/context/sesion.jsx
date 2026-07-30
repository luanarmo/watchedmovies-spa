import { createContext, useState, useEffect } from 'react';

export const SesionContext = createContext();

const defaultSesion = { auth: false, access: null, refresh: null, expiresAt: null };

export const SesionProvider = ({ children }) => {
    const [sesion, setSesion] = useState(() => {
        try {
            const stored = localStorage.getItem('sesion');
            return stored ? JSON.parse(stored) : defaultSesion;
        } catch {
            return defaultSesion;
        }
    });

    useEffect(() => {
        if (sesion.auth) {
            localStorage.setItem('sesion', JSON.stringify(sesion));
        }
    }, [sesion]); // Solo se actualiza si la sesión cambia

    const isExpired = () => {
        if (sesion.expiresAt) {
            return Date.now() > sesion.expiresAt;
        }
        return true; // Si no hay fecha de expiración, consideramos que ha expirado
    };

    const deleteSesionExpiredSession = () => {
        localStorage.removeItem('sesion');
        setSesion(defaultSesion);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (isExpired()) {
                deleteSesionExpiredSession();
            }
        }, 60000); // Cada 60 segundos

        return () => clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonta
    }, [sesion]);

    return (
        <SesionContext.Provider value={{ sesion, setSesion, deleteSesionExpiredSession }}>
            {children}
        </SesionContext.Provider>
    );
};
