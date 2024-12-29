export interface ApiOptions {
  clientKey: string;
  clientSecret: string;
}

export interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}

export interface SimplifiedArtistObject {
  external_urls: Object[];
  href: string;
  id: string;
  name: string;
  type: "artist";
  uri: string;
}

export interface ArtistObject {
  external_urls: Object[];
  followers: { href: string | null; total: number };
  genres: string[];
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  popularity: number;
  type: "artist";
  uri: string;
}

export interface SimplifiedTrackObject {
  artists: SimplifiedArtistObject[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: { spotify: string };
  href: string;
  id: string;
  is_playable: boolean;
  linked_from: { external_urls: { spotify: string }; href: string; id: string; type: string; uri: string };
  restrictions: { reason: "market" | "product" | "explicit" };
  name: string;
  preview_url: string;
  track_number: number;
  type: "track";
  uri: string;
  is_local: boolean;
}

export interface TrackObject {
  album: AlbumObject;
  artists: SimplifiedArtistObject[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: { isrc: string; ean: string; upc: string };
  external_urls: { spotify: string };
  href: string;
  id: string;
  is_playable: boolean;
  linked_from: { external_urls: { spotify: string }; href: string; id: string; type: string; uri: string };
  restrictions: { reason: "market" | "product" | "explicit" };
  name: string;
  pupularity: number;
  preview_url: string;
  track_number: number;
  type: "track";
  uri: string;
  is_local: boolean;
}

export type AlbumObject = {
  album_type: "album" | "single" | "compilation";
  total_tracks: number;
  available_markets: string[];
  external_urls: { spotify: "https://open.spotify.com/album/41GuZcammIkupMPKH2OJ6I" };
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  release_date: string;
  release_date_precision: "year" | "month" | "day";
  type: "album";
  uri: string;
  artists: SimplifiedArtistObject[];
  tracks: SpotifyList<SimplifiedTrackObject>;
  copyrights: { text: string; type: "C" | "P" }[];
  external_ids: { upc: "886447227169" };
  genres: string[];
  label: string;
  popularity: number;
};

export interface SimplifiedAlbumObject {
  album_type: "album" | "single" | "compilation";
  total_tracks: number;
  available_markets: string[];
  external_urls: { spotify: string };
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  release_date: string;
  release_date_precision: "year" | "month" | "day";
  restrictions: { reason: "market" | "product" | "explicit" };
  type: string;
  uri: string;
  artists: SimplifiedArtistObject[];
}

export interface SimplifiedChapterObject {
  audio_preview_url: string;
  available_markets: string[];
  chapter_number: number;
  description: string;
  html_description: string;
  duration_ms: number;
  explicit: boolean;
  external_urls: { spotify: string };
  href: string;
  id: string;
  images: SpotifyImage[];
  is_playable: boolean;
  languages: string[];
  name: string;
  release_date: string;
  release_date_precision: "year" | "month" | "day";
  type: "episode";
  uri: string;
  restrictions: { reason: "market" | "product" | "explicit" };
}

export interface AudiobookObject {
  authors: { name: string }[];
  available_markets: string[];
  description: string;
  html_description: string;
  edition: string;
  explicit: boolean;
  external_urls: { spotify: string };
  href: string;
  id: string;
  name: string;
  images: SpotifyImage[];
  languages: string[];
  mediaType: string;
  narrators: { name: string }[];
  publisher: string;
  type: "audiobook";
  uri: string;
  total_chapters: number;
  chapters: SpotifyList<SimplifiedChapterObject>;
}

export interface SimplifiedAudiobookObject {
  authors: { name: string }[];
  available_markets: string[];
  copyrights: { text: string; type: string };
  description: string;
  html_description: string;
  edition: string;
  explicit: boolean;
  external_urls: { spotify: string };
  href: string;
  id: string;
  name: string;
  images: SpotifyImage[];
  languages: string[];
  mediaType: string;
  narrators: { name: string }[];
  publisher: string;
  type: "audiobook";
  uri: string;
  total_chapters: number;
}

export interface CategoryObject {
  href: string;
  icons: SpotifyImage[];
  id: string;
  name: string;
}

export interface PlaylistObject {
  collaborative: boolean;
  description: string;
  external_urls: { spotify: string };
  followers: { href: string | null; total: number };
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  owner: UserProfile;
  public: boolean;
  snapshot_id: string;
  tracks: SpotifyList<PlaylistTrackObject>;
  type: "playlist";
  uri: string;
}

export interface PlaylistTrackObject {
  added_at: string;
  added_by: UserProfile;
  is_local: boolean;
  track: TrackObject;
}

export interface SimplifiedPlaylistObject {
  collaborative: boolean;
  description: string;
  external_urls: { spotify: string };
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  owner: UserProfile;
  public: boolean;
  snapshot_id: string;
  tracks: { href: string; total: number };
  type: string;
  uri: string;
}

export interface SpotifyList<T> {
  href: string;
  items: T[];
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}

export interface AudioFeaturesObject {
  acousticness: number;
  analysis_url: string;
  danceability: number;
  duration_ms: number;
  energy: number;
  id: string;
  instrumentalness: number;
  key: number;
  liveness: number;
  loudness: number;
  mode: number;
  speechiness: number;
  tempo: number;
  time_signature: number;
  track_href: string;
  type: string;
  uri: string;
  valence: number;
}

export interface AudioAnalysisObject {
  meta: {
    analyzer_version: string;
    platform: string;
    detailed_status: string;
    status_code: number;
    timestamp: number;
    analysis_time: number;
    input_process: string;
  };
  track: {
    num_samples: number;
    duration: number;
    sample_md5: string;
    offset_seconds: number;
    window_seconds: number;
    analysis_sample_rate: number;
    analysis_channels: number;
    end_of_fade_in: number;
    start_of_fade_out: number;
    loudness: number;
    tempo: number;
    tempo_confidence: number;
    time_signature: number;
    time_signature_confidence: number;
    key: number;
    key_confidence: number;
    mode: number;
    mode_confidence: number;
    codestring: string;
    code_version: number;
    echoprintstring: string;
    echoprint_version: number;
    synch_version: number;
    rhythmstring: string;
    rhythm_version: number;
  };
  bars: { start: number; duration: number; confidence: number }[];
  beats: { start: number; duration: number; confidence: number }[];
  sections: {
    start: number;
    duration: number;
    confidence: number;
    loudness: number;
    tempo: number;
    tempo_confidence: number;
    key: number;
    key_confidence: number;
    mode: number;
    mode_confidence: number;
    time_signature: number;
    time_signature_confidence: number;
  }[];
  segments: {
    start: number;
    duration: number;
    confidence: number;
    loudness_start: number;
    loudness_max: number;
    loudness_max_time: number;
    loudness_end: number;
    pitches: number[];
    timbre: number[];
  }[];
  tatums: { start: number; duration: number; confidence: number }[];
}

export interface RecommendationSeedObject {
  afterFilteringSize: number;
  afterRelinkingSize: number;
  href: string;
  id: string;
  initialPoolSize: number;
  type: string;
}

export interface UserProfile {
  display_name: string;
  external_urls: { spotify: string };
  followers: { href: string | null; total: number };
  href: string;
  id: string;
  images: SpotifyImage[];
  type: string;
  uri: string;
}
