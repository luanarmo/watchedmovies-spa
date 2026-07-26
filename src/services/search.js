const BASE_API_URL = import.meta.env.VITE_BASE_API_URL

export const searchMovies = async ({ query, page = 1 }) => {
    if (query === '') return null

    try {
        const response = await fetch(`${BASE_API_URL}/api/tmdb/search-movies/${query}/?page=${page}`)
        const data = await response.json()

        return {
            movies: data.results.map((movie) => ({
                id: movie.id,
                title: movie.title,
                poster_url: movie.poster_url ? movie.poster_url : 'https://placehold.co/500x750?font=roboto',
            })),
            totalPages: data.total_pages,
            totalResults: data.total_results,
        }
    } catch (e) {
        throw new Error(`Error fetching movies ${e}`)
    }
}
