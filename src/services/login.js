const BASE_API_URL = import.meta.env.VITE_BASE_API_URL

export const login = async ({ email, password }) => {
    // Log in the user
    try {
        const response = await fetch(`${BASE_API_URL}/api/auth/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        const data = await response.json()
        return data

    } catch (e) {
        throw new Error(`Error logging in ${e}`)
    }

}