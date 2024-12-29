import SpotifyApiClient from "./SpotifyApiClient";
export declare class ApiHelper {
    private client;
    private accessToken;
    private clientKey;
    private clientSecret;
    constructor(client: SpotifyApiClient, clientKey: string, clientSecret: string);
    getAccessToken(): Promise<string>;
    static API_BASE: string;
    get(path: string): Promise<unknown>;
}
//# sourceMappingURL=ApiHelper.d.ts.map