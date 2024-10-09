import { useNavigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { SearchContext } from '../context/search.jsx'

export function HomeSearch() {

    const { setSearch } = useContext(SearchContext)

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate('/search')
    }


    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    useEffect(() => {
        setSearch('')
    }, [])



    return (
        <section className="flex flex-col items-start gap-2 p-4  bg-gradient-to-r from-indigo-700 to-indigo-400 text-white">
            <h1 className="text-4xl font-bold mb-4 ">¡Bienvenido!</h1>
            <form className="flex w-full gap-2" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Busca una película ..."
                    onChange={handleChange}
                    className="grow  sm:w-auto p-2 border text-black border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <button
                    type="submit"
                    className="flex-shrink-0 sm:w-auto bg-indigo-700 p-2 rounded-sm hover:bg-indigo-800"
                >
                    Buscar
                </button>
            </form>
        </section>
    )
}