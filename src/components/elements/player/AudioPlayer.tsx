import {TrackInfo} from "@/components/ui/track-info/TrackInfo";
import {musicPlayerStore} from "@/store/store";
import {Pause, Play, Repeat, Repeat1, Shuffle, SkipBack, SkipForward, Volume1, Volume2, VolumeX} from "lucide-react";
import { observer } from "mobx-react-lite";
import {ProgressBar} from "@/components/ui/progress-bar/ProgressBar.tsx";
import {useAudioPlayer} from "@/components/elements/player/useAudioPlayer.tsx";

export function AudioPlayerInner() {
    const { audioRef, togglePlayPause, toggleMute, onSeek, changeTrack, setVolume, handleTimeUpdate, handleEnded, handleLoadedMetadata, handleAudioError } = useAudioPlayer();
    // const isDraggingRef = useRef(false);

    const track = musicPlayerStore.currentTrack;
    const trackFile = track?.file;

    if (!track) return null;

    const duration = musicPlayerStore.currentDuration ?? track?.duration;

    return <div className="w-full py-5 px-10 bg-player-bg
            border-t border-white/10
            grid grid-cols-[1fr_5.8fr] fixed bottom-0 left-0">
        <TrackInfo
            title={track.name}
            subTitle={track.artist.name}
            image={track.cover}
        />

        <audio
            ref={audioRef}
            src={trackFile}
            onLoadedMetadata={(e) => handleLoadedMetadata(e.currentTarget.duration)}
            onTimeUpdate={(e) => handleTimeUpdate(e.currentTarget.currentTime)}
            onEnded={handleEnded}
            onError={handleAudioError}
        />

        <div className="grid grid-cols-[1fr_8fr_2fr] gap-8 items-center">
            <div className="flex items-center gap-2.5">
                <button
                    type="button"
                    aria-label="Shuffle tracks"
                    aria-pressed={musicPlayerStore.isShuffleEnabled}
                    className={musicPlayerStore.isShuffleEnabled ? "text-primary" : "opacity-80 hover:opacity-100 duration-300"}
                    onClick={() => musicPlayerStore.toggleShuffle()}
                >
                    <Shuffle size={18} />
                </button>

                <button
                    type="button"
                    aria-label="Previous track"
                    className="opacity-80 hover:opacity-100 duration-300"
                    onClick={() => changeTrack("prev")}
                >
                    <SkipBack size={20} />
                </button>

                <button
                    type="button"
                    aria-label={musicPlayerStore.isPlaying ? "Pause" : "Play"}
                    className="rounded-full bg-gradient-to-r from-[#3C3D41] to-[#444549]
                        p-3 border border-white/5 duration-300 hover:shadow text-primary"
                    onClick={togglePlayPause}
                >
                    {musicPlayerStore.isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>

                <button
                    type="button"
                    aria-label="Next track"
                    className="opacity-80 hover:opacity-100 duration-300"
                    onClick={() => changeTrack("next")}
                >
                    <SkipForward size={20} />
                </button>

                {/* Цикл режимов: off → all → one */}
                <button
                    type="button"
                    aria-label={`Repeat mode: ${musicPlayerStore.repeatMode}`}
                    className={musicPlayerStore.repeatMode === "off" ? "opacity-80 hover:opacity-100 duration-300" : "text-primary"}
                    onClick={() => musicPlayerStore.cycleRepeatMode()}
                >
                    {musicPlayerStore.repeatMode === "one" ? <Repeat1 size={18} /> : <Repeat size={18} />}
                </button>
            </div>

            {/* ProgressBar */}
            <ProgressBar
                ariaLabel="Playback position"
                currentValue={musicPlayerStore.currentTime}
                value={duration}
                progress={musicPlayerStore.progress}
                onSeek={(time: number) => onSeek(time)}
                isTextDisplayed
            />

            <div className="grid w-full max-w-40 grid-cols-[auto_1fr] items-center gap-3 pl-6">
                <button
                    type="button"
                    aria-label={musicPlayerStore.isMuted ? "Unmute" : "Mute"}
                    aria-pressed={musicPlayerStore.isMuted}
                    className="shrink-0 opacity-80 duration-300 hover:opacity-100"
                    onClick={toggleMute}
                >
                    {musicPlayerStore.isMuted || musicPlayerStore.volume === 0 ? (
                        <VolumeX />
                    ) : musicPlayerStore.volume < 50 ? (
                        <Volume1 />
                    ) : (
                        <Volume2 />
                    )}
                </button>

                <ProgressBar
                    ariaLabel="Volume"
                    currentValue={musicPlayerStore.volume}
                    value={100}
                    progress={musicPlayerStore.volume}
                    onSeek={(value: number) => setVolume(value)}
                    isTextDisplayed={false}
                />
            </div>
            {musicPlayerStore.playbackError && (
                <p role="alert" className="text-sm text-red-400 col-span-3">
                    {musicPlayerStore.playbackError}
                </p>
            )}
        </div>
    </div>
}

export const AudioPlayer = observer(AudioPlayerInner);