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
  private clientKey: string;
  private clientSecret: string;

  public album: Album;
  public artist: Artist;
  public audiobook: Audiobook;
  public categories: Categories;
  public genre: Genre;
  public playlist: Playlist;
  public search: Search;
  public track: Track;
  public user: User;

  public apiHelper: ApiHelper;

  constructor(apiOptions: ApiOptions) {
    if (!apiOptions.clientKey) {
      throw new Error("An client key is required to use the Spotify API");
    }
    if (!apiOptions.clientSecret) {
      throw new Error("An client secret is required to use the Spotify API");
    }

    this.clientKey = apiOptions.clientKey;
    this.clientSecret = apiOptions.clientSecret;

    this.apiHelper = new ApiHelper(this, this.clientKey, this.clientSecret);

    this.album = new Album(this);
    this.artist = new Artist(this);
    this.audiobook = new Audiobook(this);
    this.categories = new Categories(this);
    this.genre = new Genre(this);
    this.playlist = new Playlist(this);
    this.search = new Search(this);
    this.track = new Track(this);
    this.user = new User(this);
  }

  public getAccessToken(): Promise<string> {
    return this.apiHelper.getAccessToken();
  }
}
