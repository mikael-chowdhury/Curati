import React from "react";
import { BackgroundGradientAnimation } from "../../components/ui/background-gradient-animation";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <BackgroundGradientAnimation>
      <div className="mb-12 absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 text-center text-7xl">
        <div className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/10">
          Welcome to Curati
        </div>
      </div>
      <div className="absolute z-50 w-full h-screen flex justify-center flex-wrap items-center p-4">
        <button className="p-[3px] relative mt-56" onClick={() => navigate("/curate")}>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
          <div className="px-16 py-4 bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
            Curate my mix!
          </div>
        </button>
      </div>
      <div className="absolute z-49 w-screen h-screen flex items-center justify-center p-4 text-slate-300 text-4xl">
        <p className="absolute text-center text-base mt-[340px]">*no signin required</p>
      </div>
    </BackgroundGradientAnimation>
  );
}

export default HomePage;
