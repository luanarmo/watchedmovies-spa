export const OrderOption = ({ options, selectedOption, handleOrderChange, suffix }) => {
    return (
        <div className="flex items-center justify-center rounded-full bg-dusty-grape-800 border border-dusty-grape-700">
            <select
                value={selectedOption}
                onChange={(e) => handleOrderChange(e.target.value)}
                className="px-4 py-2 rounded-full text-dusty-grape-50 bg-dusty-grape-700 hover:bg-dusty-grape-600 transition-colors focus:outline-none focus:ring-2 focus:ring-dusty-grape-500 cursor-pointer"
            >
                {options.map((option) => {
                    // Verifica si la opción es un objeto o un string
                    const key = typeof option === "string" || typeof option == "number" ? option : option.key;
                    const label = typeof option === "string" || typeof option == "number" ? option : option.label;
                    return (
                        <option key={key} value={key} className="text-dusty-grape-900 bg-dusty-grape-50">
                            {suffix ? ` ${suffix} ${label}` : label}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};
