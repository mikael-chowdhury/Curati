import { UserProfile } from "../../@types/types";
import SpotifyApiClient from "../SpotifyApiClient";

export default class User {
  constructor(private client: SpotifyApiClient) {}

  getUserProfile(userId: string): Promise<UserProfile> {
    return new Promise((res, rej) => {
      this.client.apiHelper.get(`/users/${userId}`).then((response: any) => {
        res(response.data as UserProfile);
      });
    });
  }

  checkIfUserFollowsPlaylist(playlistId: string, userId: string): Promise<boolean> {
    return new Promise((res, rej) => {
      this.client.apiHelper.get(`/playlists/${playlistId}/followers/contains?ids=${userId}`).then((response: any) => {
        res((response.data as any)[0] as boolean);
      });
    });
  }
}
