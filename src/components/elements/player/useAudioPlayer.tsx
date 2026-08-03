import { useCallback,useEffect, useRef } from "react";
import { musicPlayerStore } from "@/store/store.ts";

const playAudio = async (audio: HTMLAudioElement) => {
    try {
        await audio.play();
    } catch (error) {
        if(
            error instanceof DOMException && error.name === "AbortError"
        ) {
            return;
        }
        console.error("Audio playback failed:", error);
        musicPlayerStore.pause();
    }
};

export const useAudioPlayer = () => {
    const audioRef = useRef<HTMLAudioElement>(null);

    const isPlaying = musicPlayerStore.isPlaying;
    const trackFile = musicPlayerStore.currentTrack?.file;

    useEffect(() => {
        const audio = audioRef.current;

        if(!audio || !trackFile) return;

        if(isPlaying) {
            void playAudio(audio);
        } else {
            audio.pause();
        }
    }, [isPlaying, trackFile]);

    useEffect(() => {
        const audio = audioRef.current;
        const seekRequestTime = musicPlayerStore.seekRequestTime;
        if(!audio || seekRequestTime === null) return;

        audio.currentTime = seekRequestTime;
        musicPlayerStore.clearSeekRequest();

        if(musicPlayerStore.isPlaying && audio.paused) {
            void playAudio(audio);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [musicPlayerStore.seekRequestTime]);

    useEffect(() => {
        const audio = audioRef.current;
        if(!audio) return;

        audio.volume = musicPlayerStore.volume / 100;

    }, [musicPlayerStore.volume]);

    useEffect(() => {
        const audio = audioRef.current;
        if(!audio) return;

        audio.muted = musicPlayerStore.isMuted;
    }, [musicPlayerStore.isMuted]);

    const toggleMute = () => {
        musicPlayerStore.toggleMute();
    }

    const togglePlayPause = () => {
        musicPlayerStore.togglePlayPause();
    };

    const onSeek = (time: number) => {
        musicPlayerStore.requestSeek(time);
    };

    const changeTrack = (type: "prev" | "next") => {
        musicPlayerStore.changeTrack(type);
    }

    const setVolume = (volume: number) => {
        musicPlayerStore.setVolume(volume);
    }

    const handleTimeUpdate = useCallback((time: number) => {
        musicPlayerStore.seek(Math.floor(time));
    }, []);

    const handleEnded = useCallback(() => {
        musicPlayerStore.finishTrack();
    }, []);

    const handleLoadedMetadata = useCallback((duration: number) => {
        musicPlayerStore.setDuration(duration);
    }, []);

    return { audioRef, togglePlayPause, toggleMute, onSeek, changeTrack, setVolume, handleTimeUpdate, handleEnded, handleLoadedMetadata };
}
