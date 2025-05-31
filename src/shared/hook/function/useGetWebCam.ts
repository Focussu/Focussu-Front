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
  videoRef: React.RefObject<HTMLVideoElement | null>,
  imgRef: React.RefObject<HTMLImageElement | null>
) => {
  const video = videoRef.current;
  const img = imgRef.current;
  if (!video || !img) return;

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
      const url = URL.createObjectURL(blob);

      uploadToServer(blob);

      img.src = url;
    };

    setInterval(captureFrame, 10000);
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

export const uploadToServer = async (blob: Blob) => {
  const file = new File([blob], "capture.jpg", { type: "image/jpg" });
  const formData = new FormData();
  formData.append("file", file);

  try {
    // // const response = await fetch(
    // //   `${process.env.NEXT_PUBLIC_AI_SERVER_URL}/predict/face`,
    // //   {
    // //     method: "POST",
    // //     body: formData,
    // //   }
    // // );
    // console.log("업로드 성공");
    // console.log(response.json());
  } catch (err) {
    console.error("업로드 실패:", err);
  }
};
