import { Play } from 'lucide-react'
import styles from './Lyrics.module.css'
import {LYRICS} from "@/data/lyrics.data.ts";
import {musicPlayerStore} from "@/store/store.ts";
import {Fragment} from "react";

export function Lyrics() {
    const lyric = LYRICS.find(
        lyric => lyric.trackName === musicPlayerStore.currentTrack?.name
    );

    return <div>
        <div className={styles.lyrics}>

            {lyric?.lines?.map((line, index) => (
                <Fragment key={index}>
                    {line.section && <br />}
                    {line.section && <div>[ {line.section} ]</div>}

                    <button className={musicPlayerStore.currentTime >= line.time ? styles.active : undefined}>
                        {musicPlayerStore.currentTime >= line.time && (
                            <Play
                                fill="var(--color-primary)"
                                className={styles.icon}
                                size={10}
                            />
                        )}
                        {line.text}
                    </button>

                </Fragment>
            ))}
        </div>
    </div>
}