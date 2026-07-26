import { createContext, useState, useEffect } from 'react';

export const SearchContext = createContext();


export const SearchProvider = ({ children }) => {
    const stored = JSON.parse(localStorage.getItem('search'))
    const initialSearch = typeof stored === 'string' ? stored : ''

    const [search, setSearch] = useState(initialSearch)

    // Guardar búsqueda en localStorage cada vez que cambie
    useEffect(() => {
        localStorage.setItem('search', JSON.stringify(search));
    }, [search])


    const deleteSearch = () => {
        localStorage.removeItem('search');
        setSearch('');
    }

    return (
        <SearchContext.Provider value={{ search, setSearch, deleteSearch }}>
            {children}
        </SearchContext.Provider>
    );

}