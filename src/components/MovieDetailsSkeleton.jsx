export function MovieDetailsSkeleton() {
    return (
        <div className='flex flex-col p-4 gap-2 justify-start items-center min-h-screen'>
            <div className='skeleton-title bg-gray-300 w-3/4 h-8 rounded-md'></div>
            <div className='skeleton-image bg-gray-300 w-full h-48 rounded-md'></div>
            <section className='flex flex-col gap-2 items-center w-full'>
                <div className='skeleton-overview bg-gray-300 w-full h-20 rounded-md'></div>
                <div className='skeleton-button bg-gray-300 w-1/2 h-10 rounded-md'></div>
            </section>
        </div>
    )
}