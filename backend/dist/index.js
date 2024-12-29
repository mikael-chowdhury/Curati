"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const spotifyapi_1 = require("@mikaelchowdhury/spotifyapi");
const cors_1 = __importDefault(require("cors"));
const lastfm_1 = __importDefault(require("lastfm"));
const Algo_1 = __importDefault(require("./Algo"));
const db_1 = require("./db");
require("dotenv").config();
const client = new spotifyapi_1.SpotifyApiClient({
    clientKey: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});
const lastfmNode = new lastfm_1.default.LastFmNode({
    api_key: process.env.LASTFM_API_KEY,
    secret: process.env.LASTFM_SECRET,
});
const app = (0, express_1.default)();
app.use(express_1.default.json({}));
app.use((0, cors_1.default)({
    origin: (origin, cb) => {
        cb(null, "http://localhost:3000");
    },
}));
app.get("/ping", (req, res) => {
    res.send("Hello World!");
});
app.get("/playlist/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const playlistId = req.params.id;
    const playlist = yield client.playlist.getPlaylist(playlistId);
    playlist.tracks.items.forEach((track) => {
        (0, db_1.insertIfNotExist)({
            songName: track.track.name,
            songArtist: track.track.artists[0].name,
            songAlbum: track.track.album.name,
        });
    });
    const genres = Array.from(new Set((yield client.artist.getArtists(playlist.tracks.items.slice(0, 5).map((track) => track.track.artists[0].id)))
        .map((artist) => artist.genres)
        .flat()));
    const getRandomTrackFromPlaylist = () => playlist.tracks.items[Math.floor(Math.random() * playlist.tracks.items.length)].track;
    console.log("tracks");
    const recommendationsBasedOffTracks = (yield Promise.all(new Array(Algo_1.default.SEED_SONGS).fill(null).map(() => {
        return new Promise((resolveP, rejectP) => {
            const track = getRandomTrackFromPlaylist();
            lastfmNode.request("track.getSimilar", {
                artist: track.artists[0].name,
                track: track.name,
                limit: 5,
                handlers: {
                    success: function (data) {
                        resolveP(data.similartracks.track
                            .filter((track) => playlist.tracks.items.every((playlistTrack) => playlistTrack.track.name.toLowerCase() != track.name.toLowerCase()))
                            .map((t) => {
                            t.because = `track|${JSON.stringify(track)}`;
                            return t;
                        }));
                    },
                    error: function (error) {
                        rejectP(error);
                    },
                },
            });
        });
    }))).flat();
    console.log("genres");
    const recommendationsBasedOffGenres = (yield Promise.all(genres
        .sort(() => 0.5 - Math.random())
        .slice(0, Algo_1.default.SEED_GENRES)
        .map((genre) => {
        return new Promise((resolveP, rejectP) => {
            lastfmNode.request("tag.getTopTracks", {
                tag: genre,
                page: Math.floor(Math.random() * 5),
                limit: 15,
                handlers: {
                    success: function (data) {
                        resolveP(data.tracks.track
                            .filter((track) => playlist.tracks.items.every((playlistTrack) => playlistTrack.track.name.toLowerCase() != track.name.toLowerCase()))
                            .sort(() => 0.5 - Math.random())
                            .slice(0, 5)
                            .map((t) => {
                            t.because = `genre|${genre}`;
                            return t;
                        }));
                    },
                    error: function (error) {
                        console.log(error);
                        rejectP(error);
                    },
                },
            });
        });
    }))).flat();
    console.log("artists");
    let recommendationsBasedOffArtists = (yield Promise.all(new Array(Algo_1.default.SEED_ARTISTS).fill(null).map(() => {
        return new Promise((resolveP, rejectP) => {
            const track = getRandomTrackFromPlaylist();
            lastfmNode.request("artist.getSimilar", {
                artist: track.artists[0].name,
                limit: 5,
                handlers: {
                    success: function (data) {
                        const similarArtists = data.similarartists.artist.filter((artist) => playlist.tracks.items.every((playlistTrack) => playlistTrack.track.artists[0].name.toLowerCase() != artist.name.toLowerCase()));
                        Promise.all(similarArtists.map((artist) => {
                            return new Promise((resolveA, rejectA) => {
                                lastfmNode.request("artist.getTopTracks", {
                                    artist: artist.name,
                                    limit: 5,
                                    handlers: {
                                        success: function (data) {
                                            resolveA(data.toptracks.track
                                                .filter((track) => playlist.tracks.items.every((playlistTrack) => playlistTrack.track.name.toLowerCase() != track.name.toLowerCase()))
                                                .map((t) => {
                                                t.because = `artist|${JSON.stringify(track.artists[0])}`;
                                                return t;
                                            }));
                                        },
                                        error: function (error) {
                                            rejectA(error);
                                        },
                                    },
                                });
                            });
                        }))
                            .then((topTracks) => {
                            resolveP(topTracks.flat());
                        })
                            .catch((error) => {
                            rejectP(error);
                        });
                    },
                    error: function (error) {
                        rejectP(error);
                    },
                },
            });
        });
    }))).flat();
    recommendationsBasedOffArtists = recommendationsBasedOffArtists.sort(() => 0.5 - Math.random()).slice(0, 8);
    const recommendations = Array.from(new Set(recommendationsBasedOffTracks
        .concat(recommendationsBasedOffGenres)
        .concat(recommendationsBasedOffArtists)
        .filter((x) => x != null)));
    const getRandomRecommendations = () => {
        const amount = Algo_1.default.NUM_RECOMMENDATIONS;
        const randomRecommendations = [];
        while (randomRecommendations.length < amount && recommendations.length > 0) {
            const randomIndex = Math.floor(Math.random() * recommendations.length);
            const randomRecommendation = recommendations[randomIndex];
            if (!playlist.tracks.items.some((track) => track.track.name.toLowerCase() == randomRecommendation.name.toLowerCase())) {
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
                    data.items[0].because = song.because;
                    return data.items[0]; // Return the top track
                }
                else {
                    return null; // No track found
                }
            })
                .catch((error) => {
                console.error(error);
                return null;
            });
        }
        catch (e) {
            return new Promise((res, rej) => res(null));
        }
    });
    Promise.all(searchPromises)
        .then((topTracks) => {
        const filteredTracks = topTracks.filter((track) => track !== null); // Filter out null values
        filteredTracks.forEach((track) => {
            // Insert into database
            (0, db_1.insertIfNotExist)({
                songName: track.name,
                songArtist: track.artists[0].name,
                songAlbum: track.album.name,
            });
        });
        res.send(filteredTracks);
    })
        .catch((error) => {
        console.error(error);
        res.status(500).send("An error occurred while searching for tracks.");
    });
}));
app.listen(process.env.PORT, () => {
    console.log("Server is running on port " + process.env.PORT);
});
client.getAccessToken().then((token) => {
    console.log("Sucessfully connected to Spotify API");
});
module.exports = app;
//# sourceMappingURL=index.js.map