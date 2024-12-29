import axios from "axios";
import SpotifyApiClient from "./SpotifyApiClient";

export class ApiHelper {
  private client: SpotifyApiClient;
  private accessToken!: string;
  private clientKey: string;
  private clientSecret: string;

  constructor(client: SpotifyApiClient, clientKey: string, clientSecret: string) {
    this.client = client;
    this.clientKey = clientKey;
    this.clientSecret = clientSecret;
  }

  public getAccessToken(): Promise<string> {
    return new Promise((res, rej) => {
      axios
        .post(
          "https://accounts.spotify.com/api/token",
          `grant_type=client_credentials&client_id=${this.clientKey}&client_secret=${this.clientSecret}`,
          {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          }
        )
        .catch((error) => {
          console.log(error);
        })
        .then((response) => {
          this.accessToken = response?.data.access_token;
          res(this.accessToken);
        });
    });
  }

  public static API_BASE = "https://api.spotify.com/v1";
  async get(path: string) {
    if (this.accessToken === undefined || this.accessToken.trim() === "") {
      throw new Error("Access token is not set, please call and await getAccessToken() first");
    }

    return new Promise((resolve, reject) =>
      axios
        .get(ApiHelper.API_BASE + path, {
          headers: { Authorization: "Bearer " + this.accessToken },
        })
        .catch(reject)
        .then((response) => resolve(response))
    );
  }
}
