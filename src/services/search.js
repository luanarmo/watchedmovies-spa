const BASE_API_URL = import.meta.env.VITE_BASE_API_URL

export const searchMovies = async ({ query }) => {
    // Fetch movies from the API based on the query
    if (query === '') return null


    try {
        const response = await fetch(`${BASE_API_URL}/api/tmdb/search-movies/${query}/`)
        const movies = await response.json()

        // Change serialization the movies to avoid depending on the API response
        return movies.map((movie) => ({
            id: movie.id,
            title: movie.title,
            poster_url: movie.poster_url ? movie.poster_url : 'https://placehold.co/500x750?font=roboto',
        }))

    } catch (e) {
        throw new Error(`Error fetching movies ${e}`)
    }

}
