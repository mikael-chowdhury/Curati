import { PlaylistObject, SimplifiedPlaylistObject, SpotifyImage, SpotifyList } from "../../@types/types";
import SpotifyApiClient from "../SpotifyApiClient";

export default class Playlist {
  constructor(private client: SpotifyApiClient) {}

  getPlaylist(playlistId: string): Promise<PlaylistObject> {
    return new Promise((res, rej) => {
      this.client.apiHelper.get(`/playlists/${playlistId}`).then((response: any) => {
        res(response.data);
      });
    });
  }

  getFeaturedPlaylists(): Promise<{ message: string; playlists: SpotifyList<SimplifiedPlaylistObject> }> {
    return new Promise((res, rej) => {
      this.client.apiHelper.get("/browse/featured-playlists").then((response: any) => {
        res(response.data);
      });
    });
  }

  getCategoryPlaylists(
    categoryId: string
  ): Promise<{ message: string; playlists: SpotifyList<SimplifiedPlaylistObject> }> {
    return new Promise((res, rej) => {
      this.client.apiHelper.get(`/browse/categories/${categoryId}/playlists`).then((response: any) => {
        res(response.data as any);
      });
    });
  }

  getPlaylistCoverImage(playlistId: string): Promise<SpotifyImage[]> {
    return new Promise((res, rej) => {
      this.client.apiHelper.get(`/playlists/${playlistId}/images`).then((response: any) => {
        res(response.data as any);
      });
    });
  }
}
