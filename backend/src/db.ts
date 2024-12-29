import postgres from "postgres";

const sql = postgres({
  database: "SongMetadataDatabase",
  host: "localhost",
  port: 5432,
}); // will use psql environment variables

export default sql;

const insertIfNotExist = async ({
  songName,
  songArtist,
  songAlbum,
}: {
  songName: string;
  songArtist: string;
  songAlbum: string;
}) => {
  const result =
    await sql`SELECT * FROM song_metadata_analysed WHERE name = ${songName} AND artist = ${songArtist} AND album = ${songAlbum}`;

  if (result.length == 0)
    await sql`INSERT INTO song_metadata_unanalysed (name, artist, album) SELECT ${songName}, ${songArtist}, ${songAlbum} WHERE NOT EXISTS (SELECT name FROM song_metadata_unanalysed WHERE name = ${songName} AND artist = ${songArtist} AND album = ${songAlbum})`;
};

export { insertIfNotExist };
