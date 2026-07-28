import { apiRequest } from '../api/client.js'

export const sendEmailResetPassword = async ({ email }) => {
    const data = await apiRequest('/api/anonymous/send_password_reset_email/', {
        method: 'POST',
        body: { email }
    })
    return data.status === 'ok'
}
