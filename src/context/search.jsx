import { createContext, useState, useEffect } from 'react';

export const SearchContext = createContext();


export const SearchProvider = ({ children }) => {
    // Cargar búsqueda desde localStorage o usar valores por defecto
    const initialSearch = JSON.parse(localStorage.getItem('search')) || {
        query: ''
    }

    const [search, setSearch] = useState(initialSearch)

    // Guardar búsqueda en localStorage cada vez que cambie
    useEffect(() => {
        localStorage.setItem('search', JSON.stringify(search));
    }, [search])


    const deleteSearch = () => {
        localStorage.removeItem('search');
        setSearch({
            query: ''
        });
    }

    return (
        <SearchContext.Provider value={{ search, setSearch, deleteSearch }}>
            {children}
        </SearchContext.Provider>
    );

}