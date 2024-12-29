import SpotifyApiClient from "../SpotifyApiClient";
export default class Genre {
    private client;
    constructor(client: SpotifyApiClient);
    getAvailableGenreSeeds(): Promise<string[]>;
}
//# sourceMappingURL=Genre.d.ts.map