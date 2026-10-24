import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ViewDetailsForm } from '../components/ViewDetailsForm'

const movie = { title: 'Test Movie', original_language: 'en' }

const viewDetail = {
    id: 3,
    rating: 6,
    comment: 'Great',
    language: 'Spanish',
    language_code: 'es',
    place: 'Movie Theater',
    place_code: 'cinema',
    watched_date: '2025-03-10',
    is_favorite: true,
}

describe('ViewDetailsForm in edit mode', () => {
    it('prefills the fields from initialValues', () => {
        render(<ViewDetailsForm movie={movie} initialValues={viewDetail} onClose={vi.fn()} onSubmit={vi.fn()} />)

        expect(screen.getByText('Editing view')).toBeInTheDocument()
        expect(screen.getByLabelText('Watch date')).toHaveValue('2025-03-10')
        expect(screen.getByLabelText('Language')).toHaveValue('es')
        expect(screen.getByLabelText('Where')).toHaveValue('cinema')
        expect(screen.getByLabelText(/Comment/)).toHaveValue('Great')
    })

    it('submits the edited payload', async () => {
        const onSubmit = vi.fn()
        const user = userEvent.setup()
        render(<ViewDetailsForm movie={movie} initialValues={viewDetail} onClose={vi.fn()} onSubmit={onSubmit} />)

        await user.selectOptions(screen.getByLabelText('Where'), 'home')
        await user.click(screen.getByRole('button', { name: '9' }))
        await user.click(screen.getByRole('button', { name: 'Save' }))

        expect(onSubmit).toHaveBeenCalledWith({
            movie,
            payload: {
                watched_date: '2025-03-10',
                language: 'es',
                place: 'home',
                comment: 'Great',
                rating: '9',
                is_favorite: true,
            },
        })
    })

    it('sends a null rating when the rating is deselected', async () => {
        const onSubmit = vi.fn()
        const user = userEvent.setup()
        render(<ViewDetailsForm movie={movie} initialValues={viewDetail} onClose={vi.fn()} onSubmit={onSubmit} />)

        await user.click(screen.getByRole('button', { name: '6' }))
        await user.click(screen.getByRole('button', { name: 'Save' }))

        expect(onSubmit.mock.calls[0][0].payload.rating).toBeNull()
    })
})
