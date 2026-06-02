import {makeAutoObservable} from "mobx";

class FavoriteStore {
    favoritesName: string[] = JSON.parse(localStorage.getItem('favorites') || '[]');

    constructor() {
        makeAutoObservable(this);
    }

    toggleFavorite(trackName: string) {
        if (this.favoritesName.includes(trackName)) {
            this.favoritesName = this.favoritesName.filter(name => name !== trackName);
        } else {
            this.favoritesName.push(trackName);
        }
    }
}

export const favoriteStore = new FavoriteStore;
