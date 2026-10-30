import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, within, act, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { SesionContext } from '../context/sesion.jsx'
import TierList from '../pages/TierList.jsx'

const BASE = 'http://localhost:8000'
const THIS_YEAR = new Date().getFullYear()

// jsdom has no layout, so a real drag can't be simulated: keep the real DndContext and grab its props
const dnd = vi.hoisted(() => ({ props: null }))
vi.mock('@dnd-kit/core', async (importOriginal) => {
    const actual = await importOriginal()
    return {
        ...actual,
        DndContext: (props) => {
            dnd.props = props
            return <actual.DndContext {...props} />
        },
    }
})

const respond = (data) => Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve(data) })
const reject = () => Promise.resolve({ ok: false, status: 500, json: () => Promise.resolve({}) })

const fakeApi = (url, options = {}) => {
    const { pathname, searchParams } = new URL(url)
    if (options.method === 'PATCH') {
        return respond({ tier: JSON.parse(options.body).tier })
    }
    if (pathname === '/api/watched-movies/years/') {
        return respond({ years: [THIS_YEAR, 2020] })
    }
    if (pathname === '/api/watched-movies/tier-list-image/') {
        return respond({ image: 'iVBORw0KGgo=' })
    }
    if (searchParams.get('year') === 'all') {
        return respond([
            { id: 1, title: 'New Movie', poster_url: '/new.jpg', tier: 4 },
            { id: 2, title: 'Old Movie', poster_url: '/old.jpg', tier: 3 },
        ])
    }
    if (searchParams.get('year') === '2020') {
        return respond([{ id: 2, title: 'Old Movie', poster_url: '/old.jpg', tier: 3 }])
    }
    return respond([{ id: 1, title: 'New Movie', poster_url: '/new.jpg', tier: 4 }])
}

const renderPage = () => render(
    <SesionContext.Provider value={{
        sesion: { auth: true, access: 'abc123', expiresAt: Date.now() + 3600000 },
        deleteSesionExpiredSession: vi.fn(),
    }}>
        <MemoryRouter>
            <TierList />
        </MemoryRouter>
    </SesionContext.Provider>
)

const tierRow = (letter) => screen.getByRole('rowheader', { name: letter }).closest('tr')

const dropOnTier = (movieId, tierValue) => act(() => {
    dnd.props.onDragEnd({ active: { id: movieId }, over: { id: tierValue } })
})

// jsdom doesn't download anything: record the link that gets clicked instead
const captureDownloads = () => {
    const downloads = []
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function () {
        downloads.push({ href: this.href, download: this.download })
    })
    return downloads
}

const slowTierList = (year) => (url, options) => {
    const { pathname, searchParams } = new URL(url)
    const isThatList = pathname === '/api/watched-movies/tier-list/' && searchParams.get('year') === year
    return isThatList ? new Promise(() => {}) : fakeApi(url, options)
}

beforeEach(() => {
    vi.stubEnv('VITE_BASE_API_URL', BASE)
    vi.stubGlobal('fetch', vi.fn(fakeApi))
    // jsdom has no object URLs either
    URL.createObjectURL = vi.fn(() => 'blob:tier-list')
    URL.revokeObjectURL = vi.fn()
})

afterEach(() => {
    vi.unstubAllEnvs()
    vi.restoreAllMocks()
})

describe('TierList', () => {
    it("shows this year's tier list by default", async () => {
        renderPage()

        expect(await screen.findByAltText('New Movie')).toBeInTheDocument()
        expect(screen.getByRole('combobox')).toHaveValue(String(THIS_YEAR))
    })

    it('offers "All years" and the years with records', async () => {
        renderPage()

        await screen.findByRole('option', { name: /2020/ })
        const years = screen.getAllByRole('option').map(option => option.value)
        expect(years).toEqual(['', String(THIS_YEAR), '2020'])
    })

    it('shows the tier list of the chosen year', async () => {
        const user = userEvent.setup()
        renderPage()
        await screen.findByRole('option', { name: /2020/ })

        await user.selectOptions(screen.getByRole('combobox'), '2020')

        expect(await screen.findByAltText('Old Movie')).toBeInTheDocument()
        expect(screen.queryByAltText('New Movie')).not.toBeInTheDocument()
    })

    it('shows the movies of every year under an "All years" title', async () => {
        const user = userEvent.setup()
        renderPage()
        await screen.findByRole('option', { name: /All years/ })

        await user.selectOptions(screen.getByRole('combobox'), '')

        expect(await screen.findByAltText('Old Movie')).toBeInTheDocument()
        expect(screen.getByAltText('New Movie')).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: 'Tier List – All years' })).toBeInTheDocument()
        expect(fetch).toHaveBeenCalledWith(`${BASE}/api/watched-movies/tier-list/?year=all`, expect.anything())
    })

    it('keeps the list of the last chosen year when an earlier request answers later', async () => {
        let answerAllYears
        const slowAllYears = new Promise(resolve => { answerAllYears = resolve })
        fetch.mockImplementation((url, options) => (
            new URL(url).searchParams.get('year') === 'all' ? slowAllYears : fakeApi(url, options)
        ))
        const user = userEvent.setup()
        renderPage()
        await screen.findByRole('option', { name: /2020/ })

        await user.selectOptions(screen.getByRole('combobox'), '')
        await user.selectOptions(screen.getByRole('combobox'), '2020')
        await screen.findByAltText('Old Movie')
        await act(async () => answerAllYears(await respond([
            { id: 1, title: 'New Movie', poster_url: '/new.jpg', tier: 4 },
            { id: 2, title: 'Old Movie', poster_url: '/old.jpg', tier: 3 },
        ])))

        expect(screen.getByRole('heading', { name: 'Tier List – 2020' })).toBeInTheDocument()
        expect(screen.queryByAltText('New Movie')).not.toBeInTheDocument()
    })

    it('ignores an earlier request that fails after the last one succeeded', async () => {
        let answerAllYears
        const slowAllYears = new Promise(resolve => { answerAllYears = resolve })
        fetch.mockImplementation((url, options) => (
            new URL(url).searchParams.get('year') === 'all' ? slowAllYears : fakeApi(url, options)
        ))
        const user = userEvent.setup()
        renderPage()
        await screen.findByRole('option', { name: /2020/ })

        await user.selectOptions(screen.getByRole('combobox'), '')
        await user.selectOptions(screen.getByRole('combobox'), '2020')
        await screen.findByAltText('Old Movie')
        await act(async () => answerAllYears(await reject()))

        expect(screen.queryByText('Error fetching tier list')).not.toBeInTheDocument()
        expect(screen.getByAltText('Old Movie')).toBeInTheDocument()
    })

    it('shows the list of another year after a failed load', async () => {
        fetch.mockImplementation((url, options) => (
            new URL(url).searchParams.get('year') === String(THIS_YEAR) ? reject() : fakeApi(url, options)
        ))
        const user = userEvent.setup()
        renderPage()
        expect(await screen.findByText('Error fetching tier list')).toBeInTheDocument()
        await screen.findByRole('option', { name: /2020/ })

        await user.selectOptions(screen.getByRole('combobox'), '2020')

        expect(await screen.findByAltText('Old Movie')).toBeInTheDocument()
        expect(screen.queryByText('Error fetching tier list')).not.toBeInTheDocument()
    })

    it('moves a poster to the tier it is dropped on and saves the new tier', async () => {
        renderPage()
        await screen.findByAltText('New Movie')

        dropOnTier(1, 5)

        expect(within(tierRow('S')).getByAltText('New Movie')).toBeInTheDocument()
        expect(within(tierRow('A')).queryByAltText('New Movie')).not.toBeInTheDocument()
        await waitFor(() => expect(fetch).toHaveBeenCalledWith(
            `${BASE}/api/watched-movies/1/tier/`,
            expect.objectContaining({ method: 'PATCH', body: JSON.stringify({ tier: 5 }) })
        ))
    })

    it('moves a poster to another tier from the "All years" list and saves the new tier', async () => {
        const user = userEvent.setup()
        renderPage()
        await screen.findByRole('option', { name: /All years/ })
        await user.selectOptions(screen.getByRole('combobox'), '')
        await screen.findByAltText('Old Movie')

        dropOnTier(2, 5)

        expect(within(tierRow('S')).getByAltText('Old Movie')).toBeInTheDocument()
        expect(within(tierRow('B')).queryByAltText('Old Movie')).not.toBeInTheDocument()
        await waitFor(() => expect(fetch).toHaveBeenCalledWith(
            `${BASE}/api/watched-movies/2/tier/`,
            expect.objectContaining({ method: 'PATCH', body: JSON.stringify({ tier: 5 }) })
        ))
    })

    it('says there are no movies with a tier when "All years" has none', async () => {
        fetch.mockImplementation((url, options) => (
            new URL(url).searchParams.get('year') === 'all' ? respond([]) : fakeApi(url, options)
        ))
        const user = userEvent.setup()
        renderPage()
        await screen.findByRole('option', { name: /All years/ })

        await user.selectOptions(screen.getByRole('combobox'), '')

        expect(await screen.findByText('No movies with a tier yet.')).toBeInTheDocument()
    })

    it('ignores a new move of a poster while its previous move is still being saved', async () => {
        let finishSaving
        const slowSave = new Promise(resolve => { finishSaving = resolve })
        fetch.mockImplementation((url, options) => options?.method === 'PATCH' ? slowSave : fakeApi(url, options))
        renderPage()
        await screen.findByAltText('New Movie')

        dropOnTier(1, 5)
        dropOnTier(1, 2)

        const saves = fetch.mock.calls.filter(([, options]) => options?.method === 'PATCH')
        expect(saves).toHaveLength(1)
        expect(within(tierRow('S')).getByAltText('New Movie')).toBeInTheDocument()
        await act(async () => finishSaving(await respond({ tier: 5 })))
    })

    it('lets a poster be moved again once its previous move is saved', async () => {
        renderPage()
        await screen.findByAltText('New Movie')
        dropOnTier(1, 5)
        await waitFor(() => expect(fetch).toHaveBeenCalledWith(
            `${BASE}/api/watched-movies/1/tier/`,
            expect.objectContaining({ body: JSON.stringify({ tier: 5 }) })
        ))
        await act(async () => {})

        dropOnTier(1, 3)

        expect(within(tierRow('B')).getByAltText('New Movie')).toBeInTheDocument()
        await waitFor(() => expect(fetch).toHaveBeenCalledWith(
            `${BASE}/api/watched-movies/1/tier/`,
            expect.objectContaining({ body: JSON.stringify({ tier: 3 }) })
        ))
    })

    it('puts the poster back and shows an error when the tier could not be saved', async () => {
        fetch.mockImplementation((url, options) => options?.method === 'PATCH' ? reject() : fakeApi(url, options))
        renderPage()
        await screen.findByAltText('New Movie')

        dropOnTier(1, 5)

        expect(await screen.findByText(/could not move the movie/i)).toBeInTheDocument()
        expect(within(tierRow('A')).getByAltText('New Movie')).toBeInTheDocument()
        expect(within(tierRow('S')).queryByAltText('New Movie')).not.toBeInTheDocument()
    })

    it('shows the "Download image" button when there are movies', async () => {
        renderPage()
        await screen.findByAltText('New Movie')

        expect(screen.getByRole('button', { name: 'Download image' })).toBeInTheDocument()
    })

    it('hides the "Download image" button when there are no movies', async () => {
        fetch.mockImplementation((url, options) => (
            new URL(url).pathname === '/api/watched-movies/tier-list/' ? respond([]) : fakeApi(url, options)
        ))
        renderPage()
        await screen.findByText('No movies with a tier yet.')

        expect(screen.queryByRole('button', { name: 'Download image' })).not.toBeInTheDocument()
    })

    it('downloads the image of the selected year as tier-list-<year>.png', async () => {
        const downloads = captureDownloads()
        const user = userEvent.setup()
        renderPage()
        await screen.findByAltText('New Movie')

        await user.click(screen.getByRole('button', { name: 'Download image' }))

        await waitFor(() => expect(downloads).toHaveLength(1))
        expect(fetch).toHaveBeenCalledWith(`${BASE}/api/watched-movies/tier-list-image/?year=${THIS_YEAR}`, expect.anything())
        expect(downloads[0]).toEqual({
            href: 'blob:tier-list',
            download: `tier-list-${THIS_YEAR}.png`,
        })
        const blob = URL.createObjectURL.mock.calls[0][0]
        expect(blob.type).toBe('image/png')
        expect(blob.size).toBe(8)
    })

    it('hides the "Download image" button while another year is loading', async () => {
        const user = userEvent.setup()
        renderPage()
        await screen.findByAltText('New Movie')
        await screen.findByRole('option', { name: /2020/ })
        fetch.mockImplementation(slowTierList('2020'))

        await user.selectOptions(screen.getByRole('combobox'), '2020')

        expect(screen.queryByRole('button', { name: 'Download image' })).not.toBeInTheDocument()
    })

    it('hides the "Download image" button when the list of another year could not be loaded', async () => {
        const user = userEvent.setup()
        renderPage()
        await screen.findByAltText('New Movie')
        await screen.findByRole('option', { name: /2020/ })
        fetch.mockImplementation((url, options) => (
            new URL(url).searchParams.get('year') === '2020' ? reject() : fakeApi(url, options)
        ))

        await user.selectOptions(screen.getByRole('combobox'), '2020')

        expect(await screen.findByText('Error fetching tier list')).toBeInTheDocument()
        expect(screen.queryByRole('button', { name: 'Download image' })).not.toBeInTheDocument()
    })

    it('downloads the image of every year as tier-list-all.png', async () => {
        const downloads = captureDownloads()
        const user = userEvent.setup()
        renderPage()
        await screen.findByRole('option', { name: /All years/ })
        await user.selectOptions(screen.getByRole('combobox'), '')
        await screen.findByAltText('Old Movie')

        await user.click(screen.getByRole('button', { name: 'Download image' }))

        await waitFor(() => expect(downloads).toHaveLength(1))
        expect(fetch).toHaveBeenCalledWith(`${BASE}/api/watched-movies/tier-list-image/?year=all`, expect.anything())
        expect(downloads[0].download).toBe('tier-list-all.png')
    })

    it('disables the "Download image" button while the image is being generated', async () => {
        let finishGenerating
        const slowImage = new Promise(resolve => { finishGenerating = resolve })
        fetch.mockImplementation((url, options) => (
            new URL(url).pathname === '/api/watched-movies/tier-list-image/' ? slowImage : fakeApi(url, options)
        ))
        const downloads = captureDownloads()
        const user = userEvent.setup()
        renderPage()
        await screen.findByAltText('New Movie')

        await user.click(screen.getByRole('button', { name: 'Download image' }))

        expect(screen.getByRole('button', { name: 'Generating…' })).toBeDisabled()
        await act(async () => finishGenerating(await respond({ image: 'iVBORw0KGgo=' })))
        expect(screen.getByRole('button', { name: 'Download image' })).toBeEnabled()
        expect(downloads).toHaveLength(1)
    })

    it('shows an error and lets the user try again when the image could not be generated', async () => {
        fetch.mockImplementation((url, options) => (
            new URL(url).pathname === '/api/watched-movies/tier-list-image/' ? reject() : fakeApi(url, options)
        ))
        const downloads = captureDownloads()
        const user = userEvent.setup()
        renderPage()
        await screen.findByAltText('New Movie')

        await user.click(screen.getByRole('button', { name: 'Download image' }))

        expect(await screen.findByText(/could not generate the image/i)).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Download image' })).toBeEnabled()
        expect(downloads).toHaveLength(0)
    })

    it('shows an error instead of downloading a corrupt file when the API sends no image', async () => {
        fetch.mockImplementation((url, options) => (
            new URL(url).pathname === '/api/watched-movies/tier-list-image/' ? respond({}) : fakeApi(url, options)
        ))
        const downloads = captureDownloads()
        const user = userEvent.setup()
        renderPage()
        await screen.findByAltText('New Movie')

        await user.click(screen.getByRole('button', { name: 'Download image' }))

        expect(await screen.findByText(/could not generate the image/i)).toBeInTheDocument()
        expect(downloads).toHaveLength(0)
    })
})
