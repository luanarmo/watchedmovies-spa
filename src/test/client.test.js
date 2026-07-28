import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { apiRequest, apiRequestBlob } from '../api/client'

const BASE = 'http://localhost:8000/api'

beforeEach(() => {
    vi.stubEnv('VITE_BASE_API_URL', BASE)
})

afterEach(() => {
    vi.unstubAllEnvs()
    vi.restoreAllMocks()
})

describe('apiRequest', () => {
    it('returns parsed JSON on success', async () => {
        const mockData = { id: 1, title: 'Test Movie' }
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: true,
            status: 200,
            json: () => Promise.resolve(mockData),
        }))

        const result = await apiRequest('/movies/')
        expect(result).toEqual(mockData)
    })

    it('includes Authorization header when token is provided', async () => {
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: true,
            status: 200,
            json: () => Promise.resolve({}),
        }))

        await apiRequest('/movies/', { token: 'abc123' })

        const [, options] = fetch.mock.calls[0]
        expect(options.headers['Authorization']).toBe('Bearer abc123')
    })

    it('does not include Authorization header without token', async () => {
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: true,
            status: 200,
            json: () => Promise.resolve({}),
        }))

        await apiRequest('/movies/')

        const [, options] = fetch.mock.calls[0]
        expect(options.headers['Authorization']).toBeUndefined()
    })

    it('throws with detail message on error response', async () => {
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: false,
            status: 401,
            json: () => Promise.resolve({ detail: 'Token expired' }),
        }))

        await expect(apiRequest('/protected/')).rejects.toThrow('Token expired')
    })

    it('throws HTTP status when no detail in error body', async () => {
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: false,
            status: 500,
            json: () => Promise.resolve({}),
        }))

        await expect(apiRequest('/broken/')).rejects.toThrow('HTTP 500')
    })

    it('returns null on 204 No Content', async () => {
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: true,
            status: 204,
            json: () => Promise.resolve(null),
        }))

        const result = await apiRequest('/movies/1/', { method: 'DELETE' })
        expect(result).toBeNull()
    })

    it('appends query params to URL', async () => {
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: true,
            status: 200,
            json: () => Promise.resolve([]),
        }))

        await apiRequest('/movies/', { params: { page: 2, query: 'batman' } })

        const [url] = fetch.mock.calls[0]
        expect(url).toContain('page=2')
        expect(url).toContain('query=batman')
    })
})

describe('apiRequestBlob', () => {
    it('returns a Blob on success', async () => {
        const mockBlob = new Blob(['data'], { type: 'image/png' })
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: true,
            status: 200,
            blob: () => Promise.resolve(mockBlob),
        }))

        const result = await apiRequestBlob('/collage/')
        expect(result).instanceof(Blob)
    })

    it('throws on error response', async () => {
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: false,
            status: 403,
        }))

        await expect(apiRequestBlob('/collage/')).rejects.toThrow('HTTP 403')
    })
})
