import { apiRequest } from '../api/client.js'

export const login = async ({ email, password, token }) => {
    return apiRequest('/api/auth/login/', {
        method: 'POST',
        body: { email, password, token }
    })
}
