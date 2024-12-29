import express from "express";
import { SpotifyApiClient } from "@mikaelchowdhury/spotifyapi";
import { TrackObject } from "@mikaelchowdhury/spotifyapi/src/@types/types";

import cors from "cors";
import lastfm from "lastfm";
import query from "querystring";
import Algo from "./Algo";
import { insertIfNotExist } from "./db";

require("dotenv").config();

const client = new SpotifyApiClient({
  clientKey: process.env.SPOTIFY_CLIENT_ID!,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
});

const lastfmNode = new lastfm.LastFmNode({
  api_key: process.env.LASTFM_API_KEY!,
  secret: process.env.LASTFM_SECRET!,
});

const app = express();

app.use(express.json({}));

app.use(
  cors({
    origin: (origin, cb) => {
      cb(null, "http://localhost:3000");
    },
  })
);

app.get("/ping", (req, res) => {
  res.send("Hello World!");
});

app.get("/playlist/:id", async (req, res) => {
  const playlistId = req.params.id;
  const playlist = await client.playlist.getPlaylist(playlistId);

  playlist.tracks.items.forEach((track) => {
    insertIfNotExist({
      songName: track.track.name,
      songArtist: track.track.artists[0].name,
      songAlbum: track.track.album.name,
    });
  });

  const genres: string[] = Array.from(
    new Set(
      (await client.artist.getArtists(playlist.tracks.items.slice(0, 5).map((track) => track.track.artists[0].id)))
        .map((artist) => artist.genres)
        .flat()
    )
  );

  const getRandomTrackFromPlaylist = () =>
    playlist.tracks.items[Math.floor(Math.random() * playlist.tracks.items.length)].track;

  console.log("tracks");
  const recommendationsBasedOffTracks: any[] = (
    await Promise.all(
      new Array(Algo.SEED_SONGS).fill(null).map(() => {
        return new Promise((resolveP, rejectP) => {
          const track = getRandomTrackFromPlaylist();
          lastfmNode.request("track.getSimilar", {
            artist: track.artists[0].name,
            track: track.name,
            limit: 5,
            handlers: {
              success: function (data: any) {
                resolveP(
                  data.similartracks.track
                    .filter((track: any) =>
                      playlist.tracks.items.every(
                        (playlistTrack) => playlistTrack.track.name.toLowerCase() != track.name.toLowerCase()
                      )
                    )
                    .map((t: any) => {
                      t.because = `track|${JSON.stringify(track)}`;
                      return t;
                    })
                );
              },
              error: function (error: any) {
                rejectP(error);
              },
            },
          });
        });
      })
    )
  ).flat();

  console.log("genres");
  const recommendationsBasedOffGenres: any[] = (
    await Promise.all(
      genres
        .sort(() => 0.5 - Math.random())
        .slice(0, Algo.SEED_GENRES)
        .map((genre) => {
          return new Promise((resolveP, rejectP) => {
            lastfmNode.request("tag.getTopTracks", {
              tag: genre,
              page: Math.floor(Math.random() * 5),
              limit: 15,
              handlers: {
                success: function (data: any) {
                  resolveP(
                    data.tracks.track
                      .filter((track: any) =>
                        playlist.tracks.items.every(
                          (playlistTrack) => playlistTrack.track.name.toLowerCase() != track.name.toLowerCase()
                        )
                      )
                      .sort(() => 0.5 - Math.random())
                      .slice(0, 5)
                      .map((t: any) => {
                        t.because = `genre|${genre}`;
                        return t;
                      })
                  );
                },
                error: function (error: any) {
                  console.log(error);
                  rejectP(error);
                },
              },
            });
          });
        })
    )
  ).flat();

  console.log("artists");
  let recommendationsBasedOffArtists: any[] = (
    await Promise.all(
      new Array(Algo.SEED_ARTISTS).fill(null).map(() => {
        return new Promise((resolveP, rejectP) => {
          const track = getRandomTrackFromPlaylist();
          lastfmNode.request("artist.getSimilar", {
            artist: track.artists[0].name,
            limit: 5,
            handlers: {
              success: function (data: any) {
                const similarArtists = data.similarartists.artist.filter((artist: any) =>
                  playlist.tracks.items.every(
                    (playlistTrack) => playlistTrack.track.artists[0].name.toLowerCase() != artist.name.toLowerCase()
                  )
                );

                Promise.all(
                  similarArtists.map((artist: any) => {
                    return new Promise((resolveA, rejectA) => {
                      lastfmNode.request("artist.getTopTracks", {
                        artist: artist.name,
                        limit: 5,
                        handlers: {
                          success: function (data: any) {
                            resolveA(
                              data.toptracks.track
                                .filter((track: any) =>
                                  playlist.tracks.items.every(
                                    (playlistTrack) =>
                                      playlistTrack.track.name.toLowerCase() != track.name.toLowerCase()
                                  )
                                )
                                .map((t: any) => {
                                  t.because = `artist|${JSON.stringify(track.artists[0])}`;
                                  return t;
                                })
                            );
                          },
                          error: function (error: any) {
                            rejectA(error);
                          },
                        },
                      });
                    });
                  })
                )
                  .then((topTracks) => {
                    resolveP(topTracks.flat());
                  })
                  .catch((error) => {
                    rejectP(error);
                  });
              },
              error: function (error: any) {
                rejectP(error);
              },
            },
          });
        });
      })
    )
  ).flat();

  recommendationsBasedOffArtists = recommendationsBasedOffArtists.sort(() => 0.5 - Math.random()).slice(0, 8);

  const recommendations = Array.from(
    new Set(
      recommendationsBasedOffTracks
        .concat(recommendationsBasedOffGenres)
        .concat(recommendationsBasedOffArtists)
        .filter((x) => x != null)
    )
  );

  const getRandomRecommendations = () => {
    const amount = Algo.NUM_RECOMMENDATIONS;
    const randomRecommendations: any[] = [];

    while (randomRecommendations.length < amount && recommendations.length > 0) {
      const randomIndex = Math.floor(Math.random() * recommendations.length);
      const randomRecommendation = recommendations[randomIndex];

      if (
        !playlist.tracks.items.some(
          (track) => track.track.name.toLowerCase() == randomRecommendation.name.toLowerCase()
        )
      ) {
        randomRecommendations.push(randomRecommendation);
      }
      recommendations.splice(randomIndex, 1);
    }

    return randomRecommendations;
  };

  const _recommend = getRandomRecommendations();

  console.log("search");
  const searchPromises = _recommend.map((song) => {
    try {
      return client.search
        .searchTracks(encodeURIComponent(song.name))
        .then((data) => {
          if (data.items.length > 0) {
            (data.items[0] as any).because = song.because;
            return data.items[0]; // Return the top track
          } else {
            return null; // No track found
          }
        })
        .catch((error) => {
          console.error(error);
          return null;
        });
    } catch (e) {
      return new Promise((res, rej) => res(null));
    }
  });

  Promise.all(searchPromises)
    .then((topTracks) => {
      const filteredTracks: TrackObject[] = topTracks.filter((track) => track !== null) as TrackObject[]; // Filter out null values
      filteredTracks.forEach((track) => {
        // Insert into database
        insertIfNotExist({
          songName: track.name,
          songArtist: track.artists[0].name,
          songAlbum: (track as any).album.name,
        });
      });
      res.send(filteredTracks);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("An error occurred while searching for tracks.");
    });
});

app.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT);
});

client.getAccessToken().then((token) => {
  console.log("Sucessfully connected to Spotify API");
});

module.exports = app;
