import React, { useEffect, useState } from "react";

export default function CodingTest() {
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState("MCQ");

  useEffect(() => {
    const userDataFromLocalStorage = localStorage.getItem("userData");
    if (userDataFromLocalStorage) {
      setUserData(JSON.parse(userDataFromLocalStorage));
    }
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-full">
      {userData && (
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            {/* User image */}
            <img
              src={userData.image}
              alt="User"
              className="w-20 h-20 rounded-full mr-4"
            />
            <div>
              <h1 className="text-xl font-semibold">{userData.name}</h1>
              <p className="text-gray-600">{userData.name}</p>
            </div>
          </div>
          <div>
            <button
              className={`px-4 py-2 mr-4 focus:outline-none ${
                activeTab === "MCQ" ? "text-blue-500" : "text-gray-500"
              }`}
              onClick={() => handleTabClick("MCQ")}
            >
              MCQ
            </button>
            <button
              className={`px-4 py-2 mr-4 focus:outline-none ${
                activeTab === "Coding" ? "text-blue-500" : "text-gray-500"
              }`}
              onClick={() => handleTabClick("Coding")}
              disabled
            >
              Coding
            </button>
            <button
              className={`px-4 py-2 mr-4 focus:outline-none ${
                activeTab === "Interview" ? "text-blue-500" : "text-gray-500"
              }`}
              onClick={() => handleTabClick("Interview")}
              disabled
            >
              Interview
            </button>
          </div>
        </div>
      )}
      <hr className="my-4" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* MCQ card */}
        <div
          className={`bg-white rounded-md p-6 ${
            activeTab === "MCQ" ? "border border-blue-500" : ""
          }`}
        >
          <h2 className="text-lg font-semibold mb-4">MCQ Test</h2>
          <p>Description of MCQ test goes here...</p>
        </div>
        {/* Coding card */}
        <div className="bg-gray-200 rounded-md p-6 opacity-50">
          <h2 className="text-lg font-semibold mb-4">Coding Test</h2>
          <p>Description of coding test goes here...</p>
        </div>
        {/* Interview card */}
        <div className="bg-gray-200 rounded-md p-6 opacity-50">
          <h2 className="text-lg font-semibold mb-4">Interview</h2>
          <p>Description of interview goes here...</p>
        </div>
      </div>
    </div>
  );
}
