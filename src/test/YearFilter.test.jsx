import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { YearFilter } from '../components/YearFilter.jsx'

const options = [{ key: '', label: 'All years' }, 2026, 2025]

describe('YearFilter', () => {
    it('marks the selected year chip as pressed', () => {
        render(<YearFilter options={options} selectedOption={2026} handleOrderChange={() => {}} />)

        expect(screen.getByRole('button', { name: '2026' })).toHaveAttribute('aria-pressed', 'true')
        expect(screen.getByRole('button', { name: '2025' })).toHaveAttribute('aria-pressed', 'false')
    })

    it('treats the empty key as "All"', () => {
        render(<YearFilter options={options} selectedOption='' handleOrderChange={() => {}} />)

        expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'true')
    })

    it('sends the key of the tapped chip as a string', () => {
        const onChange = vi.fn()
        render(<YearFilter options={options} selectedOption={2026} handleOrderChange={onChange} />)

        fireEvent.click(screen.getByRole('button', { name: '2025' }))

        expect(onChange).toHaveBeenCalledWith('2025')
    })
})
