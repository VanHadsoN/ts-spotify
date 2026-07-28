import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { Track } from "@/components/elements/track-item/Track.tsx";
import { playlistStore } from "@/store/playlist.store.ts";
import { resolveTracks } from "@/utils/tracks-by-id.ts";
import { PagesConfig } from "@/config/pages.config.ts";

const decodeParam = (value: string) => {
    try {
        return decodeURIComponent(value);
    } catch {
        return value;
    }
};

export const PlayListPage = observer(function PlaylistPage() {
    const { id } = useParams<{ id: string }>();
    const playlistName = id ? decodeParam(id) : "";

    const navigate = useNavigate();
    const [isRenaming, setIsRenaming] = useState(false);
    const [newName, setNewName] = useState("");
    const [renameError, setRenameError] = useState<string | null>(null);

    const playlist = playlistStore.playlists.find((item) => item.name === playlistName);

    const tracks = useMemo(() => {
        if (!playlist) return [];
        return resolveTracks(playlist.trackIds);
    }, [playlist]);

    const handleRename = () => {
        if(!playlist) return;

        const result = playlistStore.renamePlaylist(
            playlist.name,
            newName
        );

        if(result === "empty") {
            setRenameError("Enter a playlist name");
            return;
        }

        if(result === "duplicate") {
            setRenameError("A playlist with this name already exists");
            return;
        }

        setIsRenaming(false);
        setRenameError(null);

        navigate(PagesConfig.PLAYLIST(newName.trim()), {
            replace: true,
        });
    };

    const handleDelete = () => {
        if(!playlist) return;

        const confirmed = window.confirm(
            `Delete playlist "${playlist.name}"?`
        );

        if(!confirmed) return;

        const result = playlistStore.deletePlaylist(playlist.name);

        if(result === "success") {
            navigate(PagesConfig.HOME, { replace: true });
        }
    };

    if(!playlist) {
        return (
            <section className="rounded-xl border border-player-bg p-8">
                <h1 className="text-2xl font-semibold mb-2">Playlist not found</h1>
                <p className="opacity-70">The requested playlist does not exist</p>
            </section>
        );
    }

    return (
        <section>
            <div className="mb-4 flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-semibold">{playlist.name}</h1>

                {!isRenaming && (
                    <>
                        <button
                            type="button"
                            onClick={() => {
                                setNewName(playlist.name);
                                setRenameError(null);
                                setIsRenaming(true);
                            }}
                            className="rounded-md px-3 py-1.5 transition-colors hover:bg-zinc-700/50"
                        >
                            Rename
                        </button>

                        <button
                            type="button"
                            onClick={handleDelete}
                            className="rounded-md px-3 py-1.5 text-red-400 transition-colors hover:bg-zinc-700/50"
                        >
                            Delete
                        </button>
                    </>
                )}
            </div>

            {isRenaming && (
                <div className="mb-4 flex flex-wrap items-start gap-2">
                    <div>
                        <input
                            autoFocus
                            type="text"
                            value={newName}
                            aria-invalid={Boolean(renameError)}
                            aria-describedby={
                                renameError ? "playlist-rename-error" : undefined
                            }
                            onChange={(event) => {
                                setNewName(event.target.value);
                                setRenameError(null);
                            }}
                            onKeyDown={(event) => {
                                if(event.key === "Enter") {
                                    handleRename();
                                }

                                if(event.key === "Escape") {
                                    setIsRenaming(false);
                                    setRenameError(null);
                                }
                            }}
                            className="rounded-md px-3 py-2"
                        />

                        {renameError && (
                            <p
                                id="playlist-rename-error"
                                className="mt-1 text-sm text-red-400"
                            >
                                {renameError}
                            </p>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={handleRename}
                        className="rounded-md px-3 py-2 transition-colors hover:bg-zinc-700/50"
                    >
                        Save
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            setIsRenaming(false);
                            setRenameError(null);
                        }}
                        className="rounded-md px-3 py-2 transition-colors hover:bg-zinc-700/50"
                    >
                        Cancel
                    </button>
                </div>
            )}

            {tracks.length === 0 ? (
                <p className="opacity-70">This playlist is empty</p>
            ) : (
                tracks.map((track) => <Track key={track.id} track={track} />)
            )}
        </section>
    );
});
