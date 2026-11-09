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

    it('keeps the directors from the API', async () => {
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: true,
            status: 200,
            json: () => Promise.resolve({ id: 7, title: 'Fake Movie', directors: ['Lana Wachowski', 'Lilly Wachowski'] }),
        }))

        const movie = await movieDetails({ movieId: 7, token: 'abc123' })

        expect(movie.directors).toEqual(['Lana Wachowski', 'Lilly Wachowski'])
    })

    it('defaults the directors to an empty list when the API sends none', async () => {
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: true,
            status: 200,
            json: () => Promise.resolve({ id: 7, title: 'Fake Movie' }),
        }))

        const movie = await movieDetails({ movieId: 7, token: 'abc123' })

        expect(movie.directors).toEqual([])
    })
})
