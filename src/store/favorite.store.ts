import {makeAutoObservable} from "mobx";

class FavoriteStore {
    favoritesTrackIds: string[] = JSON.parse(localStorage.getItem('favorites') || '[]');

    constructor() {
        makeAutoObservable(this);
    }

    toggleFavorite(trackId: string) {
        if (this.favoritesTrackIds.includes(trackId)) {
            this.favoritesTrackIds = this.favoritesTrackIds.filter(id => id !== trackId);
        } else {
            this.favoritesTrackIds.push(trackId);
        }
        localStorage.setItem('favorites', JSON.stringify(this.favoritesTrackIds));
    }

    isFavorite(trackId: string) {
        return this.favoritesTrackIds.includes(trackId);
    }
}

export const favoriteStore = new FavoriteStore;
