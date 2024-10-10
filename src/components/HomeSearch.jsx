import { useNavigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { SearchContext } from '../context/search.jsx'
import { Search } from './Search.jsx'

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
        <Search
            onChange={handleChange}
            onSubmit={handleSubmit}
        >
            <h1 className="text-4xl font-bold mb-4 ">Welcome!</h1>
        </Search>

    )
}