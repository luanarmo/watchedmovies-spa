import { describe, it, expect } from 'vitest'
import { formatDate } from '../utils/formatDate.js'

describe('formatDate', () => {
    it('returns null when there is no date', () => {
        expect(formatDate(null)).toBeNull()
        expect(formatDate(undefined)).toBeNull()
    })

    it('keeps the day of the API date whatever the timezone is', () => {
        const formatted = formatDate('2026-03-05')
        expect(formatted).toContain('5')
        expect(formatted).toContain('2026')
    })
})
