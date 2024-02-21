import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import React from "react";

const Cast = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookId = location.state?.bookId;

  const mediaSrc =
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";
  const iframeRef = useRef(null);

  useEffect(() => {
    if (iframeRef.current) {
      const iframeWindow = iframeRef.current.contentWindow;
      iframeWindow.postMessage(mediaSrc, "*");
    }
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        border: "none",
        overflow: "hidden",
      }}
    >
      <iframe
        src="./sender.html"
        title="Full Size Iframe"
        style={{ width: "100%", height: "100%", border: "none" }}
      ></iframe>
    </div>
  );
};

export default Cast;
