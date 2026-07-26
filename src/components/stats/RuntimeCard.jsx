import { useState } from 'react'

const UNITS = ['minutes', 'hours', 'days']

const convert = (minutes, unit) => {
    if (unit === 'minutes') return Math.round(minutes).toLocaleString()
    if (unit === 'hours') return Math.round(minutes / 60).toLocaleString()
    if (unit === 'days') return (minutes / 1440).toFixed(1)
    return minutes
}

export const RuntimeCard = ({ totalMinutes }) => {
    const [unit, setUnit] = useState('hours')

    return (
        <div className='bg-dusty-grape-800/50 backdrop-blur-sm border border-dusty-grape-700 rounded-xl p-5 flex flex-col gap-3'>
            <span className='text-dusty-grape-300 text-sm font-medium uppercase tracking-wider'>Total Watch Time</span>
            <p className='text-dusty-grape-50 text-4xl font-bold'>
                {convert(totalMinutes || 0, unit)} <span className='text-lg font-normal text-dusty-grape-300'>{unit}</span>
            </p>
            <div className='flex gap-2 flex-wrap'>
                {UNITS.map((u) => (
                    <button
                        key={u}
                        onClick={() => setUnit(u)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors border ${
                            unit === u
                                ? 'bg-dusty-grape-600 border-dusty-grape-500 text-dusty-grape-50'
                                : 'bg-dusty-grape-900 border-dusty-grape-700 text-dusty-grape-300 hover:border-dusty-grape-500'
                        }`}
                    >
                        {u}
                    </button>
                ))}
            </div>
        </div>
    )
}
