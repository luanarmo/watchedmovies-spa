import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const GRAPE = '#8474be'
const GRID = '#292145'
const TICK = '#a397ce'

const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null
    return (
        <div className='bg-dusty-grape-900 border border-dusty-grape-700 rounded-lg px-3 py-2 text-sm'>
            <p className='text-dusty-grape-300 font-semibold'>Rating {label}</p>
            <p className='text-dusty-grape-50'>{payload[0].value} viewings</p>
        </div>
    )
}

export const RatingDistribution = ({ data }) => (
    <div className='bg-dusty-grape-800/50 backdrop-blur-sm border border-dusty-grape-700 rounded-xl p-5 flex flex-col gap-4'>
        <h3 className='text-dusty-grape-100 font-semibold'>Rating Distribution</h3>
        <ResponsiveContainer width='100%' height={280}>
            <BarChart data={data || []} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray='3 3' stroke={GRID} />
                <XAxis dataKey='rating' tick={{ fill: TICK, fontSize: 12 }} />
                <YAxis tick={{ fill: TICK, fontSize: 12 }} allowDecimals={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#3d316820' }} />
                <Bar dataKey='count' fill={GRAPE} radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    </div>
)
