"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Search {
    constructor(client) {
        this.client = client;
    }
    searchAlbums(query) {
        return new Promise((res, rej) => {
            this.client.apiHelper.get(`/search?q=${query}&type=album`).then((response) => {
                res(response.data.albums);
            });
        });
    }
    searchArtists(query) {
        return new Promise((res, rej) => {
            this.client.apiHelper.get(`/search?q=${query}&type=artist`).then((response) => {
                res(response.data.artists);
            });
        });
    }
    searchTracks(query) {
        return new Promise((res, rej) => {
            this.client.apiHelper.get(`/search?q=${query}&type=track`).then((response) => {
                res(response.data.tracks);
            });
        });
    }
    searchPlaylists(query) {
        return new Promise((res, rej) => {
            this.client.apiHelper.get(`/search?q=${query}&type=playlist`).then((response) => {
                res(response.data.playlists);
            });
        });
    }
    searchAudiobooks(query) {
        return new Promise((res, rej) => {
            this.client.apiHelper.get(`/search?q=${query}&type=audiobook`).then((response) => {
                res(response.data.audiobooks);
            });
        });
    }
}
exports.default = Search;
