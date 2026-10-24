import { useState } from 'react';
import { BiCommentX } from "react-icons/bi";
import { FaTrash, FaHeart, FaPen, FaEllipsisV } from 'react-icons/fa';
import { truncateText } from '../utils/truncateText'

const MAX_COMMENT_LENGTH = 70;

export const ViewDetailCard = ({ viewDetail, onEdit, onDelete }) => {
    const [showContext, setShowContext] = useState(false);

    const toggleContext = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setShowContext(prev => !prev);
    };

    const handleEdit = () => {
        setShowContext(false);
        onEdit(viewDetail);
    };

    const handleDelete = () => {
        setShowContext(false);
        onDelete(viewDetail.id);
    };

    return (
        <li className='bg-dusty-grape-800 p-4 w-60 rounded-xl border border-dusty-grape-700 shadow-md text-dusty-grape-100 flex flex-col gap-2 relative group'>
            <div className='flex justify-between items-start pr-8 lg:pr-0'>
                <span className='px-2 py-1 bg-dusty-grape-700 rounded text-xs font-semibold uppercase tracking-wider'>{viewDetail.place}</span>
                <div className='flex items-center gap-2'>
                    {viewDetail.is_favorite && <FaHeart className='text-red-400' title='Favorite' size={12} />}
                    <span className='text-sm text-dusty-grape-300'>{viewDetail.watched_date}</span>
                </div>
            </div>
            <p className='text-sm text-dusty-grape-300'>Language: <span className='text-dusty-grape-100 font-medium uppercase'>{viewDetail.language}</span></p>

            <div className='flex items-center gap-2 mt-2'>
                <span className='flex items-center gap-1 text-yellow-400 font-bold bg-dusty-grape-900/50 px-2 py-1 rounded'>{viewDetail.rating ? viewDetail.rating : 'N/A'} <span className='text-xs opacity-70'>/ 10</span></span>
            </div>

            <p className='text-sm italic text-dusty-grape-200 mt-2 bg-dusty-grape-900/30 p-2 rounded'>
                {viewDetail.comment ? truncateText(viewDetail.comment, MAX_COMMENT_LENGTH) : <span className='flex items-center gap-1 text-dusty-grape-500'><BiCommentX /> No comment</span>}
            </p>

            {/* Desktop Actions */}
            <div className='hidden lg:flex absolute top-2 right-2 gap-1 opacity-0 group-hover:opacity-100 transition-opacity'>
                <button
                    aria-label='Edit view'
                    className='text-dusty-grape-200 hover:text-dusty-grape-100 transition-colors bg-dusty-grape-900/80 p-1.5 rounded-full hover:bg-dusty-grape-900'
                    onClick={handleEdit}
                >
                    <FaPen title='Edit view' size={14} />
                </button>
                <button
                    aria-label='Remove view'
                    className='text-red-400 hover:text-red-300 transition-colors bg-dusty-grape-900/80 p-1.5 rounded-full hover:bg-dusty-grape-900'
                    onClick={handleDelete}
                >
                    <FaTrash title='Remove viewed movie' size={14} />
                </button>
            </div>

            {/* Mobile Context Menu */}
            <div className='lg:hidden absolute top-2 right-2 z-20 flex flex-col items-end gap-1'>
                <button
                    aria-label='More actions'
                    aria-expanded={showContext}
                    onClick={toggleContext}
                    className='p-1.5 rounded-full bg-black/40 text-dusty-grape-100 backdrop-blur-sm hover:bg-black/60 transition-colors'
                >
                    <FaEllipsisV size={14} />
                </button>

                <div
                    className={`flex flex-col gap-1 transition-all duration-200 origin-top-right ${showContext
                        ? 'opacity-100 scale-100 translate-y-0'
                        : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                        }`}
                >
                    <button
                        aria-label='Edit view'
                        onClick={handleEdit}
                        className='p-2 rounded-full bg-dusty-grape-600 text-white shadow-lg backdrop-blur-sm hover:bg-dusty-grape-500 transition-colors flex items-center justify-center'
                    >
                        <FaPen size={14} />
                    </button>
                    <button
                        aria-label='Remove view'
                        onClick={handleDelete}
                        className='p-2 rounded-full bg-red-500/90 text-white shadow-lg backdrop-blur-sm hover:bg-red-600 transition-colors flex items-center justify-center'
                    >
                        <FaTrash size={14} />
                    </button>
                </div>
            </div>
        </li>
    );
};
