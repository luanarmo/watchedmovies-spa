const BASE_API_URL = import.meta.env.VITE_BASE_API_URL


export const sendEmailResetPassword = async ({ email }) => {

    const response = await fetch(`${BASE_API_URL}/api/anonymous/send_password_reset_email/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.detail || "An unexpected error occurred")
    }

    return data.status === 'ok'
}