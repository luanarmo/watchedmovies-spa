export const WatchedMovieSkeleton = () => {
    return (
        <li className="flex flex-col rounded-xl bg-dusty-grape-800 border border-dusty-grape-700 overflow-hidden animate-pulse shadow-lg">
            {/* Poster Image */}
            <div className="aspect-[2/3] w-full bg-dusty-grape-700"></div>

            {/* Bottom Bar items */}
            <div className="flex gap-4 items-center justify-center min-h-[3.5rem] p-2 bg-dusty-grape-800">
                <div className="bg-dusty-grape-700 h-5 w-8 rounded"></div>
                <div className="bg-dusty-grape-700 h-5 w-8 rounded"></div>
                <div className="bg-dusty-grape-700 h-6 w-6 rounded-full"></div>
            </div>
        </li>
    );
};
