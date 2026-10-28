import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { movieDetails } from '../services/details'

const BASE = 'http://localhost:8000'

beforeEach(() => {
    vi.stubEnv('VITE_BASE_API_URL', BASE)
})

afterEach(() => {
    vi.unstubAllEnvs()
    vi.restoreAllMocks()
})

describe('movieDetails', () => {
    it('keeps the tier from the API', async () => {
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: true,
            status: 200,
            json: () => Promise.resolve({ id: 7, title: 'Fake Movie', tier: 3 }),
        }))

        const movie = await movieDetails({ movieId: 7, token: 'abc123' })

        expect(movie.tier).toBe(3)
    })
})
