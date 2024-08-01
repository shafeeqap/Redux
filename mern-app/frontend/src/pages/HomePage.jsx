import React from "react";
import Header from "../Components/Header/Header";
import bg_image from "../assets/horizon.jpg";

const HomePage = () => {
  return (
    <div className="h-screen overflow-hidden">
      <Header />
      <div className="flex h-screen">
        <div className="flex items-center w-1/2">
          <div className="px-5 max-sm:py-20 sm:px-20">
            <h1 className="font-medium text-gray-500 uppercase">Welcome to my world.</h1>
            <h1 className="font-extrabold text-lg sm:text-5xl">Hi, I'm <span className="text-yellow-700 capitalize">shafeeq</span></h1>
            <h2 className="font-semibold sm:text-3xl">a Developer.{" "}<span className="text-gray-500">|</span></h2>
            <div>
            <p className="py-2">Lorem ipsum dolor sit amet consectetur, 
                adipisicing elit. Commodi, laudantium! Voluptates quia 
                libero harum minus facere, nulla molestias modi sunt. 
                Sed tempore dolorum sequi at, quos laboriosam doloremque vel cupiditate!</p>
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <img src={bg_image} alt="" className="h-screen w-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
