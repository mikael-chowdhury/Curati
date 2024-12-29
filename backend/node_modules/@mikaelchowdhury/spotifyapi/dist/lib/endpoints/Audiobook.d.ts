import { AudiobookObject, SimplifiedChapterObject, SpotifyList } from "../../@types/types";
import SpotifyApiClient from "../SpotifyApiClient";
export default class Audiobook {
    private client;
    constructor(client: SpotifyApiClient);
    getAudiobook(audiobookId: string): Promise<AudiobookObject>;
    getAudiobooks(audiobookIds: string[]): Promise<AudiobookObject[]>;
    getAudiobookChapters(audiobookId: string): Promise<SpotifyList<SimplifiedChapterObject>>;
    getChapter(chapterId: string): Promise<SimplifiedChapterObject>;
    getChapters(chapterIds: string[]): Promise<SimplifiedChapterObject[]>;
}
//# sourceMappingURL=Audiobook.d.ts.map