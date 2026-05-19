import {useRef} from "react";
import {musicPlayerStore} from "@/store/store.ts";

export const useAudioPlayer = () => {
    const audioRef = useRef<HTMLAudioElement>(null);

    const togglePlayPause = () => {
        if (!audioRef.current) return;

        musicPlayerStore.togglePlayPause();

        if (audioRef.current.paused) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }

    const onSeek = (time: number) => {
        if (!audioRef.current) return;

        audioRef.current.currentTime = time;
        musicPlayerStore.seek(time);
    }

    return { audioRef, togglePlayPause, onSeek };
}