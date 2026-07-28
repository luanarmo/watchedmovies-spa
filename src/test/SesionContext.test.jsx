import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { useContext } from 'react'
import { SesionContext, SesionProvider } from '../context/sesion.jsx'

function TestConsumer() {
    const { sesion, setSesion, deleteSesionExpiredSession } = useContext(SesionContext)
    return (
        <div>
            <span data-testid="auth">{String(sesion.auth)}</span>
            <span data-testid="access">{sesion.access ?? 'null'}</span>
            <button
                onClick={() => setSesion({ auth: true, access: 'tok123', refresh: 'ref456', expiresAt: Date.now() + 3600000 })}
            >
                login
            </button>
            <button onClick={deleteSesionExpiredSession}>logout</button>
        </div>
    )
}

function renderProvider() {
    return render(
        <SesionProvider>
            <TestConsumer />
        </SesionProvider>
    )
}

beforeEach(() => {
    localStorage.clear()
    vi.useFakeTimers()
})

afterEach(() => {
    localStorage.clear()
    vi.useRealTimers()
})

describe('SesionContext', () => {
    it('starts with auth: false when localStorage is empty', () => {
        renderProvider()
        expect(screen.getByTestId('auth').textContent).toBe('false')
    })

    it('setSesion updates auth state and persists to localStorage', async () => {
        renderProvider()
        await act(async () => {
            screen.getByText('login').click()
        })
        expect(screen.getByTestId('auth').textContent).toBe('true')
        expect(screen.getByTestId('access').textContent).toBe('tok123')
        const stored = JSON.parse(localStorage.getItem('sesion'))
        expect(stored.auth).toBe(true)
        expect(stored.access).toBe('tok123')
    })

    it('deleteSesionExpiredSession clears localStorage and resets state', async () => {
        localStorage.setItem('sesion', JSON.stringify({
            auth: true, access: 'tok', refresh: 'ref', expiresAt: Date.now() + 3600000
        }))
        renderProvider()
        await act(async () => {
            screen.getByText('logout').click()
        })
        expect(screen.getByTestId('auth').textContent).toBe('false')
        expect(localStorage.getItem('sesion')).toBeNull()
    })

    it('restores session from localStorage on mount', async () => {
        localStorage.setItem('sesion', JSON.stringify({
            auth: true, access: 'restored-token', refresh: 'ref', expiresAt: Date.now() + 3600000
        }))
        renderProvider()
        await act(async () => {})
        expect(screen.getByTestId('auth').textContent).toBe('true')
        expect(screen.getByTestId('access').textContent).toBe('restored-token')
    })
})
