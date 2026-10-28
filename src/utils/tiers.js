// The API stores the tier as a number from 1 to 5; 5 is the best (S)
export const TIERS = [
    { value: 5, letter: 'S' },
    { value: 4, letter: 'A' },
    { value: 3, letter: 'B' },
    { value: 2, letter: 'C' },
    { value: 1, letter: 'D' },
]

export const getTierLetter = (value) => TIERS.find(tier => tier.value === value)?.letter
