import SpotifyApiClient from "../SpotifyApiClient";
import { AlbumObject, SimplifiedTrackObject, SpotifyList } from "../../@types/types";
export default class Album {
    private client;
    constructor(client: SpotifyApiClient);
    getAlbum(albumId: string): Promise<AlbumObject>;
    getAlbums(albumIds: string[]): Promise<AlbumObject[]>;
    getAlbumTracks(albumId: string): Promise<SpotifyList<SimplifiedTrackObject>>;
    getNewReleases(): Promise<AlbumObject[]>;
}
//# sourceMappingURL=Album.d.ts.map