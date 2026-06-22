import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface WorkoutSession {
  id: string;
  date: string;
  duration: number; 
  distance: number; 
  calories: number;
}

interface AppState {
  steps: number;
  dailyGoal: number;
  profileImageUri: string | null;
  history: WorkoutSession[];
  setSteps: (steps: number) => void;
  setProfileImage: (uri: string | null) => void;
  addSession: (session: WorkoutSession) => void;
  deleteSession: (id: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      steps: 0,
      dailyGoal: 6000,
      profileImageUri: null,
      history: [],
      setSteps: (newSteps) => set({ steps: newSteps }),
      setProfileImage: (uri) => set({ profileImageUri: uri }),
      addSession: (session) => set((state) => ({ history: [session, ...state.history] })),
      deleteSession: (id) => set((state) => ({ history: state.history.filter((s) => s.id !== id) })),
    }),
    {
      name: 'pulsefit-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);