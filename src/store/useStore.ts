import { create } from 'zustand';
import { Voice, GeneratedAudio } from '../types';

interface State {
  voices: Voice[];
  selectedVoice: Voice | null;
  generatedAudios: GeneratedAudio[];
  setVoices: (voices: Voice[]) => void;
  setSelectedVoice: (voice: Voice | null) => void;
  addGeneratedAudio: (audio: GeneratedAudio) => void;
}

export const useStore = create<State>((set) => ({
  voices: [],
  selectedVoice: null,
  generatedAudios: [],
  setVoices: (voices) => set({ voices }),
  setSelectedVoice: (voice) => set({ selectedVoice: voice }),
  addGeneratedAudio: (audio) =>
    set((state) => ({
      generatedAudios: [audio, ...state.generatedAudios],
    })),
}));