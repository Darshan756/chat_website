import React from "react";
import logo from '../assets/chatAppLogo.png'
import NavBar from "../components/NavBar";

const LeftSection = ({ sideBarOpen, setSideBarOpen }) => {
  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-neutral-900 text-gray-200 transition-transform duration-500 ease-in-out z-50
        ${sideBarOpen ? "translate-x-0" : "-translate-x-full"}
        md:relative md:translate-x-0 md:w-72 w-64 flex flex-col justify-between`}
      >
        <div className="flex flex-col h-full justify-between p-4">
          <div>
                <div className="flex flex-col items-center">
               <img src={logo} alt="Chat Logo" className="w-24 h-24 rounded-3xl mt-1 mb-2" />
                <NavBar setSideBarOpen={setSideBarOpen} />
                </div>


            {/* Chat Section */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-3 text-center border-b border-gray-700 pb-2 text-white">
                Chat
              </h2>

              <div className="flex justify-center gap-4 mb-3">
                <button className="px-3 py-1 bg-gray-800 text-gray-300 rounded-md hover:bg-blue-600 hover:text-white transition">
                  Contacts
                </button>
                <button className="px-3 py-1 bg-gray-800 text-gray-300 rounded-md hover:bg-blue-600 hover:text-white transition">
                  Groups
                </button>
              </div>

              <div className="space-y-2 text-gray-300">
                <p className="hover:text-white cursor-pointer transition text-center">
                  Chats
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Toggle Button */}
      <button
        onClick={() => setSideBarOpen((prev) => !prev)}
        className="fixed top-1/2 left-0 transform -translate-y-1/2 z-50 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white p-3 rounded-r-lg
        md:hidden transition-all duration-300 hover:scale-110 animate-pulse"
      >
        {sideBarOpen ? "<" : ">"}
      </button>
    </>
  );
};

export default LeftSection;
