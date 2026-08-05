import { useCallback,useEffect, useRef } from "react";
import { musicPlayerStore } from "@/store/store.ts";

const playAudio = async (audio: HTMLAudioElement) => {
    try {
        await audio.play();
        musicPlayerStore.clearPlaybackError();
    } catch (error) {
        if(
            error instanceof DOMException && error.name === "AbortError"
        ) {
            return;
        }

        musicPlayerStore.pause();

        if(error instanceof DOMException && error.name === "NotAllowedError") {
            musicPlayerStore.setPlaybackError("Playback was blocked. Press Play to continue");
            return;
        }

        musicPlayerStore.setPlaybackError("Failed to play this track");
        console.error("Audio playback failed:", error);
    }
};

export const useAudioPlayer = () => {
    const audioRef = useRef<HTMLAudioElement>(null);

    const isPlaying = musicPlayerStore.isPlaying;
    const trackFile = musicPlayerStore.currentTrack?.file;
    const seekRequestTime = musicPlayerStore.seekRequestTime;
    const volume = musicPlayerStore.volume;
    const isMuted = musicPlayerStore.isMuted;

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
        if(!audio || seekRequestTime === null) return;

        audio.currentTime = seekRequestTime;
        musicPlayerStore.clearSeekRequest();

        if(musicPlayerStore.isPlaying && audio.paused) {
            void playAudio(audio);
        }
    }, [seekRequestTime]);

    useEffect(() => {
        const audio = audioRef.current;
        if(!audio) return;

        audio.volume = volume / 100;

    }, [volume]);

    useEffect(() => {
        const audio = audioRef.current;
        if(!audio) return;

        audio.muted = isMuted;
    }, [isMuted]);

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

    const handleAudioError = useCallback(() => {
        const audio = audioRef.current;
        const code = audio?.error?.code;

        musicPlayerStore.pause();

        musicPlayerStore.setPlaybackError(
            code === MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED
                ? "Audio file is missing or unsupported"
                : "Audio file is unavailable"
        );
    }, []);

    return { audioRef, togglePlayPause, toggleMute, onSeek, changeTrack, setVolume, handleTimeUpdate, handleEnded, handleLoadedMetadata, handleAudioError };
}
