import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginContext } from "../contex/logincontext";

const ChatNavbar = ({ Chatlist, setChatlist }) => {
  const navigate = useNavigate();
  const { tochatlist, setTochatlist } = useContext(loginContext);

  const navigatinglist = () => {
    setChatlist(true);
    setTochatlist(true);
  };

  const navigatinghome = () => {
    setChatlist(false);
    setTochatlist(false);
  };

  return (
    <nav className="bg-green-900 p-4 text-white shadow-lg w-full h-auto">
      <div className="mx-auto flex flex-wrap justify-center sm:justify-around items-center gap-4 max-w-screen-lg">
        <button
          onClick={navigatinghome}
          className="bg-green-500 font-bold text-lg sm:text-xl text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all duration-300 hover:bg-green-700 hover:shadow-xl"
        >
          Chat Home
        </button>
        <button
          onClick={navigatinglist}
          className="bg-green-500 font-bold text-lg sm:text-xl text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all duration-300 hover:bg-green-700 hover:shadow-xl"
        >
          Chat List
        </button>
      </div>
    </nav>
  );
};

export default ChatNavbar;