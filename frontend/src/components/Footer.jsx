import React from "react";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <div>
      <div className="flex bg-gray-200  flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm ">
        <div>
          <img src={logo} className=" mb-5 w-32" alt="" />
          <p className="w-full md:w-2/3 text-gray-600">
            Elegant Watches - Your destination for timeless style and unmatched
            quality. Discover watches crafted to perfection, blending elegance
            and functionality for every occasion
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+92-300000000000</li>
            <li>info@elegantwatches.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2024@ Elegant Watches  - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
