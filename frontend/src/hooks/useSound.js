import { useEffect, useRef } from 'react';
import { useSettingsStore } from '../store/uiStore';

export const useSound = () => {
  const { sfxEnabled, sfxVolume } = useSettingsStore();

  const playSfx = (soundFile) => {
    if (!sfxEnabled) return;
    const audio = new Audio(`/src/assets/sounds/${soundFile}`);
    audio.volume = sfxVolume;
    audio.play().catch(e => console.log('Audio play blocked:', e));
  };

  return { playSfx };
};

export const useBackgroundMusic = () => {
    const { musicEnabled, currentTrack, musicVolume } = useSettingsStore();
    const audioRef = useRef(null);

    useEffect(() => {
        if (!audioRef.current) {
            audioRef.current = new Audio();
            audioRef.current.loop = true;
        }

        audioRef.current.volume = musicVolume;

        if (musicEnabled) {
            audioRef.current.src = `/src/assets/sounds/Background_Music/${currentTrack}`;
            audioRef.current.play().catch(e => console.log('BGM blocked by browser:', e));
        } else {
            audioRef.current.pause();
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
            }
        }
    }, [musicEnabled, currentTrack, musicVolume]);
    
    const initMusic = () => {
        if (musicEnabled && audioRef.current && audioRef.current.paused) {
             audioRef.current.play().catch(e => console.log(e));
        }
    }
    
    return { initMusic };
};
