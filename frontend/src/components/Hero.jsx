import React from "react";
import hero_img from "../assets/hero_img.png";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-400">
      <div className="w-full sm:w-2/3 flex flex-col items-start justify-center py-10 sm:py-0 ml-14 px-6">
        <div className="text-[#414141]">
          <h1 className="text-3xl sm:py-3 py-2 lg:text-5xl leading-relaxed">
            <span>
              OUR BEST <span className="text-[burlywood]">LUXURY</span>
            </span>
            <br />
            <span>WATCH COLLECTIONS</span>
            <br />
            <span className=" lg:text-5xl">FOR YOU</span>
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <p className="font-semibold text-[burlywood] lg:text-3xl md:text-base">
              The Future On Your Wrist
            </p>
            <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
          </div>
        </div>
        <Link to={"/collection"}>
          <button className="mt-6 cursor-pointer bg-black hover:bg-gray-600 text-white text-2xl font-semibold py-4 px-6 rounded-lg hover:bg-burlywood transition flex items-center">
            Explore Now
            <AiOutlineArrowRight className="ml-2" />
          </button>
        </Link>
      </div>
      <div className="w-full sm:w-1/3">
        <img
          className="w-full h-full object-cover"
          src={hero_img}
          alt="Hero"
        />
      </div>
    </div>
  );
};

export default Hero;
