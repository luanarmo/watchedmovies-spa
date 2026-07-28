import { apiRequest } from '../api/client.js'

export const getStats = async ({ access, year }) => {
    return apiRequest('/api/watched-movies/stats/', {
        token: access,
        params: year ? { year } : {}
    })
}
