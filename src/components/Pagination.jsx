export const Pagination = ({ page, pagination, handlePage }) => {
    return (
        <div className="flex items-center justify-center rounded-full bg-dusty-grape-800 p-2 space-x-4 border border-dusty-grape-700 shadow-lg">
            <button
                className={`px-4 py-2 rounded-full text-dusty-grape-50 transition-colors ${page <= 1 ? 'bg-dusty-grape-900 cursor-not-allowed text-dusty-grape-600' : 'bg-dusty-grape-700 hover:bg-dusty-grape-600'}`}
                onClick={() => {
                    const newPage = page - 1;
                    if (newPage < 1) return;

                    if (pagination?.previous) {
                        handlePage(newPage);
                    }
                }}
                disabled={page <= 1}
            >
                Before
            </button>
            <p className="text-xl text-dusty-grape-100 font-bold w-8 text-center">
                {page}
            </p>
            <button
                className={`px-4 py-2 rounded-full text-dusty-grape-50 transition-colors ${pagination?.next === null ? 'bg-dusty-grape-900 cursor-not-allowed text-dusty-grape-600' : 'bg-dusty-grape-700 hover:bg-dusty-grape-600'}`}
                onClick={() => {
                    const newPage = page + 1;
                    if (pagination?.next) {
                        handlePage(newPage);
                    }
                }}
                disabled={pagination?.next === null}
            >
                Next
            </button>
        </div>
    );
};
