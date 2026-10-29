import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { SesionContext } from '../context/sesion.jsx'
import TierList from '../pages/TierList.jsx'

const BASE = 'http://localhost:8000'
const THIS_YEAR = new Date().getFullYear()

const respond = (data) => Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve(data) })

const fakeApi = (url) => {
    const { pathname, searchParams } = new URL(url)
    if (pathname === '/api/watched-movies/years/') {
        return respond({ years: [THIS_YEAR, 2020] })
    }
    if (searchParams.get('year') === '2020') {
        return respond([{ id: 2, title: 'Old Movie', poster_url: '/old.jpg', tier: 3 }])
    }
    return respond([{ id: 1, title: 'New Movie', poster_url: '/new.jpg', tier: 5 }])
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

beforeEach(() => {
    vi.stubEnv('VITE_BASE_API_URL', BASE)
    vi.stubGlobal('fetch', vi.fn(fakeApi))
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

    it('offers only the years with records, without "All years"', async () => {
        renderPage()

        await screen.findByRole('option', { name: /2020/ })
        const years = screen.getAllByRole('option').map(option => option.value)
        expect(years).toEqual([String(THIS_YEAR), '2020'])
    })

    it('shows the tier list of the chosen year', async () => {
        const user = userEvent.setup()
        renderPage()
        await screen.findByRole('option', { name: /2020/ })

        await user.selectOptions(screen.getByRole('combobox'), '2020')

        expect(await screen.findByAltText('Old Movie')).toBeInTheDocument()
        expect(screen.queryByAltText('New Movie')).not.toBeInTheDocument()
    })
})
