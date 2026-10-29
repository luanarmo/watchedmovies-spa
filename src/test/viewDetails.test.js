import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { patchViewDetails } from '../services/viewDetails'

const BASE = 'http://localhost:8000'

beforeEach(() => {
    vi.stubEnv('VITE_BASE_API_URL', BASE)
})

afterEach(() => {
    vi.unstubAllEnvs()
    vi.restoreAllMocks()
})

describe('patchViewDetails', () => {
    it('sends a PATCH to the view detail with the payload and token', async () => {
        const updated = { id: 7, comment: 'Updated' }
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: true,
            status: 200,
            json: () => Promise.resolve(updated),
        }))

        const result = await patchViewDetails({ id: 7, payload: { comment: 'Updated' }, access: 'abc123' })

        const [url, options] = fetch.mock.calls[0]
        expect(url).toBe(`${BASE}/api/view-details/7/`)
        expect(options.method).toBe('PATCH')
        expect(options.headers['Authorization']).toBe('Bearer abc123')
        expect(JSON.parse(options.body)).toEqual({ comment: 'Updated' })
        expect(result).toEqual(updated)
    })
})
