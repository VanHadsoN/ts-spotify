import {musicPlayerStore} from "@/store/store.ts";
import type {ITrack} from "@/types/track.types.ts";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {observer} from "mobx-react-lite";

interface Props {
    image: string;
    title: string;
    subTitle: string;
    track?: ITrack;
}

export const TrackInfo = observer(
    function TrackInfo({ title, subTitle, image, track }: Props) {

        const isActive = musicPlayerStore.currentTrack?.name === track?.name;

        return (
            <div className="flex items-center gap-3">
                {/* TODO: Circle progress-bar */}
                {/* TODO: Play/pause button when hover title or cover */}

                {track ? (
                    <button
                        onClick={() => musicPlayerStore.setTrack(track)}
                        className="block relative"
                    >
                        {isActive && (
                            <CircularProgressbar
                                value={musicPlayerStore.progress}
                                className="absolute"
                                strokeWidth={5}
                                styles={{
                                    trail: {stroke: '#2E3235'},
                                    path: {
                                        stroke: 'var(--color-primary)',
                                        transition: 'stroke-dashoffset 0.5s ease 0s',
                                    }
                                }}
                                counterClockwise
                            />
                        )}

                        <img
                            src={image}
                            alt={title}
                            className="w-12 h-12 rounded-full m-1.5"
                        />
                    </button>
                ) : (
                    <img
                        src={image}
                        alt={title}
                        className="w-12 h-12 rounded-full"
                    />
                )}

                <div>
                    <div className="text-lg text-white font-medium">{title}</div>
                    <div>{subTitle}</div>
                </div>
            </div>
        );
    });
