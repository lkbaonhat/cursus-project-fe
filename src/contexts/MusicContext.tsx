import { createContext, useEffect, useState, useRef } from 'react';
import Chirstmas from '../assest/christmast.mp3';

export const AudioContext = createContext(null);

export const AudioProvider = ({ children }:{ children: React.ReactNode }) => {
  const audioRef = useRef(new Audio(Chirstmas));
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.2);

  useEffect(() => {
    audioRef.current.volume = volume;
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }

    return () => {
      audioRef.current.pause(); // Dừng âm thanh khi unmount
    };
  }, [isPlaying, volume]);

  return (
    <AudioContext.Provider value={{ isPlaying, setIsPlaying, volume, setVolume }}>
      {children}
    </AudioContext.Provider>
  );
};

