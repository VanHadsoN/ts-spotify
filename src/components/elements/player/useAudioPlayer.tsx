import {useEffect, useRef} from "react";
import {musicPlayerStore} from "@/store/store.ts";

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

    const togglePlayPause = async () => {
        const audio = audioRef.current;
        if(!audio) return;

        if(musicPlayerStore.isPlaying) {
            musicPlayerStore.pause();
            audio.pause();
            return;
        }

        try {
            await audio.play();
            musicPlayerStore.play();
        } catch (error) {
            console.error("Audio play failed:", error);
            musicPlayerStore.pause();
        }
    };

    const onSeek = (time: number) => {
        if (!audioRef.current) return;

        audioRef.current.currentTime = time;
        musicPlayerStore.seek(time);
    }

    const changeTrack = (type: "prev" | "next") => {
        musicPlayerStore.changeTrack(type);
    }

    const setVolume = (volume: number) => {
        if (!audioRef.current) return;

        audioRef.current.volume = volume / 100;
        musicPlayerStore.setVolume(volume);
    }

    return { audioRef, togglePlayPause, onSeek, changeTrack, setVolume };
}