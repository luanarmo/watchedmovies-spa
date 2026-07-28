import { apiRequest } from '../api/client.js'

export const verifyEmail = async ({ uid, token }) => {
    return apiRequest(`/api/auth/verify_email/${uid}/${token}`)
}
