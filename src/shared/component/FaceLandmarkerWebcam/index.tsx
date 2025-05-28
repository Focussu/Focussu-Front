"use client";

import React, { useEffect } from "react";
import { useWebCamWithFaceLandmarker } from "@/shared/hook/function/useWebCamWithFaceLandmarker";
import BlendshapeVisualizer from "@/shared/component/BlendshapeVisualizer";

interface FaceLandmarkerWebcamProps {
  className?: string;
  showControls?: boolean;
  autoStart?: boolean;
}

export default function FaceLandmarkerWebcam({
  className = "",
  showControls = true,
  autoStart = false
}: FaceLandmarkerWebcamProps) {
  const {
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
  } = useWebCamWithFaceLandmarker();

  // 자동 시작 옵션
  useEffect(() => {
    if (autoStart) {
      startWebcam();
    }
  }, [autoStart, startWebcam]);

  const handleStartWebcam = async () => {
    await startWebcam();
  };

  const handleStopWebcam = () => {
    stopWebcam();
  };

  const handleToggleDetection = () => {
    toggleLandmarkDetection();
  };

  return (
    <div className={`face-landmarker-webcam ${className}`}>
      {/* 상태 표시 */}
      <div className="status-bar mb-4 p-3 bg-gray-100 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`w-3 h-3 rounded-full ${isWebcamActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-sm font-medium">
              웹캠: {isWebcamActive ? '활성' : '비활성'}
            </span>
            
            {isDetectionActive && (
              <span className="text-sm text-green-600 flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                감지 중 (5fps - 부드러운 시각화)
              </span>
            )}
            
            {isLandmarkerLoading && (
              <span className="text-sm text-blue-600">MediaPipe 로딩 중...</span>
            )}
            
            {error && (
              <span className="text-sm text-red-600">오류: {error}</span>
            )}
          </div>
          
          {lastResults && (
            <div className="text-sm text-gray-600">
              감지된 얼굴: {lastResults.landmarks.length}개
            </div>
          )}
        </div>
      </div>

      {/* 비디오 및 캔버스 컨테이너 */}
      <div className="video-container relative bg-black rounded-lg overflow-hidden">
        {/* 웹캠 비디오 */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-auto"
          style={{ transform: 'scaleX(-1)' }} // 거울 효과
        />
        
        {/* 랜드마크 오버레이 캔버스 */}
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{ transform: 'scaleX(-1)' }} // 거울 효과
        />
        
        {/* 웹캠이 비활성일 때 플레이스홀더 */}
        {!isWebcamActive && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-white">
            <div className="text-center">
              <div className="text-6xl mb-4">📷</div>
              <p className="text-lg">웹캠을 시작하세요</p>
            </div>
          </div>
        )}
      </div>

      {/* 컨트롤 버튼들 */}
      {showControls && (
        <div className="controls mt-4 flex flex-wrap gap-3 justify-center">
          {!isWebcamActive ? (
            <button
              onClick={handleStartWebcam}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              disabled={isLandmarkerLoading}
            >
              {isLandmarkerLoading ? '로딩 중...' : '웹캠 시작'}
            </button>
          ) : (
            <button
              onClick={handleStopWebcam}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              웹캠 중지
            </button>
          )}
          
          {isWebcamActive && !isLandmarkerLoading && (
            <button
              onClick={handleToggleDetection}
              className={`px-6 py-2 rounded-lg transition-colors ${
                isDetectionActive
                  ? 'bg-orange-500 text-white hover:bg-orange-600'
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              {isDetectionActive ? '감지 중지' : '얼굴 감지 시작'}
            </button>
          )}
        </div>
      )}

      {/* 블렌드셰이프 정보 표시 */}
      {lastResults && lastResults.blendshapes.length > 0 && (
        <div className="mt-6">
          <BlendshapeVisualizer 
            blendshapes={lastResults.blendshapes[0]?.categories || []}
            className="w-full"
          />
        </div>
      )}
    </div>
  );
} 