import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { SessionContext } from '../context/session.jsx'
import { PrivateRoute } from '../components/PrivateRoute.jsx'

const FUTURE_EXPIRY = Date.now() + 3600000
const PAST_EXPIRY = Date.now() - 1000

function renderWithSession(session) {
    const deleteExpiredSession = vi.fn()
    render(
        <SessionContext.Provider value={{ session, deleteExpiredSession }}>
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
        </SessionContext.Provider>
    )
    return { deleteExpiredSession }
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

    it('calls deleteExpiredSession when not authenticated', () => {
        const { deleteExpiredSession } = renderWithSession({ auth: false, expiresAt: FUTURE_EXPIRY })
        expect(deleteExpiredSession).toHaveBeenCalledOnce()
    })
})
