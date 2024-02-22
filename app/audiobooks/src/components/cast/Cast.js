import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Cast = () => {
  const location = useLocation();
  const book = location.state?.book;

  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const iframeRef = useRef(null);

  useEffect(() => {
    const fetchLink = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:8000/get-audiobook/${book.id}`);
        setUrl(response?.data); // Directly set the URL received from the response
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLink();
  }, [book]);

  useEffect(() => {
    if (url !== "") {
      iframeRef.current.onload = () => {
        iframeRef.current.contentWindow.postMessage({ "url": url, "cover": book.formats?.["image/jpeg"] }, 'http://localhost:3000');
      };
    }
  }, [url, book]); // This effect depends on the url state

  if (isLoading) return (
    <div class="d-flex justify-content-center align-items-center" style={{height: "100vh"}}>
      <div class="spinner-border" role="status">
        <span class="sr-only"></span>
      </div>
      &nbsp;Converting e-book to audio-book
    </div>

  );
  if (!url) return null; // Simplified check for url

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
        ref={iframeRef} // Use ref instead of id for React component
        title="Full Size Iframe"
        style={{ width: "100%", height: "100%", border: "none" }}
      ></iframe>
    </div>
  );
};

export default Cast;
