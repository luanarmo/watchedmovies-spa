import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getTierList } from '../services/watchedMoviesServices'

const BASE = 'http://localhost:8000'

beforeEach(() => {
    vi.stubEnv('VITE_BASE_API_URL', BASE)
})

afterEach(() => {
    vi.unstubAllEnvs()
    vi.restoreAllMocks()
})

describe('getTierList', () => {
    it('gets the tier list movies', async () => {
        const movies = [{ id: 1, title: 'Fake Movie', poster_url: '/fake.jpg', tier: 5 }]
        const fetchMock = vi.fn().mockResolvedValue({
            ok: true,
            status: 200,
            json: () => Promise.resolve(movies),
        })
        vi.stubGlobal('fetch', fetchMock)

        const result = await getTierList({ access: 'abc123' })

        expect(fetchMock.mock.calls[0][0]).toBe(`${BASE}/api/watched-movies/tier-list/`)
        expect(result).toEqual(movies)
    })
})
