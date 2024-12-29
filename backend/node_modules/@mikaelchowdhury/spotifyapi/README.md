# Spotify API NPM Package

![npm](https://img.shields.io/npm/v/@mikaelchowdhury/spotifyapi)
![license](https://img.shields.io/npm/l/@mikaelchowdhury/spotifyapi)
![issues](https://img.shields.io/github/issues/mikael-chowdhury/simple-spotify-api)

A robust and type-safe npm package that allows developers to easily access the Spotify API. This package provides TypeScript typings for all Spotify API endpoints, making it easy to integrate Spotify's vast array of music data into your applications.

## Table of Contents

- [Spotify API NPM Package](#spotify-api-npm-package)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [API Endpoints](#api-endpoints)
  - [Contributing](#contributing)
  - [License](#license)

## Installation

You can install the package using npm or yarn:

```bash
npm install @mikaelchowdhury/spotifyapi
or

yarn add @mikaelchowdhury/spotifyapi
```

## Usage

To use this package, you will need to have a Spotify Developer account and obtain your API credentials (Client ID and Client Secret). You can register your application and get your credentials here.

Basic Setup

```ts
import { SpotifyApiClient } from "@mikaelchowdhury/spotifyapi";

const client = new SpotifyApiClient({
  clientKey: "your-client-id",
  clientSecret: "your-client-secret",
});

// Fetch an access token
client.getAccessToken().then((token) => {
  console.log("Access Token:", token);
});
```

## API Endpoints

This package provides typings and methods for all Spotify API endpoints. Below are some of the major endpoint categories:

- Albums
- Artists
- Audiobooks
- Categories
- Genres
- Playlists
- Tracks
- Users
- Search

Example: Get album by id

```ts
client.album.getAlbum("album-id").then((album) => {
  console.log(album.tracks.items[0].name); // Log name of first song in album
});
```

Example: Get an artist by their id

```ts
client.artist.getArtist("artist id").then((artist) => {
  console.log(artist.name);
});
```

Examples

Here are a few more examples to get you started:

Get User Profile

```ts
client.user.getUserProfile("user-id").then((user) => {
  console.log(user.display_name);
});
```

Get Top Tracks for an Artist

```ts
client.artist.getArtistTopTracks("artist-id").then((tracks) => {
  console.log(tracks[0].name); // Log artist's top track
});
```

## Contributing

Lmk if you wna contribute because there is probably a lot of mistakes haha

## License

This project is licensed under the MIT License - see the LICENSE file for details.
