import "./styles.css";
import VideoRecorder from "react-video-recorder";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function App() {
  const [videoBlob, setVideoBlob] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (videoBlob) {
      navigate("/preview"); // Navigate to the preview page when videoBlob is set
    }
  }, [videoBlob, navigate]);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div style={{ width: "100%", maxWidth: 480, height: 640 }}>
                <VideoRecorder
                  isFlipped={false}
                  countdownTime={4000}
                  mimeType="video/webm;codecs=vp8,opus"
                  constraints={{
                    audio: true,
                    video: {
                      width: { exact: 480, ideal: 480 },
                      height: { exact: 640, ideal: 640 },
                      aspectRatio: { exact: 0.7500000001, ideal: 0.7500000001 },
                      resizeMode: "crop-and-scale",
                    },
                  }}
                  onRecordingComplete={(e) => {
                    setVideoBlob(e);
                  }}
                />
              </div>
            </>
          }
        />
        <Route
          path="/preview"
          element={
            <>
              <div style={{ width: "100%", maxWidth: 480, height: 640 }}>
                {videoBlob && (
                  <video
                    src={URL.createObjectURL(videoBlob)}
                    width={480}
                    height={640}
                    autoPlay
                    loop
                    controls
                  />
                )}
              </div>
            </>
          }
        />
      </Routes>
    </div>
  );
}
