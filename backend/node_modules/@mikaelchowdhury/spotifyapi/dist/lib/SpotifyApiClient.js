"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiHelper_1 = require("./ApiHelper");
const Album_1 = __importDefault(require("./endpoints/Album"));
const Artist_1 = __importDefault(require("./endpoints/Artist"));
const Audiobook_1 = __importDefault(require("./endpoints/Audiobook"));
const Categories_1 = __importDefault(require("./endpoints/Categories"));
const Genre_1 = __importDefault(require("./endpoints/Genre"));
const Playlist_1 = __importDefault(require("./endpoints/Playlist"));
const Search_1 = __importDefault(require("./endpoints/Search"));
const Track_1 = __importDefault(require("./endpoints/Track"));
const User_1 = __importDefault(require("./endpoints/User"));
class SpotifyApiClient {
    constructor(apiOptions) {
        if (!apiOptions.clientKey) {
            throw new Error("An client key is required to use the Spotify API");
        }
        if (!apiOptions.clientSecret) {
            throw new Error("An client secret is required to use the Spotify API");
        }
        this.clientKey = apiOptions.clientKey;
        this.clientSecret = apiOptions.clientSecret;
        this.apiHelper = new ApiHelper_1.ApiHelper(this, this.clientKey, this.clientSecret);
        this.album = new Album_1.default(this);
        this.artist = new Artist_1.default(this);
        this.audiobook = new Audiobook_1.default(this);
        this.categories = new Categories_1.default(this);
        this.genre = new Genre_1.default(this);
        this.playlist = new Playlist_1.default(this);
        this.search = new Search_1.default(this);
        this.track = new Track_1.default(this);
        this.user = new User_1.default(this);
    }
    getAccessToken() {
        return this.apiHelper.getAccessToken();
    }
}
exports.default = SpotifyApiClient;
