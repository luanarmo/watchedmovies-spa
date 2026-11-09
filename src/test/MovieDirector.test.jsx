import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MovieDirector } from '../components/MovieDirector'

describe('MovieDirector', () => {
    it('shows a single director', () => {
        render(<MovieDirector directors={['Denis Villeneuve']} />)

        expect(screen.getByText('Director:')).toBeInTheDocument()
        expect(screen.getByText(/Denis Villeneuve/)).toBeInTheDocument()
    })

    it('pluralizes the label and joins several directors', () => {
        render(<MovieDirector directors={['Lana Wachowski', 'Lilly Wachowski']} />)

        expect(screen.getByText('Directors:')).toBeInTheDocument()
        expect(screen.getByText(/Lana Wachowski, Lilly Wachowski/)).toBeInTheDocument()
    })

    it('renders nothing without directors', () => {
        const { container: empty } = render(<MovieDirector directors={[]} />)
        const { container: missing } = render(<MovieDirector />)

        expect(empty).toBeEmptyDOMElement()
        expect(missing).toBeEmptyDOMElement()
    })
})
