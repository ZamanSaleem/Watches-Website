import React from "react";
import about_img from "../assets/about_img.png";

const About = () => {
  return (
    <div>
      <div className=" flex flex-col bg-black md:flex-row gap-10">
        <div className="w-1/3 ml-10">
          <img
            className="w-full md:max-w-[450px]"
            src={about_img}
            alt=""
          />
        </div>

        <div className="mt-10 w-full md:w-2/4 text-white">
          <div className="text-4xl text-center pt-4 ">
            <h1>ABOUT US</h1>
          </div>
          <p className="text-3xl mt-8 text-[burlywood]">
            Welcome to Elegant Watches,
          </p>
          <p className="text-2xl mt-4">
            Your premier destination for stylish and precise timepieces.
          </p>
          <p className="mt-4 text-xl">
            Our name reflects our commitment to helping you make the most of
            every minute. At Elegant Watches, we believe that a watch is more
            than just a time-telling device—it's a statement of style, a symbol
            of sophistication, and a reminder to make every moment count. That's
            why we curate a selection of high-quality watches that blend
            fashion, functionality, and affordability.
          </p>
          <h6 className="text-[burlywood] mt-4 text-3xl">Our Mission</h6>
          <p className="mt-4 text-xl">
            {" "}
            Our mission is to provide exceptional customer service, fast
            shipping, and a hassle-free shopping experience. Whether you're
            looking for a sleek dress watch or a rugged sports watch, we've got
            you covered.
          </p>
          <p className="mt-4 text-xl text-[burlywood]">
            Join the Elegant Watches community today and start making the most
            of your time!
          </p>
        </div>
      </div>

      <div className=" text-xl py-4">
        <h1 className="text-3xl items-center">WHY CHOOSE US</h1>
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className=" text-gray-600">
            We meticulously select and vet each product to ensure it meets our
            stringent quality standards.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className=" text-gray-600">
            With our user-friendly interface and hassle-free ordering process,
            shopping has never been easier.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className=" text-gray-600">
            Our team of dedicated professionals is here to assist you the way,
            ensuring your satisfaction is our top priority.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
