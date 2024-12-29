import { CategoryObject, SpotifyList } from "../../@types/types";
import SpotifyApiClient from "../SpotifyApiClient";
export default class Categories {
    private client;
    constructor(client: SpotifyApiClient);
    getBrowseCategories(): Promise<SpotifyList<CategoryObject>>;
    getBrowseCategory(categoryId: string): Promise<CategoryObject>;
}
//# sourceMappingURL=Categories.d.ts.map