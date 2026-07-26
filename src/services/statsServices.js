const BASE_API_URL = import.meta.env.VITE_BASE_API_URL

export const getStats = async ({ access, year }) => {
    const url = year
        ? `${BASE_API_URL}/api/watched-movies/stats/?year=${year}`
        : `${BASE_API_URL}/api/watched-movies/stats/`

    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access}`
            }
        })

        if (!response.ok) {
            throw new Error('Error fetching stats')
        }

        return await response.json()
    } catch (e) {
        throw new Error(`Error fetching stats: ${e}`)
    }
}
