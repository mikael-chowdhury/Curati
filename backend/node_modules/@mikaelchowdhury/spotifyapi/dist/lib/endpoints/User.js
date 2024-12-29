"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(client) {
        this.client = client;
    }
    getUserProfile(userId) {
        return new Promise((res, rej) => {
            this.client.apiHelper.get(`/users/${userId}`).then((response) => {
                res(response.data);
            });
        });
    }
    checkIfUserFollowsPlaylist(playlistId, userId) {
        return new Promise((res, rej) => {
            this.client.apiHelper.get(`/playlists/${playlistId}/followers/contains?ids=${userId}`).then((response) => {
                res(response.data[0]);
            });
        });
    }
}
exports.default = User;
