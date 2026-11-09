import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { TierListSkeleton } from '../components/TierListSkeleton'

describe('TierListSkeleton', () => {
    it('is announced as a busy status', () => {
        render(<TierListSkeleton />)

        const status = screen.getByRole('status', { name: 'Loading tier list' })
        expect(status).toHaveAttribute('aria-busy', 'true')
    })

    it('has one row per tier, from S to D', () => {
        render(<TierListSkeleton />)

        const letters = screen.getAllByRole('rowheader').map(header => header.textContent)
        expect(letters).toEqual(['S', 'A', 'B', 'C', 'D'])
    })

    it('has no real posters, only placeholders', () => {
        render(<TierListSkeleton />)

        expect(within(screen.getByRole('status')).queryAllByRole('img')).toHaveLength(0)
        expect(within(screen.getByRole('status')).queryAllByRole('link')).toHaveLength(0)
    })
})
