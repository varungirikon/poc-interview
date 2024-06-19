import React, { useState, useRef, useEffect } from "react";

const BrowserRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [videoURL, setVideoURL] = useState("");
  const [cameraStatus, setCameraStatus] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const [displayStream, setDisplayStream] = useState(null);
  const [showNote, setShowNote] = useState(true);
  const mediaRecorderRef = useRef(null);
  const chunks = useRef([]);
  const cameraVideoRef = useRef(null);

  const startRecording = async () => {
    try {
      setShowNote(false);
      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          cursor: "always",
          displaySurface: "monitor",
        },
        audio: true,
      });
      setDisplayStream(displayStream);

      // Get user media (camera) stream
      const camStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setCameraStatus(true);
      setCameraStream(camStream);

      // Combine both streams
      const combinedStream = new MediaStream([
        ...displayStream.getVideoTracks(),
        ...camStream.getVideoTracks(),
        ...displayStream.getAudioTracks(), // Ensure both streams' audio is included
        ...camStream.getAudioTracks(),
      ]);

      mediaRecorderRef.current = new MediaRecorder(combinedStream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks.current, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        setVideoURL(url);
        chunks.current = [];
      };

      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (err) {
      console.error("Error accessing display or user media.", err);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
    setCameraStatus(false);

    // Stop all tracks in the display and camera streams
    if (displayStream) {
      displayStream.getTracks().forEach((track) => track.stop());
      setDisplayStream(null);
    }
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
  };

  useEffect(() => {
    if (cameraVideoRef.current && cameraStream) {
      cameraVideoRef.current.srcObject = cameraStream;
      // Mute the video element to prevent audio feedback
      cameraVideoRef.current.muted = true;
    }
  }, [cameraStream]);

  return (
    <div className=" w-full bg-gradient-to-r from-blue-500 to-purple-600 flex min-h-screen">
      <div className="flex flex-col w-full">
        <div className="flex w-full justify-between items-center px-4 py-2">
          <h1 className="text-left text-4xl font-bold text-gray-900 p-2">
            Interview Page
          </h1>
          <div>
            {recording ? (
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={stopRecording}
              >
                Stop Interview
              </button>
            ) : (
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={startRecording}
              >
                Start Interview
              </button>
            )}
          </div>
        </div>
        {videoURL && (
          <div className="w-full px-[20%] mt-6">
            <div className="border border-gray-300 rounded-lg p-6">
              <h3 className="text-2xl font-semibold mb-4 ml-2">
                Interview Recording
              </h3>
              <div className="overflow-hidden rounded-lg">
                <video src={videoURL} controls className="w-full h-auto" />
              </div>
            </div>
          </div>
        )}
        {cameraStream && cameraStatus && (
          <video
            ref={cameraVideoRef}
            autoPlay
            style={{
              position: "fixed",
              bottom: "10px",
              right: "10px",
              width: "200px",
              height: "150px",
              border: "2px solid black",
            }}
          />
        )}
        {showNote && (
          <div className="w-full px-[20%] mt-6">
            <div className="border border-gray-300 rounded-lg p-6">
              <h3 className="text-2xl font-semibold mb-4 ml-2">Notes</h3>
              <ul className="list-decimal list-inside text-lg text-left ml-6">
                <li>Check Camera and Microphone</li>
                <li>Prepare Your Environment</li>
                <li>Review Interview Questions</li>
                <li>Dress Appropriately</li>
                <li>Test Your Internet Connection</li>
                <li>Gather Necessary Documents</li>
                <li>Body Language and Eye Contact</li>
                <li>Technical Setup</li>
                <li>Review the Job Description</li>
                <li>Prepare Questions for the Interviewer</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowserRecorder;
