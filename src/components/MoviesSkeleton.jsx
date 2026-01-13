export function MoviesSkeleton() {
    const skeletonItems = Array.from({ length: 20 });

    return (
        <section>
            <ul className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-6 p-4">
                {skeletonItems.map((_, index) => (
                    <li
                        key={index}
                        className="bg-dusty-grape-800 text-transparent shadow-lg rounded-xl overflow-hidden animate-pulse border border-dusty-grape-700"
                    >
                        <div className="aspect-[2/3] w-full bg-dusty-grape-700"></div>
                        <div className="p-3 w-full h-16 bg-dusty-grape-800">
                            <div className="h-4 bg-dusty-grape-700 rounded w-3/4 mb-2"></div>
                            <div className="h-3 bg-dusty-grape-700 rounded w-1/2"></div>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}
