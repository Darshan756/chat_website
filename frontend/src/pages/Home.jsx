import React from "react";
import NewMessageCard from "../components/NewMessageCard";

const Home = () => {
  // Dummy data for new messages
  const newMessages = [
    { id: 1, sender: "Darshan", message: "Hey! Are you free today?" },
    { id: 2, sender: "Manoj", message: "Is Project Completed?." },
    { id: 3, sender: "Josh", message: "Can you review my code?" },
  ];

  return (
    <div className="flex flex-col items-center justify-start p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">New Messages</h1>

      {newMessages.map((msg) => (
        <NewMessageCard msg={msg}   />
      ))}
    </div>
  );
};

export default Home;
