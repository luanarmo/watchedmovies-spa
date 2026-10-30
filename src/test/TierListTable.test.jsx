import { describe, it, expect, vi } from 'vitest'
import { render, screen, within, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { TierListTable } from '../components/TierListTable'

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

const renderTable = (movies, onMoveMovie = vi.fn()) => render(
    <MemoryRouter>
        <TierListTable movies={movies} onMoveMovie={onMoveMovie} />
    </MemoryRouter>
)

const dropOn = (movieId, tierValue) => act(() => {
    dnd.props.onDragEnd({ active: { id: movieId }, over: tierValue === null ? null : { id: tierValue } })
})

describe('TierListTable', () => {
    it('shows one row per tier from S to D', () => {
        renderTable([{ id: 1, title: 'Fake Movie', poster_url: '/fake.jpg', tier: 5 }])

        const letters = screen.getAllByRole('rowheader').map(cell => cell.textContent)
        expect(letters).toEqual(['S', 'A', 'B', 'C', 'D'])
    })

    it('shows each poster in the row of its tier', () => {
        renderTable([
            { id: 1, title: 'S Movie', poster_url: '/s.jpg', tier: 5 },
            { id: 2, title: 'C Movie', poster_url: '/c.jpg', tier: 2 },
        ])

        const sRow = screen.getByRole('rowheader', { name: 'S' }).closest('tr')
        const cRow = screen.getByRole('rowheader', { name: 'C' }).closest('tr')
        expect(within(sRow).getByAltText('S Movie')).toBeInTheDocument()
        expect(within(cRow).getByAltText('C Movie')).toBeInTheDocument()
        expect(within(sRow).queryByAltText('C Movie')).not.toBeInTheDocument()
    })

    it('links each poster to its watched movie page', () => {
        renderTable([{ id: 7, title: 'Fake Movie', poster_url: '/fake.jpg', tier: 4 }])

        expect(screen.getByRole('link', { name: 'Fake Movie' })).toHaveAttribute('href', '/watchedDetails/7')
    })

    it('asks to move a movie when its poster is dropped on another tier', () => {
        const onMoveMovie = vi.fn()
        renderTable([{ id: 1, title: 'Fake Movie', poster_url: '/fake.jpg', tier: 4 }], onMoveMovie)

        dropOn(1, 5)

        expect(onMoveMovie).toHaveBeenCalledWith(1, 5)
    })

    it('does nothing when a poster is dropped on its own tier', () => {
        const onMoveMovie = vi.fn()
        renderTable([{ id: 1, title: 'Fake Movie', poster_url: '/fake.jpg', tier: 4 }], onMoveMovie)

        dropOn(1, 4)

        expect(onMoveMovie).not.toHaveBeenCalled()
    })

    it('does nothing when a poster is dropped outside the tiers', () => {
        const onMoveMovie = vi.fn()
        renderTable([{ id: 1, title: 'Fake Movie', poster_url: '/fake.jpg', tier: 4 }], onMoveMovie)

        dropOn(1, null)

        expect(onMoveMovie).not.toHaveBeenCalled()
    })

    it('shows a message instead of the table when there are no movies', () => {
        renderTable([])

        expect(screen.queryByRole('table')).not.toBeInTheDocument()
        expect(screen.getByText(/no movies with a tier/i)).toBeInTheDocument()
    })
})
