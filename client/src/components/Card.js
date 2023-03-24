import React from "react";

import { download } from "../assets";
import { downloadImage } from "../utils";

const Card = ({ _id, name, prompt, photo }) => {
  return (
    //using group class to add the hover effect
    <div className="group rounded-xl card relative shadow-card hover:shadow-cardhover ">
      <img
        className="w-full object-cover rounded-xl"
        src={photo}
        alt={prompt}
      />

      {/* info on hover */}
      <div className="group-hover:flex flex-col gap-3 hidden text-white text-sm absolute bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.8)] p-[8px] rounded-xl">
        <p className="w-full text-center font-semibold">{prompt}</p>
        <div className="flex justify-between items-center">
          {/* user logo and name... */}
          <div className="flex justify-center items-center gap-1 font-semibold">
            <span className="w-6 h-6 flex justify-center items-center rounded-full bg-green-600 p-3 mx-1">
              {name[0].toUpperCase()}
            </span>
            <span className="sm:text-base">
              {name[0].toUpperCase() + name.substring(1, name.length)}
            </span>
          </div>

          {/* download btn */}
          <button
            type="button"
            className="w-8 h-8 rounded-full mx-1"
            onClick={() => downloadImage(_id, photo)}
          >
            {/* inver will invert the color */}
            <img
              className="object-cover invert"
              src={download}
              alt="download"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
