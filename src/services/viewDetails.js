import { apiRequest } from '../api/client.js'

export const getAllViewDetails = async ({ access, watchedId }) => {
    const data = await apiRequest('/api/view-details/', {
        token: access,
        params: { watched: watchedId }
    })
    return data.results
}

export const updateViewDetails = async ({ payload, access }) => {
    return apiRequest('/api/view-details/', {
        method: 'POST',
        token: access,
        body: payload
    })
}

export const getViewDetails = async ({ movieId, access }) => {
    return apiRequest(`/api/view-details/${movieId}/`, { token: access })
}

export const deleteViewDetails = async ({ viewDetailsId, access }) => {
    return apiRequest(`/api/view-details/${viewDetailsId}/`, {
        method: 'DELETE',
        token: access
    })
}
