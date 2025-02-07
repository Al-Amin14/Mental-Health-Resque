import React from "react";

const ChatNavbar=()=>{
    return (

        <nav className="bg-green-900 p-4 text-white shadow-lg w-full h-auto">
        <div className="mx-auto flex justify-around items-center gap-4">
          <button className="bg-green-500 font-bold text-xl text-white px-6 py-3 rounded-lg transition-all duration-300 hover:bg-green-700 hover:shadow-xl">Chat Home</button>
          <button className="bg-green-500 font-bold text-xl text-white px-6 py-3 rounded-lg transition-all duration-300 hover:bg-green-700 hover:shadow-xl">Chat List</button>
        </div>
      </nav>
    );
  }

export default ChatNavbar
  