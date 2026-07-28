import { apiRequest } from '../api/client.js'

export const verifyResetPassword = async ({ uid, token, password, confirm }) => {
    return apiRequest(`/api/auth/reset_password/${uid}/${token}/`, {
        method: 'POST',
        body: { new_password: password, confirm_password: confirm }
    })
}
