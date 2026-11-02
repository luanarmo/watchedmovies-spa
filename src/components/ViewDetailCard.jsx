import { BiCommentX } from "react-icons/bi";
import { FaTrash, FaHeart, FaPen } from 'react-icons/fa';
import { truncateText } from '../utils/truncateText'

const MAX_COMMENT_LENGTH = 70;

// A full-width row on phones with the actions always visible (44px); a card with hover actions from lg up
export const ViewDetailCard = ({ viewDetail, onEdit, onDelete }) => {
    return (
        <li className='bg-dusty-grape-800 py-3 pl-4 pr-2 lg:p-4 w-full lg:w-60 rounded-2xl lg:rounded-xl border border-dusty-grape-700 shadow-md text-dusty-grape-100 flex flex-row lg:flex-col items-center lg:items-stretch gap-2 relative group'>
            <div className='flex-1 min-w-0 flex flex-col gap-2'>
                <div className='flex flex-wrap lg:flex-nowrap justify-between items-center gap-2 lg:pr-0'>
                    <span className='px-2 py-1 bg-dusty-grape-700 rounded text-xs font-semibold uppercase tracking-wider'>{viewDetail.place}</span>
                    <div className='flex items-center gap-2'>
                        {viewDetail.is_favorite && <FaHeart className='text-red-400' title='Favorite' size={12} />}
                        <span className='text-sm text-dusty-grape-300'>{viewDetail.watched_date}</span>
                    </div>
                </div>
                <p className='text-sm text-dusty-grape-300'>Language: <span className='text-dusty-grape-100 font-medium uppercase'>{viewDetail.language}</span></p>

                <p className='text-sm italic text-dusty-grape-200 lg:mt-2 lg:bg-dusty-grape-900/30 lg:p-2 rounded'>
                    {viewDetail.comment ? truncateText(viewDetail.comment, MAX_COMMENT_LENGTH) : <span className='flex items-center gap-1 text-dusty-grape-400'><BiCommentX /> No comment</span>}
                </p>
            </div>

            <div className='flex-none flex lg:absolute lg:top-2 lg:right-2 gap-1 lg:opacity-0 lg:group-hover:opacity-100 lg:focus-within:opacity-100 transition-opacity'>
                <button
                    aria-label='Edit view'
                    className='flex items-center justify-center w-11 h-11 lg:w-8 lg:h-8 rounded-full bg-dusty-grape-700 lg:bg-dusty-grape-900/80 text-dusty-grape-100 hover:bg-dusty-grape-600 lg:hover:bg-dusty-grape-900 transition-colors'
                    onClick={() => onEdit(viewDetail)}
                >
                    <FaPen title='Edit view' size={14} />
                </button>
                <button
                    aria-label='Remove view'
                    className='flex items-center justify-center w-11 h-11 lg:w-8 lg:h-8 rounded-full text-red-400 hover:text-red-300 lg:bg-dusty-grape-900/80 hover:bg-dusty-grape-700 lg:hover:bg-dusty-grape-900 transition-colors'
                    onClick={() => onDelete(viewDetail.id)}
                >
                    <FaTrash title='Remove viewed movie' size={14} />
                </button>
            </div>
        </li>
    );
};
