
export function Search({ onChange, onSubmit, search, error, children }) {

    return (
        <section className="bg-gradient-to-r from-dusty-grape-600 to-dusty-grape-500 p-4 text-white shadow-lg mb-8">
            <div className="mx-auto flex flex-col gap-6">
                {children}
                <form className="flex w-full items-center gap-2" onSubmit={onSubmit}>
                    <input
                        type="text"
                        placeholder="Search a movie ..."
                        onChange={onChange}
                        value={search}
                        className="flex-grow p-2 text-lg border-2 border-dusty-grape-400 rounded-lg bg-dusty-grape-50 text-dusty-grape-900 placeholder-dusty-grape-400 focus:outline-none focus:border-dusty-grape-200 focus:ring-2 focus:ring-dusty-grape-300/50 transition-all"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-dusty-grape-800 text-white text-lg font-bold rounded-lg hover:bg-dusty-grape-900 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                        Search
                    </button>
                </form>
            </div>
        </section>
    )
}