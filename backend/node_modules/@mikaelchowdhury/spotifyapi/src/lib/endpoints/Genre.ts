import SpotifyApiClient from "../SpotifyApiClient";

export default class Genre {
  private client: SpotifyApiClient;
  constructor(client: SpotifyApiClient) {
    this.client = client;
  }

  getAvailableGenreSeeds(): Promise<string[]> {
    return new Promise((res, rej) => {
      this.client.apiHelper
        .get("/recommendations/available-genre-seeds")
        .then((response: any) => res(response.data.genres));
    });
  }
}
