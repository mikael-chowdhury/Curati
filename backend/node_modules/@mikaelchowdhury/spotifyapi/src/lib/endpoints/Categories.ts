import { CategoryObject, SpotifyList } from "../../@types/types";
import SpotifyApiClient from "../SpotifyApiClient";

export default class Categories {
  private client: SpotifyApiClient;
  constructor(client: SpotifyApiClient) {
    this.client = client;
  }

  getBrowseCategories(): Promise<SpotifyList<CategoryObject>> {
    return new Promise((res, rej) => {
      this.client.apiHelper.get("/browse/categories").then((response: any) => res(response.data.categories));
    });
  }

  getBrowseCategory(categoryId: string): Promise<CategoryObject> {
    return new Promise((res, rej) => {
      this.client.apiHelper.get(`/browse/categories/${categoryId}`).then((response: any) => res(response.data));
    });
  }
}
