"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Audiobook {
    constructor(client) {
        this.client = client;
    }
    getAudiobook(audiobookId) {
        return new Promise((res, rej) => {
            this.client.apiHelper.get("/audiobooks/" + audiobookId).then((response) => res(response.data));
        });
    }
    getAudiobooks(audiobookIds) {
        return new Promise((res, rej) => {
            if (audiobookIds.length > 50) {
                throw new Error("You can only get up to 50 audiobooks at a time");
            }
            this.client.apiHelper
                .get(`/audiobooks?ids=${audiobookIds.join(",")}`)
                .then((response) => res(response.data.audiobooks));
        });
    }
    getAudiobookChapters(audiobookId) {
        return new Promise((res, rej) => {
            this.client.apiHelper.get(`/audiobooks/${audiobookId}/chapters`).then((response) => res(response.data));
        });
    }
    getChapter(chapterId) {
        return new Promise((res, rej) => {
            this.client.apiHelper.get("/chapters/" + chapterId).then((response) => res(response.data));
        });
    }
    getChapters(chapterIds) {
        return new Promise((res, rej) => {
            if (chapterIds.length > 50) {
                throw new Error("You can only get up to 50 chapters at a time");
            }
            this.client.apiHelper
                .get(`/chapters?ids=${chapterIds.join(",")}`)
                .then((response) => res(response.data.chapters));
        });
    }
}
exports.default = Audiobook;
