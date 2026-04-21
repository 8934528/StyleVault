import { useEffect, useRef } from 'react';
import { useSettingsStore } from '../store/uiStore';

export const useSound = () => {
  const { sfxEnabled, sfxVolume } = useSettingsStore();

  const playSfx = (soundFile) => {
    if (!sfxEnabled) return;
    
    const audioUrl = new URL(`../assets/sounds/${soundFile}`, import.meta.url).href;
    const audio = new Audio(audioUrl);
    
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

        if (musicEnabled && currentTrack) {
            try {
                const musicUrl = new URL(`../assets/sounds/Background_Music/${currentTrack}`, import.meta.url).href;
                audioRef.current.src = musicUrl;
                audioRef.current.play().catch(e => console.log('BGM blocked by browser:', e));
            } catch (e) {
                console.error("Failed to load background music", e);
            }
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
