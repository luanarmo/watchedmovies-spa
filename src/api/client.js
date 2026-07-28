function buildHeaders(token) {
    const headers = { 'Content-Type': 'application/json' }
    if (token) headers['Authorization'] = `Bearer ${token}`
    return headers
}

export async function apiRequest(path, { token, method = 'GET', body, params } = {}) {
    const BASE_URL = import.meta.env.VITE_BASE_API_URL
    const url = new URL(`${BASE_URL}${path}`)
    if (params) {
        Object.entries(params).forEach(([k, v]) => {
            if (v !== null && v !== undefined) url.searchParams.append(k, v)
        })
    }

    const res = await fetch(url.toString(), {
        method,
        headers: buildHeaders(token),
        body: body !== undefined ? JSON.stringify(body) : undefined,
    })

    if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.detail || data.message || `HTTP ${res.status}`)
    }

    if (res.status === 204) return null
    return res.json()
}

export async function apiRequestBlob(path, { token, params } = {}) {
    const BASE_URL = import.meta.env.VITE_BASE_API_URL
    const url = new URL(`${BASE_URL}${path}`)
    if (params) {
        Object.entries(params).forEach(([k, v]) => {
            if (v !== null && v !== undefined) url.searchParams.append(k, v)
        })
    }

    const res = await fetch(url.toString(), {
        headers: buildHeaders(token),
    })

    if (!res.ok) {
        throw new Error(`HTTP ${res.status}`)
    }

    return res.blob()
}
