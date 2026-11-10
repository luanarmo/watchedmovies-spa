import { apiRequest } from '../api/client.js'
import { invalidateYears } from './watchedMoviesServices.js'

export const getAllViewDetails = async ({ access, watchedId }) => {
    const data = await apiRequest('/api/view-details/', {
        token: access,
        params: { watched: watchedId }
    })
    return data.results
}

export const patchViewDetails = async ({ id, payload, access }) => {
    const data = await apiRequest(`/api/view-details/${id}/`, {
        method: 'PATCH',
        token: access,
        body: payload
    })
    // the watched date can move a view to another year
    invalidateYears()
    return data
}

export const getViewDetails = async ({ movieId, access }) => {
    return apiRequest(`/api/view-details/${movieId}/`, { token: access })
}

export const deleteViewDetails = async ({ viewDetailsId, access }) => {
    const data = await apiRequest(`/api/view-details/${viewDetailsId}/`, {
        method: 'DELETE',
        token: access
    })
    invalidateYears()
    return data
}
