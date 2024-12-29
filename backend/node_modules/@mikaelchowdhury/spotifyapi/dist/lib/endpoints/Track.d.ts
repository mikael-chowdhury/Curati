import { AudioAnalysisObject, AudioFeaturesObject, RecommendationSeedObject, SpotifyList, TrackObject } from "../../@types/types";
import SpotifyApiClient from "../SpotifyApiClient";
export default class Track {
    private client;
    constructor(client: SpotifyApiClient);
    getTrack(trackId: string): Promise<TrackObject>;
    getTracks(trackIds: string[]): Promise<TrackObject[]>;
    getAudioFeatures(trackId: string): Promise<AudioFeaturesObject>;
    getSeveralAudioFeatures(trackIds: AudioFeaturesObject[]): Promise<AudioFeaturesObject[]>;
    getAudioAnalysis(trackId: string): Promise<AudioAnalysisObject>;
    getRecommendations(options: {
        seed_tracks: string[];
        seed_artists?: string[];
        seed_genres?: string[];
    }): Promise<{
        seeds: RecommendationSeedObject[];
        tracks: SpotifyList<TrackObject>;
    }>;
}
//# sourceMappingURL=Track.d.ts.map