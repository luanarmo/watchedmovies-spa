import { createContext, useState, useEffect } from 'react';

export const SesionContext = createContext();

export const SesionProvider = ({ children }) => {
    const [sesion, setSesion] = useState({
        auth: false,
        access: null,
        refresh: null,
        expiresAt: null
    });

    useEffect(() => {
        const storedSesion = localStorage.getItem('sesion');
        if (storedSesion) {
            const parsedSesion = JSON.parse(storedSesion);
            setSesion(parsedSesion);
        }
    }, []); // Solo se ejecuta una vez al montar el componente

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
        setSesion({
            auth: false,
            access: null,
            refresh: null,
            expiresAt: null
        });
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
