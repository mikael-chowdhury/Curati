"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Genre {
    constructor(client) {
        this.client = client;
    }
    getAvailableGenreSeeds() {
        return new Promise((res, rej) => {
            this.client.apiHelper
                .get("/recommendations/available-genre-seeds")
                .then((response) => res(response.data.genres));
        });
    }
}
exports.default = Genre;
