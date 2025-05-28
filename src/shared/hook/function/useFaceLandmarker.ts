"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { FaceLandmarker, FilesetResolver, DrawingUtils } from "@mediapipe/tasks-vision";

export interface FaceLandmarkResult {
  landmarks: any[];
  blendshapes: any[];
  facialTransformationMatrixes: any[];
}

export interface UseFaceLandmarkerReturn {
  faceLandmarker: FaceLandmarker | null;
  isLoading: boolean;
  error: string | null;
  detectFace: (video: HTMLVideoElement) => FaceLandmarkResult | null;
  drawLandmarks: (canvas: HTMLCanvasElement, results: FaceLandmarkResult) => void;
  sendLandmarksToServer: (results: FaceLandmarkResult) => Promise<void>;
}

export const useFaceLandmarker = (): UseFaceLandmarkerReturn => {
  const [faceLandmarker, setFaceLandmarker] = useState<FaceLandmarker | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const drawingUtilsRef = useRef<DrawingUtils | null>(null);

  // MediaPipe Face Landmarker 초기화
  useEffect(() => {
    const initializeFaceLandmarker = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // FilesetResolver를 사용하여 WASM 파일 로드
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );

        // Face Landmarker 생성
        const landmarker = await FaceLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
            delegate: "GPU"
          },
          runningMode: "VIDEO",
          numFaces: 1,
          outputFaceBlendshapes: true,
          outputFacialTransformationMatrixes: true
        });

        setFaceLandmarker(landmarker);
        setIsLoading(false);
      } catch (err) {
        console.error("Face Landmarker 초기화 실패:", err);
        setError(err instanceof Error ? err.message : "초기화 실패");
        setIsLoading(false);
      }
    };

    initializeFaceLandmarker();
  }, []);

  // 얼굴 감지 함수
  const detectFace = useCallback((video: HTMLVideoElement): FaceLandmarkResult | null => {
    if (!faceLandmarker || !video) return null;

    try {
      const timestamp = performance.now();
      const results = faceLandmarker.detectForVideo(video, timestamp);
      
      return {
        landmarks: results.faceLandmarks || [],
        blendshapes: results.faceBlendshapes || [],
        facialTransformationMatrixes: results.facialTransformationMatrixes || []
      };
    } catch (err) {
      console.error("얼굴 감지 실패:", err);
      return null;
    }
  }, [faceLandmarker]);

  // 랜드마크 그리기 함수
  const drawLandmarks = useCallback((canvas: HTMLCanvasElement, results: FaceLandmarkResult) => {
    if (!results.landmarks.length) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 캔버스 초기화
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // DrawingUtils 초기화 (한 번만)
    if (!drawingUtilsRef.current) {
      drawingUtilsRef.current = new DrawingUtils(ctx);
    }

    const drawingUtils = drawingUtilsRef.current;

    // 각 얼굴에 대해 랜드마크 그리기
    results.landmarks.forEach((landmarks) => {
      // 얼굴 윤곽선 그리기
      drawingUtils.drawConnectors(
        landmarks,
        FaceLandmarker.FACE_LANDMARKS_FACE_OVAL,
        { color: "#E0E0E0", lineWidth: 1 }
      );

      // 눈 그리기
      drawingUtils.drawConnectors(
        landmarks,
        FaceLandmarker.FACE_LANDMARKS_LEFT_EYE,
        { color: "#FF3030", lineWidth: 1 }
      );
      drawingUtils.drawConnectors(
        landmarks,
        FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE,
        { color: "#30FF30", lineWidth: 1 }
      );

      // 눈썹 그리기
      drawingUtils.drawConnectors(
        landmarks,
        FaceLandmarker.FACE_LANDMARKS_LEFT_EYEBROW,
        { color: "#FF3030", lineWidth: 1 }
      );
      drawingUtils.drawConnectors(
        landmarks,
        FaceLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW,
        { color: "#30FF30", lineWidth: 1 }
      );

      // 입 그리기
      drawingUtils.drawConnectors(
        landmarks,
        FaceLandmarker.FACE_LANDMARKS_LIPS,
        { color: "#E0E0E0", lineWidth: 1 }
      );

      // 코 그리기
      drawingUtils.drawConnectors(
        landmarks,
        FaceLandmarker.FACE_LANDMARKS_CONTOURS,
        { color: "#E0E0E0", lineWidth: 1 }
      );
    });
  }, []);

  // 서버로 랜드마크 데이터 전송
  const sendLandmarksToServer = useCallback(async (results: FaceLandmarkResult) => {
    try {
      const payload = {
        landmarks: results.landmarks,
        blendshapes: results.blendshapes,
        facialTransformationMatrixes: results.facialTransformationMatrixes,
        timestamp: Date.now()
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_AI_SERVER_URL}/predict/landmarks`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(`서버 응답 오류: ${response.status}`);
      }

      const result = await response.json();
      console.log("랜드마크 데이터 전송 성공:", result);
    } catch (err) {
      console.error("랜드마크 데이터 전송 실패:", err);
    }
  }, []);

  return {
    faceLandmarker,
    isLoading,
    error,
    detectFace,
    drawLandmarks,
    sendLandmarksToServer
  };
}; 