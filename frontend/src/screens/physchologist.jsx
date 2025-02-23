import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginContext } from "../contex/logincontext";

const PsychologistDirectory = () => {
  const { tochatlist, setTochatlist, setCheckAnother } = useContext(loginContext);
  const navigate = useNavigate();
  const [psychologists, setPsychologists] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("/login");
    } else {
      setCheckAnother(true);
      fetch("http://localhost:3003/usersDetails", {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((result) => {
          setPsychologists(
            result.filter(
              (item) => item.role !== "Client" && item._id !== localStorage.getItem("jwt")
            )
          );
        });
    }
  }, []);

  const filteredPsychologists = psychologists.filter((psychologist) =>
    psychologist.fullname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectUser = (idUser) => {
    if (window.confirm("Do you want to chat with this Psychologist?")) {
      fetch("http://localhost:3003/accessChat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({ userid: idUser }),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.error) {
            alert("There is a problem");
          } else {
            setTochatlist(true);
            navigate("/chat");
          }
        });
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6 flex justify-center">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center text-green-600 mb-6">
          Psychologist / Therapist Directory
        </h1>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {filteredPsychologists.length > 0 ? (
            <ul>
              {filteredPsychologists.map((psychologist) => (
                <li
                  key={psychologist._id}
                  className="p-5 border-b border-gray-200 flex justify-between items-center flex-wrap hover:bg-gray-50"
                >
                  <button className="flex items-center gap-4 focus:outline-none">
                    <div className="w-12 h-12 bg-green-100 text-green-800 font-bold rounded-full flex items-center justify-center">
                      Dr.
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">
                        {psychologist.fullname.toUpperCase()}
                      </h2>
                      <p className="text-gray-600">Psychologist</p>
                    </div>
                  </button>
                  <button
                    onClick={() => handleSelectUser(psychologist._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                  >
                    Chat
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="p-6 text-gray-500 text-center">No Psychologists found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PsychologistDirectory;