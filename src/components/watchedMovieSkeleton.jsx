export const WatchedMovieSkeleton = () => {
    return (
        <li className="flex flex-col rounded-xl bg-slate-600 animate-pulse">
            <div className="bg-gray-300 h-20 w-full mb-2 rounded-xl"></div>
            <div className="p-2">
                <div className="flex items-center justify-center gap-2">
                    <div className="bg-gray-300 h-4 w-1/4 rounded"></div>
                    <div className="bg-gray-300 h-4 w-1/4 rounded"></div>
                    <div className="bg-gray-300 h-4 w-1/4 rounded"></div>
                </div>
            </div>
        </li>
    );
};
