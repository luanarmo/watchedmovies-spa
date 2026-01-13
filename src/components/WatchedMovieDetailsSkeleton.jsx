

export function WatchedMovieDetailsSkeleton() {
    return (
        <div className='flex flex-col p-4 gap-6 justify-start items-center w-full max-w-4xl mx-auto animate-pulse'>
            {/* Title */}
            <div className='bg-dusty-grape-700 w-1/2 h-10 rounded-md'></div>

            {/* Image */}
            <div className='bg-dusty-grape-800 w-full aspect-video rounded-xl shadow-lg border border-dusty-grape-700'></div>

            {/* Content Section */}
            <div className="bg-dusty-grape-800/50 p-6 rounded-xl border border-dusty-grape-700 w-full md:w-3/4">
                {/* Overview */}
                <div className='flex flex-col gap-2 mb-6'>
                    <div className='bg-dusty-grape-700 w-full h-4 rounded'></div>
                    <div className='bg-dusty-grape-700 w-full h-4 rounded'></div>
                    <div className='bg-dusty-grape-700 w-3/4 h-4 rounded'></div>
                </div>

                {/* Viewed Times Title */}
                <div className='bg-dusty-grape-700 w-1/3 h-8 rounded mx-auto mb-4'></div>

                {/* List Items */}
                <div className='flex space-x-4 p-2 overflow-hidden'>
                    <div className='bg-dusty-grape-700 w-60 h-40 rounded-xl flex-shrink-0'></div>
                    <div className='bg-dusty-grape-700 w-60 h-40 rounded-xl flex-shrink-0'></div>
                    <div className='bg-dusty-grape-700 w-60 h-40 rounded-xl flex-shrink-0'></div>
                </div>
            </div>
        </div>
    )
}