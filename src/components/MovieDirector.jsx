// Renders nothing when the movie has no directors: older watched movies have none until the backend backfill runs
export function MovieDirector({ directors, className = '' }) {
    if (!directors?.length) {
        return null
    }

    return (
        <p className={`w-full text-dusty-grape-100 text-base lg:text-lg ${className}`}>
            <span className='font-bold'>{directors.length > 1 ? 'Directors' : 'Director'}:</span> {directors.join(', ')}
        </p>
    )
}
