import React, { useState, useRef, useEffect } from 'react';

const BrowserRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [videoURL, setVideoURL] = useState('');
  const [cameraStatus, setCameraStatus] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const [displayStream, setDisplayStream] = useState(null);
  const mediaRecorderRef = useRef(null);
  const chunks = useRef([]);
  const cameraVideoRef = useRef(null);

  const startRecording = async () => {
    try {
      // Get display media stream
      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          cursor: 'always',
          displaySurface: 'monitor',
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
        const blob = new Blob(chunks.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setVideoURL(url);
        chunks.current = [];
      };

      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (err) {
      console.error('Error accessing display or user media.', err);
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
    <div>
      <h1>Interview Page</h1>
      <div>
        {recording ? (
          <button onClick={stopRecording}>Stop Interview</button>
        ) : (
          <button onClick={startRecording}>Start Interview</button>
        )}
      </div>
      {videoURL && (
        <div>
          <h2>Recorded Video</h2>
          <video src={videoURL} controls style={{ width: '60%' }} />
        </div>
      )}
      {cameraStream && cameraStatus && (
        <video
          ref={cameraVideoRef}
          autoPlay
          style={{
            position: 'fixed',
            bottom: '10px',
            right: '10px',
            width: '200px',
            height: '150px',
            border: '2px solid black',
          }}
        />
      )}
    </div>
  );
};

export default BrowserRecorder;
