import { apiRequest } from '../api/client.js'

export const register = async ({ email, password, confirmPassword, token }) => {
    return apiRequest('/api/anonymous/', {
        method: 'POST',
        body: { email, password, confirm_password: confirmPassword, token }
    })
}
