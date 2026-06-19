import { Play } from 'lucide-react'
import styles from './Lyrics.module.css'
import {LYRICS} from "@/data/lyrics.data.ts";
import {musicPlayerStore} from "@/store/store.ts";
import {Fragment} from "react";
import {observer} from "mobx-react-lite";

function LyricsInner() {
    const lyric = LYRICS.find(
        lyric => lyric.trackName === musicPlayerStore.currentTrack?.name
    );

    if (!lyric) {
        return <div className={styles.lyrics}>Lyrics not found</div>
    }

    const activeLineIndex = lyric.lines.findLastIndex(
        line => musicPlayerStore.currentTime >= line.time
    );

    return <div>
        <div className={styles.lyrics}>

            {lyric?.lines?.map((line, index) => (
                <Fragment key={index}>
                    {line.section && <br />}
                    {line.section && <div>[ {line.section} ]</div>}

                    <button className={index === activeLineIndex ? styles.active : undefined}
                            onClick={() => {musicPlayerStore.seek(line.time)}}
                    >
                        <p>
                            {index === activeLineIndex && (
                                <Play
                                    fill="var(--color-primary)"
                                    className={styles.icon}
                                    size={10}
                                />
                            )}
                            {line.text}
                        </p>
                    </button>
                </Fragment>
            ))}
        </div>
    </div>
}

export const Lyrics = observer(LyricsInner);