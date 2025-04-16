export interface StreamInterface {
  stream: MediaStream;
}

export const startCam = async (): Promise<StreamInterface> => {
  if (!navigator.mediaDevices) {
    throw new Error("Media devices not supported");
  }

  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });

  stream.getAudioTracks()[0].enabled = true;

  return { stream };
};

export const initCam = async (
  videoRef: React.RefObject<HTMLVideoElement | null>
): Promise<void> => {
  try {
    const { stream } = await startCam();

    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  } catch (error) {
    console.error("Webcam init error:", error);
  }
};

export const captureCam = (
  videoRef: React.RefObject<HTMLVideoElement | null>
) => {
  const video = videoRef.current;
  if (!video) return;

  const handleLoadedMetadata = () => {
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const captureFrame = () => {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/png");
      const blob = base64ToBlob(imageData);
      console.log("Captured image:", blob);
    };

    setInterval(captureFrame, 3000);
  };

  video.addEventListener("loadedmetadata", handleLoadedMetadata);
};

export const base64ToBlob = (base64Data: string): Blob => {
  const parts = base64Data.split(";base64,");
  const mime = parts[0].split(":")[1];
  const byteString = atob(parts[1]);
  const arrayBuffer = new Uint8Array(byteString.length);

  for (let i = 0; i < byteString.length; i++) {
    arrayBuffer[i] = byteString.charCodeAt(i);
  }

  return new Blob([arrayBuffer], { type: mime });
};
