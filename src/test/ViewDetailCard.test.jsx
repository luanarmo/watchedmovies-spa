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

// Desktop and mobile actions are both rendered (CSS decides which one shows), so the mobile one is the last match
const renderCard = () => {
    const onEdit = vi.fn()
    const onDelete = vi.fn()
    render(<ul><ViewDetailCard viewDetail={viewDetail} onEdit={onEdit} onDelete={onDelete} /></ul>)
    return { onEdit, onDelete, user: userEvent.setup() }
}

describe('ViewDetailCard', () => {
    it('has no 1-10 rating', () => {
        renderCard()

        expect(screen.queryByText('/ 10')).not.toBeInTheDocument()
    })
})

describe('ViewDetailCard mobile context menu', () => {
    it('toggles the menu with the ellipsis button', async () => {
        const { user } = renderCard()
        const toggle = screen.getByRole('button', { name: 'More actions' })

        expect(toggle).toHaveAttribute('aria-expanded', 'false')
        await user.click(toggle)
        expect(toggle).toHaveAttribute('aria-expanded', 'true')
    })

    it('edits from the menu and closes it', async () => {
        const { user, onEdit } = renderCard()
        const toggle = screen.getByRole('button', { name: 'More actions' })

        await user.click(toggle)
        await user.click(screen.getAllByRole('button', { name: 'Edit view' }).at(-1))

        expect(onEdit).toHaveBeenCalledWith(viewDetail)
        expect(toggle).toHaveAttribute('aria-expanded', 'false')
    })

    it('removes from the menu', async () => {
        const { user, onDelete } = renderCard()

        await user.click(screen.getByRole('button', { name: 'More actions' }))
        await user.click(screen.getAllByRole('button', { name: 'Remove view' }).at(-1))

        expect(onDelete).toHaveBeenCalledWith(viewDetail.id)
    })
})
