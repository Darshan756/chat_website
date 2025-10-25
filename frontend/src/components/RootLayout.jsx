import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import LeftSection from "./LeftSection";

const RootLayout = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  // To handle window resizing dynamically (for mobile opacity effect)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Sidebar */}
      <LeftSection sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} />

      {/* Right Main Panel */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          sideBarOpen && windowWidth < 768 ? "opacity-50" : ""
        }`}
      >
        {/* Main scrollable content */}
        <main className="flex-1 bg-neutral-100 text-gray-800 rounded-t-2xl shadow-lg p-4 overflow-y-auto pb-20">
          <Outlet />
        </main>

        {/* Fixed Footer */}
        <footer className="bg-neutral-900 text-white text-center py-3 text-sm border-t border-gray-700 fixed bottom-0 left-0 w-full z-10">
          © 2025 ChatApp — All Rights Reserved
        </footer>
      </div>
    </div>
  );
};

export default RootLayout;
