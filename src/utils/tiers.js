// The API stores the tier as a number from 1 to 5; 5 is the best (S)
export const TIERS = [
    { value: 5, letter: 'S' },
    { value: 4, letter: 'A' },
    { value: 3, letter: 'B' },
    { value: 2, letter: 'C' },
    { value: 1, letter: 'D' },
]

// Background of each tier, 5 = S ... 1 = D; they differ in lightness, not only in hue (used with dark text)
export const TIER_BG = {
    5: 'bg-[#f6d365]',
    4: 'bg-coral',
    3: 'bg-[#9ad1d4]',
    2: 'bg-dusty-grape-200',
    1: 'bg-[#a9adbd]',
}

export const getTierLetter = (value) => TIERS.find(tier => tier.value === value)?.letter
