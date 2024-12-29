"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Album {
    constructor(client) {
        this.client = client;
    }
    getAlbum(albumId) {
        return new Promise((res, rej) => {
            this.client.apiHelper.get("/albums/" + albumId).then((response) => res(response.data));
        });
    }
    getAlbums(albumIds) {
        if (albumIds.length > 20) {
            throw new Error("You can only get up to 20 albums at a time");
        }
        return new Promise((res, rej) => {
            this.client.apiHelper.get(`/albums?ids=${albumIds.join(",")}`).then((response) => res(response.data.albums));
        });
    }
    getAlbumTracks(albumId) {
        return new Promise((res, rej) => {
            this.client.apiHelper.get(`/albums/${albumId}/tracks`).then((response) => res(response.data));
        });
    }
    getNewReleases() {
        return new Promise((res, rej) => {
            this.client.apiHelper.get(`/browse/new-releases`).then((response) => res(response.data.albums));
        });
    }
}
exports.default = Album;
