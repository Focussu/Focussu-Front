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
  const isDetectionActiveRef = useRef<boolean>(false);
  
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

  // isDetectionActive 상태를 ref로 동기화
  useEffect(() => {
    isDetectionActiveRef.current = isDetectionActive;
  }, [isDetectionActive]);

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
    setIsDetectionActive(prev => {
      const newState = !prev;
      
      // 감지를 중단할 때 캔버스 클리어 및 애니메이션 프레임 취소
      if (!newState) {
        if (canvasRef.current) {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
          }
        }
        
        // 애니메이션 프레임 취소
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
      }
      
      return newState;
    });
  }, []);

  // 실시간 얼굴 감지 및 시각화
  const detectAndDraw = useCallback(() => {
    // ref를 사용하여 최신 상태 확인
    if (!isDetectionActiveRef.current || !faceLandmarker || !videoRef.current || !canvasRef.current) {
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
    
    if (!lastDetection || now - parseInt(lastDetection) > 50) {
      const results = detectFace(video);
      
      if (results) {
        setLastResults(results);
        
        // 랜드마크 그리기
        drawLandmarks(canvas, results);
        
        // 주기적으로 서버에 데이터 전송 (1초마다) - 감지가 활성화된 경우에만
        if (isDetectionActiveRef.current) {
          const lastSent = sessionStorage.getItem('lastLandmarkSent');
          if (!lastSent || now - parseInt(lastSent) > 1000) {
            sendLandmarksToServer(results);
            sessionStorage.setItem('lastLandmarkSent', now.toString());
          }
        }
        
        sessionStorage.setItem('lastDetection', now.toString());
      }
    }

    // 감지가 활성화된 경우에만 다음 프레임 요청
    if (isDetectionActiveRef.current) {
      setTimeout(() => {
        if (isDetectionActiveRef.current) { // 한 번 더 체크
          animationFrameRef.current = requestAnimationFrame(detectAndDraw);
        }
      }, 66); // 약 15fps
    }
  }, [faceLandmarker, detectFace, drawLandmarks, sendLandmarksToServer]);

  // 감지 루프 시작/중지
  useEffect(() => {
    if (isDetectionActive && faceLandmarker) {
      // 기존 애니메이션 프레임이 있다면 취소
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      detectAndDraw();
    } else if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
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