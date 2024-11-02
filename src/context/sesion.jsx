import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

export const SesionContext = createContext();

export const SesionProvider = ({ children }) => {
    // Cargar sesión desde localStorage o usar valores por defecto
    const initialSesion = JSON.parse(localStorage.getItem('sesion')) || {
        auth: false,
        access: null,
        refresh: null,
        expiresAt: null
    };

    const navigate = useNavigate();

    const [sesion, setSesion] = useState(initialSesion);

    // Guardar sesión en localStorage cada vez que cambie
    useEffect(() => {
        localStorage.setItem('sesion', JSON.stringify(sesion));
        const interval = setInterval(() => {
            if (isExpired()) {
                deleteSesionExpiredSession();
                navigate('/login');
            }
        }, 60000);

        return () => clearInterval(interval);

    }, [sesion]);



    const deleteSesionExpiredSession = () => {
        localStorage.removeItem('sesion');
        setSesion({
            auth: false,
            access: null,
            refresh: null
        });
    }

    const isExpired = () => {
        return sesion.expiresAt ? Date.now() > sesion.expiresAt : true;
    }

    return (
        <SesionContext.Provider value={{ sesion, setSesion, deleteSesionExpiredSession }}>
            {children}
        </SesionContext.Provider>
    );
};
