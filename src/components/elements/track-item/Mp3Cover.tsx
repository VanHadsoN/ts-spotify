import jsmediatags from 'jsmediatags';
import {useEffect, useState} from "react";

function readCover(file: File) {
    return new Promise<string | null>((resolve) => {
        new jsmediatags.Reader(file)
            .setTagsToRead(['pisture'])
            .read({
                onSuccess: ({ tags }) => {
                    const pic = tags.picture
                    if (pic) {
                        const base64 = btoa(
                            pic.data.reduce((data, byte) => data + String.fromCharCode(byte), '')
                        )
                        resolve(`dat:${pic.format};base64,${base64}`)
                    } else {
                        resolve(null);
                    }
                },
                onError: () => resolve(null),
            })
    })
}

export function Mp3CoverPreview({ file }: { file: File }) {
    const [cover, setCover] = useState<string | null>(null);

    useEffect(() => {
        readCover(file).then(setCover);
    }, [file]);

    return cover ? <img src={cover} alt="cover"/> : <div>No cover</div>
}