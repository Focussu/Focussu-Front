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
