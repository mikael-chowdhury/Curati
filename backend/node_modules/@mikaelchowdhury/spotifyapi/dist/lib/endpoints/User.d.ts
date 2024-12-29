import { UserProfile } from "../../@types/types";
import SpotifyApiClient from "../SpotifyApiClient";
export default class User {
    private client;
    constructor(client: SpotifyApiClient);
    getUserProfile(userId: string): Promise<UserProfile>;
    checkIfUserFollowsPlaylist(playlistId: string, userId: string): Promise<boolean>;
}
//# sourceMappingURL=User.d.ts.map