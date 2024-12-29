"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Artist {
    constructor(client) {
        this.client = client;
    }
    getArtist(artistId) {
        return new Promise((res, rej) => {
            this.client.apiHelper.get("/artists/" + artistId).then((response) => res(response.data));
        });
    }
    getArtists(artistIds) {
        if (artistIds.length > 50) {
            throw new Error("You can only get up to 50 artists at a time");
        }
        return new Promise((res, rej) => {
            this.client.apiHelper
                .get(`/artists?ids=${artistIds.join(",")}`)
                .then((response) => res(response.data.artists));
        });
    }
    getArtistAlbums(artistId) {
        return new Promise((res, rej) => {
            this.client.apiHelper.get(`/artists/${artistId}/albums`).then((response) => res(response.data));
        });
    }
    getArtistTopTracks(artistId) {
        return new Promise((res, rej) => {
            this.client.apiHelper.get(`/artists/${artistId}/top-tracks`).then((response) => res(response.data.tracks));
        });
    }
    getRelatedArtists(artistId) {
        return new Promise((res, rej) => {
            this.client.apiHelper
                .get("/artists" + artistId + "/related-artists")
                .then((response) => res(response.data.artists));
        });
    }
}
exports.default = Artist;
