// useAudio.ts
import { useContext } from 'react';
import { AudioContext } from './MusicContext';

export const useAudio = () => useContext(AudioContext);