import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import {toast} from 'react-hot-toast';
import useLoginModal from './useLoginModal';
import { User } from '@prisma/client';
import { list } from 'firebase/storage';
import { log } from 'console';
import { safeUser } from '../types';

interface IUseFavorite {
    listingId: string,
    currentUser?: safeUser | null;
}
const useFavorite = ({listingId, currentUser} : IUseFavorite) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const hasFavoritted = useMemo(() => {
        const list = currentUser?.favoriteIds || [];
        return list.includes(listingId);
    }, [currentUser, listingId]);

    const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (!currentUser?.id) {
            return loginModal.onOpen();
        }
        try {
            let request;
            if (hasFavoritted) {
                request = () => axios.delete(`/api/favorites/${listingId}`, JSON.parse(localStorage.getItem('user')));
            } else {
                request = () => axios.post(`/api/favorites/${listingId}`, JSON.parse(localStorage.getItem('user')));
            }
            const data = await request();
            console.log(data, 'tttt')
            // router.refresh();
            toast.success('Favorite list updated successfully');


        } catch (error) {
            toast.error('something went wrong');
        }
    }, [currentUser, hasFavoritted, loginModal, listingId, router]);
    return {
        hasFavoritted, toggleFavorite
    }
}

export default useFavorite;