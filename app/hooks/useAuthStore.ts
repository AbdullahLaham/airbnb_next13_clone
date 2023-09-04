import { create } from 'zustand'
import axios from 'axios';
import { User } from 'next-auth';
import { safeUser } from '../types';



interface AuthState {
  user: safeUser | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, name: string, password: string) => Promise<void>;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  
  user: typeof window !== 'undefined' && localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')) : null,

  login: async (email, password) => {
    try {
      const response = await axios.post('/api/login', { email, password });
      const user = response.data;
      set({ user });
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },

  register: async (email, name, password) => {
    try {
      const response = await axios.post('/api/register', { email, name, password });
      const user = response.data;
      set({user});
      localStorage.setItem('user', JSON.stringify(user));
      // Handle successful registration
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  },

  logout: () => {
    
    set({ user: null });
    localStorage.clear();

  },
}));

export default useAuthStore;

