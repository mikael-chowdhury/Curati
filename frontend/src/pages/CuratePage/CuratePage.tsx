import React, { useState } from "react";
import { BackgroundGradientAnimation } from "../../components/ui/background-gradient-animation";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CuratePage() {
  const navigate = useNavigate();

  const [playlistInput, setPlaylistInput] = useState("");
  const [error, setError] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const handleButtonClick = () => {
    console.log(playlistInput);
    const playlist_longid = playlistInput.replace("https://open.spotify.com/playlist/", "");

    console.log(playlist_longid);

    const removeAfter = playlist_longid.indexOf("?");
    let playlist_id = null;

    if (removeAfter > 0) {
      playlist_id = playlist_longid.substring(0, removeAfter);
    } else {
      playlist_id = playlist_longid;
    }

    if (!playlist_id) {
      setError("Invalid playlist ID");
    } else {
      setError("");
      axios.get(`http://localhost:8080/playlist/${playlist_id}`).then((res) => {
        console.log(res.data);
        setResults(res.data);
      });
    }
  };

  return (
    <BackgroundGradientAnimation>
      <div className="mb-48 absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 text-center text-7xl">
        <div className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/10">
          Enter Your Playlist URL
        </div>
      </div>
      <div className="absolute z-50 w-[100%] h-screen flex justify-center flex-wrap items-center p-4">
        <div className="flex flex-wrap w-[100%] justify-center mt-48">
          <button className="p-[3px] relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="px-6 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white">
              <input
                placeholder="playlist URL"
                className="px-4 py-4 bg-transparent outline-none border-none text-base text-white w-[500px]"
                value={playlistInput}
                onChange={(e) => setPlaylistInput(e.target.value)}
              />
            </div>
          </button>
          <div className="w-[100%] flex justify-center">
            <button className="p-[3px] relative mt-4" onClick={handleButtonClick}>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
              <div className="px-12 py-4  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                Find similar songs
              </div>
            </button>
          </div>
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </div>
      </div>
      <div
        className="absolute top-[100%] flex flex-wrap justify-center gap-4 bg-black pb-48"
        style={{ visibility: results.length > 0 ? "visible" : "hidden" }}
      >
        <h1 className="w-[100%] text-4xl text-white text-center mt-24">Here's what we found</h1>
        {results
          .filter((x) => x != null)
          .map((result, index) => {
            const because = result.because.split("|")[0];
            console.log(result);

            let becauseJson = result.because.split("|")[1];
            if (because !== "genre") {
              becauseJson = JSON.parse(becauseJson);
            }

            return (
              <div key={index} className="text-white mb-4 w-[350px] flex flex-wrap justify-center mt-24">
                <h3 className="text-xl font-bold w-[100%] text-center">{result.name}</h3>
                <p className="w-[100%] text-center mb-4">
                  Artist(s): {result.artists.map((a: any) => a.name).join(", ")}
                </p>
                <img src={result.album.images[1].url} width="200px" height="200px" alt={result.name} />
                {because.startsWith("artist") && (
                  <p className="w-full text-center mt-4">Since you liked {becauseJson.name}</p>
                )}
                {because.startsWith("track") && (
                  <p className="w-full text-center mt-4"> Since you liked {becauseJson.name}</p>
                )}
                {because.startsWith("genre") && <p className="w-full text-center mt-4">Based on genre {becauseJson}</p>}
              </div>
            );
          })}
      </div>
    </BackgroundGradientAnimation>
  );
}
