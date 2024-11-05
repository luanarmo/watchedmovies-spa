const BASE_API_URL = import.meta.env.VITE_BASE_API_URL

export const verifyEmail = async ({ uid, token }) => {

    const response = await fetch(`${BASE_API_URL}/api/auth/verify_email/${uid}/${token}`)

    if (!response.ok) {
        throw new Error(response.detail || "An unexpected error occurred")
    }

    return response.status
}