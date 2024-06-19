import React, { useEffect, useState } from "react";

const TrackUserActivity = () => {
  const [logs, setLogs] = useState([]);
  const [switchCount, setSwitchCount] = useState(0);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setSwitchCount((prevCount) => prevCount + 1);
        setLogs((prevLogs) => [
          ...prevLogs,
          `${new Date().toLocaleTimeString()} - User switched to another tab`,
        ]);
      } else {
        setLogs((prevLogs) => [
          ...prevLogs,
          `${new Date().toLocaleTimeString()} - User is back on this tab`,
        ]);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    if (document.hidden) {
      setLogs((prevLogs) => [
        ...prevLogs,
        `${new Date().toLocaleTimeString()} - User switched to another tab`,
      ]);
    }

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div>
      <p>Switch tabs and check the logs.</p>
      <p>Tab switches: {switchCount}</p>
      <div
        id="log"
        style={{
          marginTop: "20px",
          padding: "10px",
          border: "1px solid #ddd",
          maxHeight: "200px",
          overflowY: "auto",
        }}
      >
        {logs.map((log, index) => (
          <div key={index}>{log}</div>
        ))}
      </div>
    </div>
  );
};

export default TrackUserActivity;
