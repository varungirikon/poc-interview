import React, { useRef, useCallback, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";

export default function PhotoVerification() {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [userInfo, setUserInfo] = useState({
    name: "",
    age: "",
    experience: "",
    skills: "",
  });
  const navigate = useNavigate();
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const allFieldsFilled = Object.values(userInfo).every(
      (field) => field !== ""
    );
    setIsFormValid(allFieldsFilled && image !== null);
  }, [userInfo, image]);

  useEffect(() => {
    const preventClose = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", preventClose);

    return () => {
      window.removeEventListener("beforeunload", preventClose);
    };
  }, []);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  }, [webcamRef]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  const uploadImage = () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "your_upload_preset"); // Replace with your upload preset

    const userData = {
      image: image,
      userInfo: userInfo,
    };
    localStorage.setItem("userData", JSON.stringify(userData));
    navigate("/interview");
  };

  return (
    <div className=" w-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center min-h-screen">
      <div className="flex items-center justify-center bg-gray-100 p-5">
        <div className="w-full max-w-6xl bg-white rounded-lg shadow-md flex">
          <div className="w-4/5 flex flex-col items-center justify-center p-8 relative border-r-2 border-blue-900">
            {image == null ? (
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                onUserMedia={() => {
                  const videoElement = webcamRef.current.video;
                  if (videoElement) {
                    const preventPause = () => {
                      if (videoElement.paused) {
                        videoElement.play();
                      }
                    };
                    videoElement.addEventListener("pause", preventPause);
                  }
                }}
              />
            ) : (
              <img src={image} alt="User Image" />
            )}

            {image == null && (
              <button
                type="button"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4"
                onClick={capture}
              >
                Capture
              </button>
            )}
          </div>
          <div className="w-4/5 p-8">
            <form className="space-y-6">
              <div className="rounded-md shadow-sm">
                <div>
                  <label htmlFor="name" className="sr-only">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="off"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-2"
                    placeholder="Enter your name"
                    value={userInfo.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="age" className="sr-only">
                    Age
                  </label>
                  <input
                    id="age"
                    name="age"
                    type="number"
                    autoComplete="off"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-2"
                    placeholder="Enter your age"
                    value={userInfo.age}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="experience" className="sr-only">
                    Experience
                  </label>
                  <input
                    id="experience"
                    name="experience"
                    type="text"
                    autoComplete="off"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-2"
                    placeholder="Enter your experience"
                    value={userInfo.experience}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="skills" className="sr-only">
                    Skills
                  </label>
                  <input
                    id="skills"
                    name="skills"
                    type="text"
                    autoComplete="off"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-2"
                    placeholder="Enter your skills"
                    value={userInfo.skills}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <button
                type="button"
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  isFormValid ? "" : "opacity-50 cursor-not-allowed"
                }`}
                onClick={uploadImage}
                disabled={!isFormValid}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
