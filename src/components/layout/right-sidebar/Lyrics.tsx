// TODO: add dynamic lyrics

import { Play } from 'lucide-react'
import styles from './Lyrics.module.css'
import {LYRICS} from "@/data/lyrics.data.ts";
import {musicPlayerStore} from "@/store/store.ts";

export function Lyrics() {
    const lyric = LYRICS.find(
        lyric => lyric.trackName === musicPlayerStore.currentTrack?.name
    );

    return <div>
        <div className={styles.lyrics}>

            {lyric?.lines?.map((line, index) => (
                <p
                key={index}
                className={musicPlayerStore.currentTime >= line.time
                    ? styles.active
                    : undefined
                }
                >
                    {line.section && <div>[ {line.section} ]</div>}
                    {musicPlayerStore.currentTime >= line.time && (
                        <Play
                            fill="var(--color-primary)"
                            className={styles.icon}
                            size={10}
                        />
                    )}
                    {line.text}
                </p>
            ))
            }

            <div>[ Verse 1 ]</div>
            <p>Well, on a train, I met a dame</p>
            <p>She rather handsome, we kinda looked the same</p>
            <p>She was pretty, from New York City</p>
            <p>I'm walking down that old fair lane</p>
            <p className={styles.active}>
                <Play
                    fill="var(--color-primary)"
                    className={styles.icon}
                    size={10}
                />
                I'm in heat, I'm in love</p>
            <p>But I just couldn't tell her so</p>
            <br />
            <div>[ Chorus ]</div>
            <p>I said, train kept a-rolling all night long</p>
            <p>Train kept a-rolling all night long</p>
            <p>Train kept a-rolling all night long</p>
            <p>Train kept a-rolling all night long</p>
            <p>With a heave, and a ho</p>
            <p>But I just couldn't tell her so, no, no, no</p>
            <br />
            <div>[ Bridge ]</div>
            <p>Well, get along, sweet little woman, get along</p>
            <p>On your way, get along, sweet little woman, get along</p>
            <p>On your way, I'm in heat, I'm in love</p>
            <p>But I just couldn't tell her so, no, no, no</p>
            <br />
            <div>[ Verse 2 ]</div>
            <p>Yeah, train, I met a dame</p>
            <p>She rather handsome, we kinda looked the same</p>
            <p>She was pretty, from New York City</p>
            <p>I'm walking down that old fair lane</p>
            <p>I'm in heat, I'm in love</p>
            <p>But I just couldn't tell her so</p>
        </div>
    </div>
}