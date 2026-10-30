import { useState } from 'react'
import { Link } from 'react-router-dom'
import { DndContext, DragOverlay, PointerSensor, pointerWithin, useDraggable, useDroppable, useSensor, useSensors } from '@dnd-kit/core'
import { TIERS } from '../utils/tiers.js'

const POSTER_PLACEHOLDER = 'https://placehold.co/500x750?font=roboto'

function Poster({ movie }) {
    return (
        <img
            src={movie.poster_url || POSTER_PLACEHOLDER}
            alt={movie.title}
            title={movie.title}
            draggable={false}
            className='w-16 md:w-20 aspect-[2/3] object-cover rounded-md shadow-md'
        />
    )
}

function DraggablePoster({ movie }) {
    const { setNodeRef, listeners, isDragging } = useDraggable({ id: movie.id })

    return (
        <div ref={setNodeRef} {...listeners} className={isDragging ? 'opacity-40' : undefined}>
            <Link to={`/watchedDetails/${movie.id}`} draggable={false} className='block hover:scale-105 transition-transform'>
                <Poster movie={movie} />
            </Link>
        </div>
    )
}

function TierRow({ tier, movies }) {
    const { setNodeRef, isOver } = useDroppable({ id: tier.value })

    return (
        <tr ref={setNodeRef}>
            <th scope='row' className='w-16 md:w-20 rounded-l-xl bg-dusty-grape-500 text-white text-2xl md:text-3xl font-bold'>
                {tier.letter}
            </th>
            <td className={`rounded-r-xl border p-2 ${isOver ? 'bg-dusty-grape-700/60 border-dusty-grape-400' : 'bg-dusty-grape-800/50 border-dusty-grape-700'}`}>
                <div className='flex flex-wrap gap-2 min-h-24'>
                    {movies.map(movie => <DraggablePoster key={movie.id} movie={movie} />)}
                </div>
            </td>
        </tr>
    )
}

export function TierListTable({ movies, onMoveMovie }) {
    const [activeMovie, setActiveMovie] = useState(null)
    // The distance keeps a plain click on a poster working as a link
    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }))

    if (movies.length === 0) {
        return <p className='text-center text-dusty-grape-400 py-10'>No movies with a tier yet.</p>
    }

    const handleDragStart = ({ active }) => {
        setActiveMovie(movies.find(movie => movie.id === active.id) ?? null)
    }

    const handleDragEnd = ({ active, over }) => {
        setActiveMovie(null)
        const movie = movies.find(movie => movie.id === active.id)
        if (movie && over && movie.tier !== over.id) onMoveMovie(movie.id, over.id)
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={pointerWithin}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={() => setActiveMovie(null)}
        >
            <table className='w-full border-separate border-spacing-y-2'>
                <tbody>
                    {TIERS.map(tier => (
                        <TierRow key={tier.value} tier={tier} movies={movies.filter(movie => movie.tier === tier.value)} />
                    ))}
                </tbody>
            </table>
            <DragOverlay>{activeMovie ? <Poster movie={activeMovie} /> : null}</DragOverlay>
        </DndContext>
    )
}
