"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useFaceLandmarker, FaceLandmarkResult } from "./useFaceLandmarker";

export interface UseWebCamWithFaceLandmarkerReturn {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  isWebcamActive: boolean;
  isLandmarkerLoading: boolean;
  error: string | null;
  startWebcam: () => Promise<void>;
  stopWebcam: () => void;
  toggleLandmarkDetection: () => void;
  isDetectionActive: boolean;
  lastResults: FaceLandmarkResult | null;
}

export const useWebCamWithFaceLandmarker = (): UseWebCamWithFaceLandmarkerReturn => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [isDetectionActive, setIsDetectionActive] = useState(false);
  const [lastResults, setLastResults] = useState<FaceLandmarkResult | null>(null);
  
  const {
    faceLandmarker,
    isLoading: isLandmarkerLoading,
    error,
    detectFace,
    drawLandmarks,
    sendLandmarksToServer
  } = useFaceLandmarker();

  // 웹캠 시작
  const startWebcam = useCallback(async () => {
    try {
      if (!navigator.mediaDevices) {
        throw new Error("Media devices not supported");
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user"
        },
        audio: false
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsWebcamActive(true);
      }
    } catch (err) {
      console.error("웹캠 시작 실패:", err);
    }
  }, []);

  // 웹캠 중지
  const stopWebcam = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    setIsWebcamActive(false);
    setIsDetectionActive(false);
  }, []);

  // 랜드마크 감지 토글
  const toggleLandmarkDetection = useCallback(() => {
    setIsDetectionActive(prev => !prev);
  }, []);

  // 실시간 얼굴 감지 및 시각화
  const detectAndDraw = useCallback(() => {
    if (!isDetectionActive || !faceLandmarker || !videoRef.current || !canvasRef.current) {
      animationFrameRef.current = requestAnimationFrame(detectAndDraw);
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;

    // 캔버스 크기를 비디오 크기에 맞춤
    if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    }

    // 얼굴 감지 (200ms마다 실행하여 속도 조절)
    const now = Date.now();
    const lastDetection = sessionStorage.getItem('lastDetection');
    
    if (!lastDetection || now - parseInt(lastDetection) > 200) {
      const results = detectFace(video);
      
      if (results) {
        setLastResults(results);
        
        // 랜드마크 그리기
        drawLandmarks(canvas, results);
        
        // 주기적으로 서버에 데이터 전송 (5초마다)
        const lastSent = sessionStorage.getItem('lastLandmarkSent');
        if (!lastSent || now - parseInt(lastSent) > 5000) {
          sendLandmarksToServer(results);
          sessionStorage.setItem('lastLandmarkSent', now.toString());
        }
        
        sessionStorage.setItem('lastDetection', now.toString());
      }
    }

    // 더 천천히 요청 (약 30fps 대신 15fps)
    setTimeout(() => {
      animationFrameRef.current = requestAnimationFrame(detectAndDraw);
    }, 66); // 약 15fps
  }, [isDetectionActive, faceLandmarker, detectFace, drawLandmarks, sendLandmarksToServer]);

  // 감지 루프 시작/중지
  useEffect(() => {
    if (isDetectionActive && faceLandmarker) {
      detectAndDraw();
    } else if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isDetectionActive, faceLandmarker, detectAndDraw]);

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      stopWebcam();
    };
  }, [stopWebcam]);

  return {
    videoRef,
    canvasRef,
    isWebcamActive,
    isLandmarkerLoading,
    error,
    startWebcam,
    stopWebcam,
    toggleLandmarkDetection,
    isDetectionActive,
    lastResults
  };
}; 