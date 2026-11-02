
// Phones: dark pill + coral button, like the rest of the mobile design; from md up: the original gradient banner
export function Search({ onChange, onSubmit, search, children }) {

    return (
        <section className="md:bg-gradient-to-r md:from-dusty-grape-600 md:to-dusty-grape-500 p-4 text-white md:shadow-lg mb-4 md:mb-8">
            <div className="mx-auto flex flex-col gap-4 md:gap-6">
                {children}
                <form className="flex w-full items-center gap-2" onSubmit={onSubmit} role="search">
                    <input
                        type="text"
                        aria-label="Search a movie"
                        placeholder="Search a movie ..."
                        onChange={onChange}
                        value={search}
                        className="flex-grow min-w-0 min-h-[48px] md:min-h-0 px-4 md:px-2 py-2 text-base md:text-lg border rounded-full md:rounded-lg md:border-2 bg-dusty-grape-800 md:bg-dusty-grape-50 text-dusty-grape-50 md:text-dusty-grape-900 border-dusty-grape-700 md:border-dusty-grape-400 placeholder-dusty-grape-300 md:placeholder-dusty-grape-400 focus:outline-none focus:border-coral md:focus:border-dusty-grape-200 focus:ring-2 focus:ring-coral/40 md:focus:ring-dusty-grape-300/50 transition-all"
                    />
                    <button
                        type="submit"
                        className="min-h-[48px] md:min-h-0 px-5 md:px-4 py-2 bg-coral text-dusty-grape-950 md:bg-dusty-grape-800 md:text-white text-base md:text-lg font-bold rounded-full md:rounded-lg hover:brightness-110 md:hover:brightness-100 md:hover:bg-dusty-grape-900 transition-colors shadow-md hover:shadow-lg md:transform md:hover:-translate-y-0.5 active:translate-y-0"
                    >
                        Search
                    </button>
                </form>
            </div>
        </section>
    )
}
