import { ApiOptions } from "../@types/types";
import { ApiHelper } from "./ApiHelper";
import Album from "./endpoints/Album";
import Artist from "./endpoints/Artist";
import Audiobook from "./endpoints/Audiobook";
import Categories from "./endpoints/Categories";
import Genre from "./endpoints/Genre";
import Playlist from "./endpoints/Playlist";
import Search from "./endpoints/Search";
import Track from "./endpoints/Track";
import User from "./endpoints/User";
export default class SpotifyApiClient {
    private clientKey;
    private clientSecret;
    album: Album;
    artist: Artist;
    audiobook: Audiobook;
    categories: Categories;
    genre: Genre;
    playlist: Playlist;
    search: Search;
    track: Track;
    user: User;
    apiHelper: ApiHelper;
    constructor(apiOptions: ApiOptions);
    getAccessToken(): Promise<string>;
}
//# sourceMappingURL=SpotifyApiClient.d.ts.map