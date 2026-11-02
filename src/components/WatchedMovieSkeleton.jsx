// Mirrors WatchedMovie: a diary row below md, a poster card from md up
export const WatchedMovieSkeleton = () => {
    return (
        <li className="flex flex-row items-center gap-3 py-3 border-t border-dusty-grape-800 animate-pulse md:flex-col md:items-stretch md:gap-0 md:py-0 md:border-t-0 md:rounded-xl md:bg-dusty-grape-800 md:border md:border-dusty-grape-700 overflow-hidden md:shadow-lg">
            {/* Poster Image */}
            <div className="w-14 flex-none aspect-[2/3] rounded-lg bg-dusty-grape-700 md:w-full md:rounded-none"></div>

            {/* Row info (below md) */}
            <div className="md:hidden flex flex-col gap-2 flex-1">
                <div className="bg-dusty-grape-700 h-4 w-2/3 rounded"></div>
                <div className="bg-dusty-grape-700 h-4 w-1/3 rounded"></div>
            </div>

            {/* Bottom Bar items (md+) */}
            <div className="hidden md:flex gap-4 items-center justify-center min-h-[3.5rem] p-2 bg-dusty-grape-800">
                <div className="bg-dusty-grape-700 h-5 w-8 rounded"></div>
                <div className="bg-dusty-grape-700 h-5 w-8 rounded"></div>
                <div className="bg-dusty-grape-700 h-6 w-6 rounded-full"></div>
            </div>
        </li>
    );
};
