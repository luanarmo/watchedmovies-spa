const BASE_API_URL = import.meta.env.VITE_BASE_API_URL

export const getAllPlanMovies = async ({ access, page }) => {
    try {
        const response = await fetch(`${BASE_API_URL}/api/plan-to-watch/?page=${page}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access}`
            }
        })
        const planMovies = await response.json()

        if (!response.ok) {
            throw new Error(planMovies.detail)
        }

        // check if there are movies in the plan
        if (planMovies.results.length === 0) {
            return { planMovies: [], count: 0, next: null, previous: null }
        }

        const movies = planMovies.results.map((movie) => {
            return {
                id: movie.movie.id,
                title: movie.movie.title,
                overview: movie.movie.overview,
                poster_url: movie.movie.poster_url ? movie.movie.poster_url : 'https://placehold.co/500x750?font=roboto',
                release_date: movie.movie.release_date ? movie.movie.release_date : 'Unknown',
                vote_average: movie.movie.vote_average,
                vote_count: movie.movie.vote_count,
                genres: movie.movie.genres,
                runtime: movie.movie.runtime,
                tagline: movie.movie.tagline
            }
        })

        return { planMovies: movies, count: planMovies.count, next: planMovies.next, previous: planMovies.previous }

    } catch (e) {
        throw new Error(`Error fetching plan movies ${e}`)
    }

}

export const addPlanMovie = async ({ movie, access }) => {
    const pload = { movie }

    try {
        const response = await fetch(`${BASE_API_URL}/api/plan-to-watch/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access}`
            },
            body: JSON.stringify(pload)
        })
        const planMovie = await response.json()

        return planMovie

    } catch (e) {
        throw new Error(`Error fetching plan movies ${e}`)
    }

}

export const retrievePlanMovie = async ({ id, access }) => {
    try {
        const response = await fetch(`${BASE_API_URL}/api/plan-to-watch/${id}/`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access}`
            }
        })

        if (!response.ok) {
            return null
        }

        const planMovie = await response.json()

        return planMovie

    } catch (e) {
        throw new Error(`Error fetching plan movies ${e}`)
    }

}

export const removePlanMovie = async ({ movieId, access }) => {
    try {
        await fetch(`${BASE_API_URL}/api/plan-to-watch/${movieId}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access}`
            }
        })

    } catch (e) {
        throw new Error(`Error fetching plan movies ${e}`)
    }

}