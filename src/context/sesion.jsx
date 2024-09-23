import { createContext, useState, useEffect } from 'react';

export const SesionContext = createContext();

export const SesionProvider = ({ children }) => {
    // Cargar sesión desde localStorage o usar valores por defecto
    const initialSesion = JSON.parse(localStorage.getItem('sesion')) || {
        auth: false,
        access: null,
        refresh: null
    };

    const [sesion, setSesion] = useState(initialSesion);

    // Guardar sesión en localStorage cada vez que cambie
    useEffect(() => {
        localStorage.setItem('sesion', JSON.stringify(sesion));
    }, [sesion]);



    const deleteSesionExpiredSession = () => {
        localStorage.removeItem('sesion');
        setSesion({
            auth: false,
            access: null,
            refresh: null
        });
    }




    return (
        <SesionContext.Provider value={{ sesion, setSesion, deleteSesionExpiredSession }}>
            {children}
        </SesionContext.Provider>
    );
};
