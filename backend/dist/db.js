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
exports.insertIfNotExist = void 0;
const postgres_1 = __importDefault(require("postgres"));
const sql = (0, postgres_1.default)({
    database: "SongMetadataDatabase",
    host: "localhost",
    port: 5432,
}); // will use psql environment variables
exports.default = sql;
const insertIfNotExist = (_a) => __awaiter(void 0, [_a], void 0, function* ({ songName, songArtist, songAlbum, }) {
    const result = yield sql `SELECT * FROM song_metadata_analysed WHERE name = ${songName} AND artist = ${songArtist} AND album = ${songAlbum}`;
    if (result.length == 0)
        yield sql `INSERT INTO song_metadata_unanalysed (name, artist, album) SELECT ${songName}, ${songArtist}, ${songAlbum} WHERE NOT EXISTS (SELECT name FROM song_metadata_unanalysed WHERE name = ${songName} AND artist = ${songArtist} AND album = ${songAlbum})`;
});
exports.insertIfNotExist = insertIfNotExist;
//# sourceMappingURL=db.js.map