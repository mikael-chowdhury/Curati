interface ApiOptions {
  clientKey: string;
  clientSecret: string;
}

interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}

interface TracksListData {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: TrackData[];
}

interface ArtistData {
  external_urls: Object[];
  href: string;
  id: string;
  name: string;
  type: "artist";
  uri: string;
}

interface TrackData {
  artists: ArtistData[];
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

type AlbumData = {
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
  artists: ArtistData[];
  tracks: TracksListData;
  copyrights: { text: string; type: "C" | "P" }[];
  external_ids: { upc: "886447227169" };
  genres: string[];
  label: string;
  popularity: number;
};
