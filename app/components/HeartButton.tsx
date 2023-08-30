import React from 'react'
import useAuthStore from '../hooks/useAuthStore';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';


interface HeartButtonProps {
  listingId: string,
}



const HeartButton: React.FC<HeartButtonProps> = ({ listingId }) => {

  const {user: currentUser} = useAuthStore();
  const hasFavorited = false;
  const toggleFavorite = () => {};
  return (
    <div className='relative hover:opacity-80 transition cursor-pointer '>
        <AiOutlineHeart size={28} className='fill-white absolute -top-[2px] -right-[2px] '  />
        <AiFillHeart size={24} className={`${hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'}`} />
    </div>
  )
}

export default HeartButton