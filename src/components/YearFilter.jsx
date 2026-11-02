import { OrderOption } from './OrderOption.jsx'

const toKey = (option) => (typeof option === 'object' ? option.key : option)
const toLabel = (option) => (typeof option === 'object' ? option.label : option)

// Year selector: scrollable chips on phones (one tap, thumb friendly), the usual select from md up
export function YearFilter({ options, selectedOption, handleOrderChange, suffix }) {
    return (
        <>
            <div role='group' aria-label='Year' className='md:hidden flex max-w-full gap-2 overflow-x-auto pb-1 [scrollbar-width:none]'>
                {options.map((option) => {
                    const key = toKey(option)
                    const active = String(key) === String(selectedOption)
                    return (
                        <button
                            key={key}
                            type='button'
                            aria-pressed={active}
                            onClick={() => handleOrderChange(String(key))}
                            className={`flex-none min-h-[44px] px-4 rounded-full border text-sm transition-colors ${active ? 'border-coral bg-coral text-dusty-grape-950 font-bold' : 'border-dusty-grape-700 text-dusty-grape-100 hover:bg-dusty-grape-800'}`}
                        >
                            {key === '' ? 'All' : toLabel(option)}
                        </button>
                    )
                })}
            </div>
            <div className='hidden md:block'>
                <OrderOption
                    options={options}
                    selectedOption={selectedOption}
                    suffix={suffix}
                    handleOrderChange={handleOrderChange}
                />
            </div>
        </>
    )
}
