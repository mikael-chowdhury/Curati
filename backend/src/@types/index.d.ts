declare module "lastfm" {
  class LastFmNode {
    constructor(options: { api_key: string; secret: string });
    request(method: string, params: object): void;
  }
}
