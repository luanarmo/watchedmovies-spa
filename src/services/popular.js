const BASE_API_URL = import.meta.env.VITE_BASE_API_URL

export const popularMovies = async () => {
    // Fetch popular movies from the API

    try {
        const response = await fetch(`${BASE_API_URL}/api/tmdb/popular_movies/`)
        const movies = await response.json()
        return movies.map((movie) => ({
            id: movie.id,
            title: movie.title,
            poster_url: movie.poster_url ? movie.poster_url : 'https://placehold.co/500x750?font=roboto',
        }))

    } catch (e) {
        throw new Error(`Error fetching popular movies ${e}`)
    }

}
