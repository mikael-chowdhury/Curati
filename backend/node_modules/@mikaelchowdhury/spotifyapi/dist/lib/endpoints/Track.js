"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Track {
    constructor(client) {
        this.client = client;
    }
    getTrack(trackId) {
        return new Promise((res, rej) => {
            this.client.apiHelper.get(`/tracks/${trackId}`).then((response) => {
                res(response.data);
            });
        });
    }
    getTracks(trackIds) {
        return new Promise((res, rej) => {
            this.client.apiHelper.get("/tracks?ids=" + trackIds.join(",")).then((response) => {
                res(response.data.tracks);
            });
        });
    }
    getAudioFeatures(trackId) {
        return new Promise((res, rej) => {
            this.client.apiHelper.get(`/audio-features/${trackId}`).then((response) => {
                res(response.data);
            });
        });
    }
    getSeveralAudioFeatures(trackIds) {
        return new Promise((res, rej) => {
            this.client.apiHelper.get("/audio-features?ids=" + trackIds.join(",")).then((response) => {
                res(response.data.audio_features);
            });
        });
    }
    getAudioAnalysis(trackId) {
        return new Promise((res, rej) => {
            this.client.apiHelper.get(`/audio-analysis/${trackId}`).then((response) => {
                res(response.data);
            });
        });
    }
    getRecommendations(options) {
        return new Promise((res, rej) => {
            const query = Object.keys(options)
                .map((key) => {
                return key + "=" + options[key].join(",");
            })
                .join("&");
            this.client.apiHelper.get(`/recommendations?${query}`).then((response) => {
                res(response.data);
            });
        });
    }
}
exports.default = Track;
