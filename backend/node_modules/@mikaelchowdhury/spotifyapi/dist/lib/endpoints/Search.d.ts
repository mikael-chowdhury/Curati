import { SimplifiedAlbumObject, SimplifiedArtistObject, SimplifiedAudiobookObject, SimplifiedPlaylistObject, SimplifiedTrackObject, SpotifyList } from "../../@types/types";
import SpotifyApiClient from "../SpotifyApiClient";
export default class Search {
    private client;
    constructor(client: SpotifyApiClient);
    searchAlbums(query: string): Promise<{
        albums: SpotifyList<SimplifiedAlbumObject>;
    }>;
    searchArtists(query: string): Promise<{
        artists: SpotifyList<SimplifiedArtistObject>;
    }>;
    searchTracks(query: string): Promise<{
        tracks: SpotifyList<SimplifiedTrackObject>;
    }>;
    searchPlaylists(query: string): Promise<{
        playlists: SpotifyList<SimplifiedPlaylistObject>;
    }>;
    searchAudiobooks(query: string): Promise<{
        audiobooks: SpotifyList<SimplifiedAudiobookObject>;
    }>;
}
//# sourceMappingURL=Search.d.ts.map