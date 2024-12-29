"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Playlist {
    constructor(client) {
        this.client = client;
    }
    getPlaylist(playlistId) {
        return new Promise((res, rej) => {
            this.client.apiHelper.get(`/playlists/${playlistId}`).then((response) => {
                res(response.data);
            });
        });
    }
    getFeaturedPlaylists() {
        return new Promise((res, rej) => {
            this.client.apiHelper.get("/browse/featured-playlists").then((response) => {
                res(response.data);
            });
        });
    }
    getCategoryPlaylists(categoryId) {
        return new Promise((res, rej) => {
            this.client.apiHelper.get(`/browse/categories/${categoryId}/playlists`).then((response) => {
                res(response.data);
            });
        });
    }
    getPlaylistCoverImage(playlistId) {
        return new Promise((res, rej) => {
            this.client.apiHelper.get(`/playlists/${playlistId}/images`).then((response) => {
                res(response.data);
            });
        });
    }
}
exports.default = Playlist;
