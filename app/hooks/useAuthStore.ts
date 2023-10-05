import { create } from 'zustand'
import axios from 'axios';
import { User } from 'next-auth';
import { safeUser } from '../types';



interface AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, name: string, password: string) => Promise<void>;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  login: async (email, password) => {
    try {
      const response = await axios.post('/api/login', { email, password });
      const user = response.data;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },

  register: async (email, name, password) => {
    try {
      const response = await axios.post('/api/register', { email, name, password });
      const user = response.data;
      // Handle successful registration
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  },

  logout: () => {
    localStorage.clear();
  },
}));

export default useAuthStore;

