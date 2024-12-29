import SpotifyApiClient from "../SpotifyApiClient";
import { AlbumObject, SimplifiedTrackObject, SpotifyList } from "../../@types/types";

export default class Album {
  private client: SpotifyApiClient;
  constructor(client: SpotifyApiClient) {
    this.client = client;
  }

  getAlbum(albumId: string): Promise<AlbumObject> {
    return new Promise((res, rej) => {
      this.client.apiHelper.get("/albums/" + albumId).then((response: any) => res(response.data));
    });
  }

  getAlbums(albumIds: string[]): Promise<AlbumObject[]> {
    if (albumIds.length > 20) {
      throw new Error("You can only get up to 20 albums at a time");
    }
    return new Promise((res, rej) => {
      this.client.apiHelper.get(`/albums?ids=${albumIds.join(",")}`).then((response: any) => res(response.data.albums));
    });
  }

  getAlbumTracks(albumId: string): Promise<SpotifyList<SimplifiedTrackObject>> {
    return new Promise((res, rej) => {
      this.client.apiHelper.get(`/albums/${albumId}/tracks`).then((response: any) => res(response.data));
    });
  }

  getNewReleases(): Promise<AlbumObject[]> {
    return new Promise((res, rej) => {
      this.client.apiHelper.get(`/browse/new-releases`).then((response: any) => res(response.data.albums));
    });
  }
}
