import postgres from "postgres";
declare const sql: postgres.Sql<{}>;
export default sql;
declare const insertIfNotExist: ({ songName, songArtist, songAlbum, }: {
    songName: string;
    songArtist: string;
    songAlbum: string;
}) => Promise<void>;
export { insertIfNotExist };
//# sourceMappingURL=db.d.ts.map