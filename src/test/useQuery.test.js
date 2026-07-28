import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useQuery } from '../hooks/useQuery'

describe('useQuery', () => {
    it('starts with empty query and no error', () => {
        const { result } = renderHook(() => useQuery())
        expect(result.current.query).toBe('')
        expect(result.current.error).toBeNull()
    })

    it('does not set error on first empty input (initialization)', () => {
        const { result } = renderHook(() => useQuery())
        act(() => result.current.setQuery(''))
        expect(result.current.error).toBeNull()
    })

    it('sets error when query is empty after typing', () => {
        const { result } = renderHook(() => useQuery())
        act(() => result.current.setQuery('batman'))
        act(() => result.current.setQuery(''))
        expect(result.current.error).toBe('No se puede realizar una búsqueda vacía')
    })

    it('sets error when query is only numbers', () => {
        const { result } = renderHook(() => useQuery())
        act(() => result.current.setQuery('123'))
        expect(result.current.error).toBe('No se puede realizar una búsqueda solo con números')
    })

    it('sets error when query is shorter than 3 characters', () => {
        const { result } = renderHook(() => useQuery())
        act(() => result.current.setQuery('ab'))
        expect(result.current.error).toBe('La búsqueda debe tener al menos 3 caracteres')
    })

    it('clears error on valid query', () => {
        const { result } = renderHook(() => useQuery())
        act(() => result.current.setQuery('12'))
        expect(result.current.error).not.toBeNull()
        act(() => result.current.setQuery('batman'))
        expect(result.current.error).toBeNull()
    })

    it('accepts query with letters and numbers', () => {
        const { result } = renderHook(() => useQuery())
        act(() => result.current.setQuery('batman 2022'))
        expect(result.current.error).toBeNull()
    })
})
