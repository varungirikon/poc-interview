import React, { useState, useEffect } from "react";

export default function UserProfile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userDataFromLocalStorage = localStorage.getItem("userData");
    if (userDataFromLocalStorage) {
      setUserData(JSON.parse(userDataFromLocalStorage));
    }
  }, []);

  return (
    <div className="w-61  p-6 border border-gray-300 bg-gray-300 rounded-lg shadow-lg flex flex-col justify-between items-center ml-4 h-full">
      <div className="profile-pic mb-4">
        <img
          src={userData?.image}
          alt="User Profile"
          className="w-40 h-40 rounded-full object-cover"
        />
      </div>
      <div className="user-info text-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          {userData?.userInfo?.name}
        </h2>
        <p className="text-gray-600">Full Stack Developer</p>
      </div>
    </div>
  );
}
