import {TrackInfo} from "@/components/ui/track-info/TrackInfo";
import {musicPlayerStore} from "@/store/store";
import {Pause, Play, SkipBack, SkipForward, Volume, Volume1, Volume2} from "lucide-react";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import {ProgressBar} from "@/components/ui/progress-bar/ProgressBar.tsx";
import {useAudioPlayer} from "@/components/elements/player/useAudioPlayer.tsx";

interface Props {}

export function AudioPlayerInner({}: Props) {
    const { audioRef, togglePlayPause, onSeek, changeTrack, setVolume } = useAudioPlayer();
    // const isDraggingRef = useRef(false);

    const track = musicPlayerStore.currentTrack;
    if (!track) return null;

    useEffect(() => {
        musicPlayerStore.resetPlayback?.();
        const el = audioRef.current;
        if (el) el.load();
    }, [track?.file]);

    return <div className="w-full py-5 px-10 bg-player-bg
            border-t border-white/10
            grid grid-cols-[1fr_5.8fr] fixed bottom-0 left-0">
        <TrackInfo
            title={track.name}
            subTitle={track.artist.name}
            image={undefined}
        />

        <audio
            ref={audioRef}
            src={track.file}
            onTimeUpdate={(e) => {
                const currentTime = Math.floor(e.currentTarget.currentTime);
                musicPlayerStore.seek(currentTime);
            }}
            onEnded={() => (musicPlayerStore.isPlaying = false)}
        />

        <div className="grid grid-cols-[1fr_8fr_2fr] gap-8 items-center">
            <div className="flex items-center gap-2.5">
                <button className="opacity-80 hover:opacity-100 duration-300"
                    onClick={() => changeTrack('prev')}>
                    <SkipBack size={20}/>
                </button>

                <button className="rounded-full bg-gradient-to-r from-[#3C3D41] to-[#444549]
                p-3 border border-white/5 border-solid duration-300
                hover:shadow text-primary"
                onClick={togglePlayPause}>

                    {musicPlayerStore.isPlaying ? (
                        <Pause size={20}/>
                        ) : (
                        <Play
                            size={20}
                            className="group-hover:fill-primary"
                        />
                    )}
                </button>

                <button className="opacity-80 hover:opacity-100 duration-300"
                    onClick={() => changeTrack('next')}>
                    <SkipForward size={20}/>
                </button>
            </div>

            {/* ProgressBar */}
            <ProgressBar
                currentValue={musicPlayerStore.currentTime}
                value={track.duration}
                progress={musicPlayerStore.progress}
                onSeek={(time: number) => onSeek(time)}
                isTextDisplayed
            />

            <div className="pl-6 max-w-36 grid grid-cols-[1fr_8fr] gap-1 items-center">
                {
                    musicPlayerStore.volume === 0 ? (<Volume />) :
                    musicPlayerStore.volume < 50 ? (<Volume1 />) :
                    (<Volume2 />
                    )
                }

                <ProgressBar
                    currentValue={musicPlayerStore.volume}
                    value={100}
                    progress={musicPlayerStore.volume}
                    onSeek={(value: number) => setVolume(value)}
                    isTextDisplayed={false}
                />
            </div>
        </div>
    </div>
}

export const AudioPlayer = observer(AudioPlayerInner);