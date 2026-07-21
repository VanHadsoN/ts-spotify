export const STORAGE_KEYS = {
    favorites: 'favorites',
    playlists: 'playlists',
    recentlyPlayed: 'recently-played',
} as const;

const isBrowser = (): boolean =>
    typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

export function readStorageJSON<T>(
    key: string,
    fallback: T,
    validate?: (value: unknown) => value is T
): T {
    if(!isBrowser()) return fallback;

    try {
        const raw = window.localStorage.getItem(key);
        if(raw === null) return fallback;

        const parsed: unknown = JSON.parse(raw);

        if(validate && !validate(parsed)) {
            return fallback;
        }

        return parsed as T;
    } catch {
        return fallback;
    }
}

export function writeStorageJSON<T>(key: string, value?: T) {
    if(!isBrowser()) return;

    try {
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
        // игнорируем ошибки записи storage чтобы сохранить стабильный UI
    }
}
