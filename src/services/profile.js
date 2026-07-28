import { apiRequest } from '../api/client.js'

export const getProfile = async ({ access }) => {
    return apiRequest('/api/users/me/', { token: access })
}

export const updateProfile = async ({ access, payload }) => {
    return apiRequest('/api/users/partial_update_user/', {
        method: 'PATCH',
        token: access,
        body: payload
    })
}
