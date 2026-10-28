import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TierBadge } from '../components/TierBadge'

describe('TierBadge', () => {
    it('shows the tier letter for the given value', () => {
        render(<TierBadge tier={4} />)

        expect(screen.getByText('A')).toBeInTheDocument()
    })

    it('renders nothing when there is no tier', () => {
        const { container } = render(<TierBadge tier={null} />)

        expect(container).toBeEmptyDOMElement()
    })
})
