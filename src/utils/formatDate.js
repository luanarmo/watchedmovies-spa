// The API sends dates as YYYY-MM-DD; build the date from its parts so the timezone never shifts the day
export const formatDate = (isoDate) => {
    if (!isoDate) {
        return null
    }
    const [year, month, day] = isoDate.split('-').map(Number)
    return new Date(year, month - 1, day).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })
}
