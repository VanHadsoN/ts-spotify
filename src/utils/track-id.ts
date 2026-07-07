const FNV_OFFSET = 2166136261;
const FNV_PRIME = 16777619;

function fnv1a(input: string): string {
    let hash = FNV_OFFSET;

    for(let i = 0; i < input.length; i++) {
        hash ^= input.charCodeAt(i);
        hash = Math.imul(hash, FNV_PRIME);
    }
    return (hash >>> 0).toString(36);
}

export function generateTrackId(file: string, artistName?: string): string {
    const source = `${file}::${artistName ?? ""}`.trim().toString();
    return `trk_${fnv1a(source)}`;
}
