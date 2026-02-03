import { useEffect } from "react";

const WebcamView = ({ videoRef }) => {
  useEffect(() => {
    let stream = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480 },
          audio: false, // Explicitly disable audio to avoid permission bloat
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing webcam: ", err);
      }
    };

    startCamera();

    // CLEANUP: This stops the camera when the component is removed
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [videoRef]);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      playsInline // Essential for mobile browsers
      style={{
        width: "640px",
        height: "480px", // Explicit height prevents layout shift
        border: "2px solid cyan",
        borderRadius: "8px",
        display: "block",
      }}
    />
  );
};

export default WebcamView;