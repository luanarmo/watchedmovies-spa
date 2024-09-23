const BASE_API_URL = import.meta.env.VITE_BASE_API_URL

export const getProfile = async ({ access }) => {
    // Fetch the user profile
    try {
        const response = await fetch(`${BASE_API_URL}/api/users/me/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access}`
            }
        })
        const data = await response.json()
        return data

    } catch (e) {
        throw new Error(`Error fetching profile ${e}`)
    }

}
