import { AudiobookObject, SimplifiedChapterObject, SpotifyList } from "../../@types/types";
import SpotifyApiClient from "../SpotifyApiClient";

export default class Audiobook {
  private client: SpotifyApiClient;
  constructor(client: SpotifyApiClient) {
    this.client = client;
  }

  getAudiobook(audiobookId: string): Promise<AudiobookObject> {
    return new Promise((res, rej) => {
      this.client.apiHelper.get("/audiobooks/" + audiobookId).then((response: any) => res(response.data));
    });
  }

  getAudiobooks(audiobookIds: string[]): Promise<AudiobookObject[]> {
    return new Promise((res, rej) => {
      if (audiobookIds.length > 50) {
        throw new Error("You can only get up to 50 audiobooks at a time");
      }

      this.client.apiHelper
        .get(`/audiobooks?ids=${audiobookIds.join(",")}`)
        .then((response: any) => res(response.data.audiobooks));
    });
  }

  getAudiobookChapters(audiobookId: string): Promise<SpotifyList<SimplifiedChapterObject>> {
    return new Promise((res, rej) => {
      this.client.apiHelper.get(`/audiobooks/${audiobookId}/chapters`).then((response: any) => res(response.data));
    });
  }

  getChapter(chapterId: string): Promise<SimplifiedChapterObject> {
    return new Promise((res, rej) => {
      this.client.apiHelper.get("/chapters/" + chapterId).then((response: any) => res(response.data));
    });
  }

  getChapters(chapterIds: string[]): Promise<SimplifiedChapterObject[]> {
    return new Promise((res, rej) => {
      if (chapterIds.length > 50) {
        throw new Error("You can only get up to 50 chapters at a time");
      }

      this.client.apiHelper
        .get(`/chapters?ids=${chapterIds.join(",")}`)
        .then((response: any) => res(response.data.chapters));
    });
  }
}
