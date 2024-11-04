const BASE_API_URL = import.meta.env.VITE_BASE_API_URL

export const register = async ({ email, password, confirmPassword, token }) => {

    const response = await fetch(`${BASE_API_URL}/api/anonymous/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, confirm_password: confirmPassword, token })
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.detail || "An unexpected error occurred")
    }

    return data
}