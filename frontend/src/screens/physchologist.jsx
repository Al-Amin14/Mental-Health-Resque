import React, { useState } from "react";

const PhyschologistDirectory = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const Physchologists = [
    { id: 1, name: "Dr. Alice Johnson", specialty: "Child Psychology" },
    { id: 2, name: "Dr. Brian Lee", specialty: "Cognitive Behavioral Therapy" },
    { id: 3, name: "Dr. Clara Smith", specialty: "Anxiety and Depression" },
    { id: 4, name: "Dr. David Brown", specialty: "Trauma Therapy" },
  ];

  const filteredPhyschologists = Physchologists.filter((Physchologist) =>
    Physchologist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-green-600 mb-8 ">Physchologist / Therapist Directory</h1>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name"
            className="w-full p-3 border drop-shadow-[0_1px_10px_rgba(26,77,23,0.77)] border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2  focus:ring-blue-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="bg-white shadow-xl rounded-lg">
          {filteredPhyschologists.length > 0 ? (
            <ul >
              {filteredPhyschologists.map((Physchologist) => (
                <li
                  key={Physchologist.id}
                  className="p-5 border-b font-bold border-2 border-green-100 hover:bg-gray-50 flex items-start gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-green-800 font-extrabold rounded-full flex items-center justify-center">
                    {Physchologist.name[0]}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">{Physchologist.name}</h2>
                    <p className="text-gray-600">{Physchologist.specialty}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="p-6 text-gray-500 text-center">No Physchologists found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhyschologistDirectory;