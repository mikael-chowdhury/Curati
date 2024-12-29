import { ArtistObject, SimplifiedArtistObject, SimplifiedTrackObject, TrackObject } from "../../@types/types";
import SpotifyApiClient from "../SpotifyApiClient";
import Album from "./Album";

export default class Artist {
  private client: SpotifyApiClient;
  constructor(client: SpotifyApiClient) {
    this.client = client;
  }

  getArtist(artistId: string): Promise<ArtistObject> {
    return new Promise((res, rej) => {
      this.client.apiHelper.get("/artists/" + artistId).then((response: any) => res(response.data));
    });
  }

  getArtists(artistIds: string[]): Promise<ArtistObject[]> {
    if (artistIds.length > 50) {
      throw new Error("You can only get up to 50 artists at a time");
    }

    return new Promise((res, rej) => {
      this.client.apiHelper
        .get(`/artists?ids=${artistIds.join(",")}`)
        .then((response: any) => res(response.data.artists));
    });
  }

  getArtistAlbums(artistId: string): Promise<Album[]> {
    return new Promise((res, rej) => {
      this.client.apiHelper.get(`/artists/${artistId}/albums`).then((response: any) => res(response.data));
    });
  }

  getArtistTopTracks(artistId: string): Promise<TrackObject[]> {
    return new Promise((res, rej) => {
      this.client.apiHelper.get(`/artists/${artistId}/top-tracks`).then((response: any) => res(response.data.tracks));
    });
  }

  getRelatedArtists(artistId: string): Promise<ArtistObject[]> {
    return new Promise((res, rej) => {
      this.client.apiHelper
        .get("/artists" + artistId + "/related-artists")
        .then((response: any) => res(response.data.artists));
    });
  }
}
