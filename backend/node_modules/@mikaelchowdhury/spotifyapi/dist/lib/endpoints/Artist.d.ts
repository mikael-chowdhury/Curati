import { ArtistObject, TrackObject } from "../../@types/types";
import SpotifyApiClient from "../SpotifyApiClient";
import Album from "./Album";
export default class Artist {
    private client;
    constructor(client: SpotifyApiClient);
    getArtist(artistId: string): Promise<ArtistObject>;
    getArtists(artistIds: string[]): Promise<ArtistObject[]>;
    getArtistAlbums(artistId: string): Promise<Album[]>;
    getArtistTopTracks(artistId: string): Promise<TrackObject[]>;
    getRelatedArtists(artistId: string): Promise<ArtistObject[]>;
}
//# sourceMappingURL=Artist.d.ts.map