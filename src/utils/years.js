// The "All years" option of the year selector has an empty key, the API calls it "all"
export const toYearParam = (year) => year === '' ? 'all' : year
