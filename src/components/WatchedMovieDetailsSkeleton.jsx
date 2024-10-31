

export function WatchedMovieDetailsSkeleton() {
    return (
        <div className='flex flex-col p-4 gap-2 justify-start items-center bg-slate-950 text-white'>
            <div className='skeleton-title bg-gray-700 w-3/4 h-8 rounded-md mb-4'></div>
            <div className='skeleton-image bg-gray-700 w-full h-48 rounded-md mb-4'></div>
            <div className='skeleton-overview bg-gray-700 w-full h-20 rounded-md mb-4'></div>
            <div className='skeleton-viewed-times bg-gray-700 w-1/2 h-8 rounded-md mb-2'></div>
            <div className='flex space-x-4 p-0'>
                <div className='skeleton-list-item bg-gray-700 w-1/3 h-10 rounded-md'></div>
                <div className='skeleton-list-item bg-gray-700 w-1/3 h-10 rounded-md'></div>
                <div className='skeleton-list-item bg-gray-700 w-1/3 h-10 rounded-md'></div>
            </div>
        </div>
    )
}