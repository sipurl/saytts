import { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { voices } from '../data/voices';

export function useVoices() {
  const { setVoices } = useStore();

  useEffect(() => {
    // In a real application, this would fetch from the Verbatik API
    // For now, we're using the local data
    setVoices(voices);
  }, [setVoices]);
}