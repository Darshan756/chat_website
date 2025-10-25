import React from "react";

const NewMessageCard = ({ msg }) => {
  return (
    <div
      key={msg.id}
      className="flex justify-between items-center w-full max-w-[95%] sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 
                 bg-gray-100 border border-gray-300 rounded-xl 
                 p-4 shadow-md hover:shadow-lg transition-all duration-200
                 mx-auto mb-3 flex-wrap"
    >
      <div className="flex-1 pr-2 min-w-[150px]">
        <p className="text-gray-800 font-semibold text-sm sm:text-base">{msg.sender}</p>
        <p className="text-gray-600 text-xs sm:text-sm mt-1 truncate">{msg.message}</p>
      </div>

      <button
        className="mt-2 sm:mt-0 bg-gray-600 hover:bg-gradient-to-r from-blue-500 to-indigo-600 
                   text-white px-3 sm:px-4 py-1 rounded-md 
                   hover:scale-105 hover:shadow-md 
                   transition-all duration-200 text-xs sm:text-sm font-medium cursor-pointer whitespace-nowrap"
      >
        Reply
      </button>
    </div>
  );
};

export default NewMessageCard;
