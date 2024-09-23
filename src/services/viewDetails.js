const BASE_API_URL = import.meta.env.VITE_BASE_API_URL


export const getAllViewDetails = async ({ access, watchedId }) => {
    try {
        const response = await fetch(`${BASE_API_URL}/api/view-details/?watched=${watchedId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access}`
            }
        })
        const viewDetails = await response.json()

        return viewDetails.results

    } catch (e) {
        throw new Error(`Error fetching view details ${e}`)
    }

}


export const updateViewDetails = async ({ payload, access }) => {
    try {
        const response = await fetch(`${BASE_API_URL}/api/view-details/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access}`
            },
            body: JSON.stringify(payload)
        })
        const viewDetails = await response.json()

        return viewDetails

    } catch (e) {
        throw new Error(`Error fetching view details ${e}`)
    }

}

export const getViewDetails = async ({ movieId, access }) => {

    try {
        const response = await fetch(`${BASE_API_URL}/api/view-details/${movieId}/`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access}`
            }
        })

        const viewDetails = await response.json()

        return viewDetails

    } catch (e) {

        throw new Error(`Error fetching view details ${e}`)
    }
}