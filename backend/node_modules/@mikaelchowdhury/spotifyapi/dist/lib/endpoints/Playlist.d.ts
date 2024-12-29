import { PlaylistObject, SimplifiedPlaylistObject, SpotifyImage, SpotifyList } from "../../@types/types";
import SpotifyApiClient from "../SpotifyApiClient";
export default class Playlist {
    private client;
    constructor(client: SpotifyApiClient);
    getPlaylist(playlistId: string): Promise<PlaylistObject>;
    getFeaturedPlaylists(): Promise<{
        message: string;
        playlists: SpotifyList<SimplifiedPlaylistObject>;
    }>;
    getCategoryPlaylists(categoryId: string): Promise<{
        message: string;
        playlists: SpotifyList<SimplifiedPlaylistObject>;
    }>;
    getPlaylistCoverImage(playlistId: string): Promise<SpotifyImage[]>;
}
//# sourceMappingURL=Playlist.d.ts.map