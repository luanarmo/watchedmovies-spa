export const OrderOption = ({ options, selectedOption, handleOrderChange }) => {
    return (
        <div className="flex items-center justify-center rounded-full bg-gray-800">
            <select
                value={selectedOption}
                onChange={(e) => handleOrderChange(e.target.value)}
                className="px-4 py-2 rounded-full text-white bg-gray-700 hover:bg-gray-600 transition-colors"
            >
                {options.map((option) => {
                    // Verifica si la opción es un objeto o un string
                    const key = typeof option === "string" || typeof option == "number" ? option : option.key;
                    const label = typeof option === "string" || typeof option == "number" ? option : option.label;
                    return (
                        <option key={key} value={key} className="text-black">
                            {label}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};
