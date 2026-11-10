import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getTierList, getYears, invalidateYears, addWatched, removeWatched } from '../services/watchedMoviesServices'
import { patchViewDetails, deleteViewDetails } from '../services/viewDetails'

const BASE = 'http://localhost:8000'

beforeEach(() => {
    vi.stubEnv('VITE_BASE_API_URL', BASE)
    invalidateYears()
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

    it('asks for the given year', async () => {
        const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200, json: () => Promise.resolve([]) })
        vi.stubGlobal('fetch', fetchMock)

        await getTierList({ access: 'abc123', year: 2020 })

        expect(fetchMock.mock.calls[0][0]).toBe(`${BASE}/api/watched-movies/tier-list/?year=2020`)
    })

    it('asks for every year', async () => {
        const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200, json: () => Promise.resolve([]) })
        vi.stubGlobal('fetch', fetchMock)

        await getTierList({ access: 'abc123', year: 'all' })

        expect(fetchMock.mock.calls[0][0]).toBe(`${BASE}/api/watched-movies/tier-list/?year=all`)
    })
})

describe('getYears', () => {
    const okResponse = (body) => ({ ok: true, status: 200, json: () => Promise.resolve(body) })
    const stubFetch = (...bodies) => {
        const fetchMock = vi.fn()
        bodies.forEach((body) => fetchMock.mockResolvedValueOnce(okResponse(body)))
        fetchMock.mockResolvedValue(okResponse(bodies.at(-1)))
        vi.stubGlobal('fetch', fetchMock)
        return fetchMock
    }

    it('gets the years of the user', async () => {
        const fetchMock = stubFetch({ years: [2024, 2023] })

        const years = await getYears({ access: 'abc123' })

        expect(fetchMock.mock.calls[0][0]).toBe(`${BASE}/api/watched-movies/years/`)
        expect(years).toEqual([2024, 2023])
    })

    it('shares one request between simultaneous calls', async () => {
        const fetchMock = stubFetch({ years: [2024] })

        const [a, b] = await Promise.all([getYears({ access: 'abc123' }), getYears({ access: 'abc123' })])

        expect(fetchMock).toHaveBeenCalledTimes(1)
        expect(a).toEqual([2024])
        expect(b).toEqual([2024])
    })

    it('reuses the years of an earlier call', async () => {
        const fetchMock = stubFetch({ years: [2024] })

        await getYears({ access: 'abc123' })
        await getYears({ access: 'abc123' })

        expect(fetchMock).toHaveBeenCalledTimes(1)
    })

    it('gives each caller its own copy', async () => {
        stubFetch({ years: [2024] })

        const first = await getYears({ access: 'abc123' })
        first.unshift(2030)
        const second = await getYears({ access: 'abc123' })

        expect(second).toEqual([2024])
    })

    it('asks again for another token', async () => {
        const fetchMock = stubFetch({ years: [2024] })

        await getYears({ access: 'abc123' })
        await getYears({ access: 'other' })

        expect(fetchMock).toHaveBeenCalledTimes(2)
    })

    it('asks again once the cache expires', async () => {
        vi.useFakeTimers()
        try {
            const fetchMock = stubFetch({ years: [2024] })

            await getYears({ access: 'abc123' })
            vi.advanceTimersByTime(5 * 60 * 1000 + 1)
            await getYears({ access: 'abc123' })

            expect(fetchMock).toHaveBeenCalledTimes(2)
        } finally {
            vi.useRealTimers()
        }
    })

    it('does not keep a failed request', async () => {
        const fetchMock = vi.fn()
            .mockResolvedValueOnce({ ok: false, status: 500, json: () => Promise.resolve({}) })
            .mockResolvedValue(okResponse({ years: [2024] }))
        vi.stubGlobal('fetch', fetchMock)

        await expect(getYears({ access: 'abc123' })).rejects.toThrow()
        const years = await getYears({ access: 'abc123' })

        expect(fetchMock).toHaveBeenCalledTimes(2)
        expect(years).toEqual([2024])
    })

    it.each([
        ['adding a watched movie', () => addWatched({ movie: 1, payload: {}, access: 'abc123' })],
        ['removing a watched movie', () => removeWatched({ movieId: 1, access: 'abc123' })],
        ['editing a view', () => patchViewDetails({ id: 1, payload: {}, access: 'abc123' })],
        ['deleting a view', () => deleteViewDetails({ viewDetailsId: 1, access: 'abc123' })],
    ])('asks again after %s', async (_name, mutate) => {
        const fetchMock = stubFetch({ years: [2024] })

        await getYears({ access: 'abc123' })
        await mutate()
        await getYears({ access: 'abc123' })

        const yearsCalls = fetchMock.mock.calls.filter(([url]) => url.endsWith('/api/watched-movies/years/'))
        expect(yearsCalls).toHaveLength(2)
    })
})
