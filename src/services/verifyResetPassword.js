const BASE_API_URL = import.meta.env.VITE_BASE_API_URL


export const verifyResetPassword = async ({ uid, token, password, confirm }) => {

    const response = await fetch(`${BASE_API_URL}/api/auth/reset_password/${uid}/${token}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'new_password': password, 'confirm_password': confirm })
    })

    if (!response.ok) {
        throw new Error(response.detail || "An unexpected error occurred")
    }

    return response.status
}