import { createContext, useState } from 'react'


export const SesionContext = createContext()

export const SesionProvider = ({ children }) => {
    const [sesion, setSesion] = useState({
        user: null,
        auth: false,
        access: null,
        refresh: null
    })

    return (
        <SesionContext.Provider value={{ sesion, setSesion }}>
            {children}
        </SesionContext.Provider>
    )
}