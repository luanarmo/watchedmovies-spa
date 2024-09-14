import { useState, useRef, useEffect } from 'react'

export function useQuery() {
    const [query, setQuery] = useState('')
    const [error, setError] = useState(null)
    const isFirstInput = useRef(true)


    useEffect(() => {
        if (isFirstInput.current) {
            isFirstInput.current = query === ''
            return
        }

        if (query === '') {
            setError('No se puede realizar una búsqueda vacía')
            return
        }

        if (query.match(/^\d+$/)) {
            setError('No se puede realizar una búsqueda solo con números')
            return
        }

        if (query.length < 3) {
            setError('La búsqueda debe tener al menos 3 caracteres')
            return
        }

        setError(null)

    }, [query])

    return { query, setQuery, error }

}
