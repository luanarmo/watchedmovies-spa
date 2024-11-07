export const Pagination = ({ page, pagination, handlePage }) => {
    return (
        <div className="flex items-center justify-center rounded-full bg-gray-800 p-2 space-x-4">
            <button
                className={`px-4 py-2 rounded-full text-white transition-colors ${page <= 1 ? 'bg-gray-600 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-600'}`}
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
            <p className="text-xl text-white">
                {page}
            </p>
            <button
                className="px-4 py-2 rounded-full text-white transition-colors bg-gray-700 hover:bg-gray-600"
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
