import React from 'react'
import useAuthStore from '../hooks/useAuthStore';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import useFavorite from '../hooks/useFavorite';


interface HeartButtonProps {
  listingId: string,
}



const HeartButton: React.FC<HeartButtonProps> = ({ listingId }) => {

  const {user: currentUser} = useAuthStore();
  
  const {hasFavoritted, toggleFavorite} = useFavorite({ listingId, currentUser });

  return (
    <div className='relative hover:opacity-80 transition cursor-pointer ' onClick={toggleFavorite}>
        <AiOutlineHeart size={28} className='fill-white absolute -top-[2px] -right-[2px] '  />
        <AiFillHeart size={24} className={`${hasFavoritted ? 'fill-rose-500' : 'fill-neutral-500/70'}`} />
    </div>
  )
}

export default HeartButton