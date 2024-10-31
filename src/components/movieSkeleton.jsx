export function MoviesSkeleton() {
    const skeletonItems = Array.from({ length: 20 });

    return (
        <section>
            <ul className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 p-4 bg-slate-950">
                {skeletonItems.map((_, index) => (
                    <li
                        key={index}
                        className="bg-slate-600 text-transparent shadow-lg rounded-lg overflow-hidden animate-pulse"
                    >
                        <div className="h-64 bg-gray-300"></div>
                    </li>
                ))}
            </ul>
        </section>
    );
}
