import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ViewDetailCard } from '../components/ViewDetailCard'

const viewDetail = {
    id: 3,
    comment: 'Great',
    language: 'Spanish',
    place: 'Movie Theater',
    watched_date: '2025-03-10',
    is_favorite: false,
}

const renderCard = (detail = viewDetail) => {
    const onEdit = vi.fn()
    const onDelete = vi.fn()
    render(<ul><ViewDetailCard viewDetail={detail} onEdit={onEdit} onDelete={onDelete} /></ul>)
    return { onEdit, onDelete, user: userEvent.setup() }
}

describe('ViewDetailCard', () => {
    it('has no 1-10 rating', () => {
        renderCard()

        expect(screen.queryByText('/ 10')).not.toBeInTheDocument()
    })

    it('shows the comment', () => {
        renderCard()
        expect(screen.getByText('Great')).toBeInTheDocument()
    })

    it('shows "No comment" without a comment', () => {
        renderCard({ ...viewDetail, comment: '' })

        expect(screen.getByText('No comment')).toBeInTheDocument()
    })
})

describe('ViewDetailCard actions', () => {
    it('edits the view with the always visible edit button', async () => {
        const { user, onEdit } = renderCard()

        await user.click(screen.getByRole('button', { name: 'Edit view' }))

        expect(onEdit).toHaveBeenCalledWith(viewDetail)
    })

    it('removes the view with the always visible remove button', async () => {
        const { user, onDelete } = renderCard()

        await user.click(screen.getByRole('button', { name: 'Remove view' }))

        expect(onDelete).toHaveBeenCalledWith(viewDetail.id)
    })
})
