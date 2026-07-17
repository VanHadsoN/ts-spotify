import { useCallback,useEffect, useRef } from "react";
import { musicPlayerStore } from "@/store/store.ts";

export const useAudioPlayer = () => {
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const audio = audioRef.current;
        if(!audio) return;

        if(musicPlayerStore.isPlaying) {
            void audio.play().catch((error) => {
                console.error("Audio play failed:", error);
                musicPlayerStore.pause();
            });
        } else {
            audio.pause();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [musicPlayerStore.isPlaying]);

    useEffect(() => {
        const audio = audioRef.current;
        const trackFile = musicPlayerStore.currentTrack?.file;
        if(!audio || !trackFile) return;

        audio.load();

        if(musicPlayerStore.isPlaying) {
            void audio.play().catch((error) => {
                console.error("Audio play failed after track change:", error);
                musicPlayerStore.pause();
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [musicPlayerStore.currentTrack?.file]);

    useEffect(() => {
        const audio = audioRef.current;
        const seekRequestTime = musicPlayerStore.seekRequestTime;
        if(!audio || seekRequestTime === null) return;

        audio.currentTime = seekRequestTime;
        musicPlayerStore.clearSeekRequest();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [musicPlayerStore.seekRequestTime]);

    useEffect(() => {
        const audio = audioRef.current;
        if(!audio) return;

        audio.volume = musicPlayerStore.volume / 100;

    }, [musicPlayerStore.volume]);

    const togglePlayPause = async () => {
        musicPlayerStore.togglePlayPause()
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

    return { audioRef, togglePlayPause, onSeek, changeTrack, setVolume, handleTimeUpdate, handleEnded };
}
