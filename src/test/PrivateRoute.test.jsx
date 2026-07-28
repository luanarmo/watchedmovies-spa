import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { SesionContext } from '../context/sesion.jsx'
import { PrivateRoute } from '../components/PrivateRoute.jsx'

const FUTURE_EXPIRY = Date.now() + 3600000
const PAST_EXPIRY = Date.now() - 1000

function renderWithSession(sesion) {
    const deleteSesionExpiredSession = vi.fn()
    render(
        <SesionContext.Provider value={{ sesion, deleteSesionExpiredSession }}>
            <MemoryRouter initialEntries={['/protected']}>
                <Routes>
                    <Route path="/login" element={<div>Login Page</div>} />
                    <Route
                        path="/protected"
                        element={
                            <PrivateRoute>
                                <div>Protected Content</div>
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </MemoryRouter>
        </SesionContext.Provider>
    )
    return { deleteSesionExpiredSession }
}

describe('PrivateRoute', () => {
    it('renders children when session is authenticated and not expired', () => {
        renderWithSession({ auth: true, expiresAt: FUTURE_EXPIRY })
        expect(screen.getByText('Protected Content')).toBeTruthy()
    })

    it('redirects to /login when not authenticated', () => {
        renderWithSession({ auth: false, expiresAt: FUTURE_EXPIRY })
        expect(screen.getByText('Login Page')).toBeTruthy()
        expect(screen.queryByText('Protected Content')).toBeNull()
    })

    it('redirects to /login when session is expired', () => {
        renderWithSession({ auth: true, expiresAt: PAST_EXPIRY })
        expect(screen.getByText('Login Page')).toBeTruthy()
        expect(screen.queryByText('Protected Content')).toBeNull()
    })

    it('calls deleteSesionExpiredSession when not authenticated', () => {
        const { deleteSesionExpiredSession } = renderWithSession({ auth: false, expiresAt: FUTURE_EXPIRY })
        expect(deleteSesionExpiredSession).toHaveBeenCalledOnce()
    })
})
