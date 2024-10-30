export const WatchedMovieSkeleton = () => {
    return (
        <div className="flex rounded-xl bg-slate-600 animate-pulse">
            <div className='w-32'>
                <div className="bg-gray-300 h-full rounded-l-xl"></div>
            </div>
            <div className="p-2">
                <div className="bg-gray-300 h-6 w-3/4 rounded mb-2"></div>
                <div className="flex items-center mb-1">
                    <div className="bg-gray-300 h-4 w-1/4 rounded mr-2"></div>
                    <div className="bg-gray-300 h-4 w-1/4 rounded"></div>
                </div>
                <div className="flex items-center mb-1">
                    <div className="bg-gray-300 h-4 w-1/4 rounded mr-2"></div>
                    <div className="bg-gray-300 h-4 w-1/4 rounded"></div>
                </div>
                <div className="flex items-center mb-1">
                    <div className="bg-gray-300 h-4 w-1/4 rounded mr-2"></div>
                    <div className="bg-gray-300 h-4 w-1/4 rounded"></div>
                </div>
                <div className="mt-4 space-x-4">
                    <button className="bg-gray-300 rounded p-2 w-12 h-8"></button>
                </div>
            </div>
        </div>
    );
};
