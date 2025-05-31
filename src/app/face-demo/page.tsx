"use client";

import React from "react";
import FaceLandmarkerWebcam from "@/shared/component/FaceLandmarkerWebcam";

export default function FaceDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            MediaPipe Face Landmarker 데모
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            실시간으로 얼굴 랜드마크와 블렌드셰이프를 감지하고 시각화합니다.
            웹캠을 시작한 후 "얼굴 감지 시작" 버튼을 클릭하세요.
            블렌드셰이프 데이터는 막대 그래프와 히트맵으로 표시됩니다.
          </p>
        </div>

        {/* 기능 설명 */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-2xl mb-3">🎯</div>
            <h3 className="text-lg font-semibold mb-2">실시간 얼굴 감지</h3>
            <p className="text-gray-600 text-sm">
              MediaPipe를 사용하여 실시간으로 얼굴을 감지하고 468개의 랜드마크를 추출합니다.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-2xl mb-3">📊</div>
            <h3 className="text-lg font-semibold mb-2">블렌드셰이프 분석</h3>
            <p className="text-gray-600 text-sm">
              얼굴 표정을 52개의 블렌드셰이프로 분석하여 감정 상태를 파악합니다.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-2xl mb-3">📈</div>
            <h3 className="text-lg font-semibold mb-2">시각화</h3>
            <p className="text-gray-600 text-sm">
              막대 그래프와 히트맵으로 블렌드셰이프 강도를 직관적으로 표시합니다.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-2xl mb-3">🔄</div>
            <h3 className="text-lg font-semibold mb-2">서버 전송</h3>
            <p className="text-gray-600 text-sm">
              감지된 데이터를 주기적으로 서버에 전송하여 추가 분석을 수행합니다.
            </p>
          </div>
        </div>

        {/* 메인 컴포넌트 */}
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <FaceLandmarkerWebcam 
              className="w-full"
              showControls={true}
              autoStart={false}
            />
          </div>
        </div>

        {/* 사용 방법 */}
        <div className="max-w-4xl mx-auto mt-8 grid md:grid-cols-2 gap-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">사용 방법</h3>
            <ol className="list-decimal list-inside space-y-2 text-blue-800">
              <li>브라우저에서 카메라 접근 권한을 허용하세요.</li>
              <li>"웹캠 시작" 버튼을 클릭하여 카메라를 활성화하세요.</li>
              <li>"얼굴 감지 시작" 버튼을 클릭하여 실시간 분석을 시작하세요.</li>
              <li>얼굴을 카메라 앞에 위치시키면 랜드마크가 표시됩니다.</li>
              <li>하단에서 실시간 블렌드셰이프 데이터를 확인할 수 있습니다.</li>
            </ol>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-900 mb-3">블렌드셰이프 이해하기</h3>
            <ul className="list-disc list-inside space-y-2 text-green-800">
              <li><strong>막대 그래프:</strong> 가장 활성화된 상위 12개 블렌드셰이프</li>
              <li><strong>히트맵:</strong> 모든 블렌드셰이프의 강도를 색상으로 표시</li>
              <li><strong>통계:</strong> 활성 블렌드셰이프 수와 평균/최대 강도</li>
              <li><strong>색상 코드:</strong> 회색(낮음) → 파랑(보통) → 노랑(높음) → 빨강(매우 높음)</li>
              <li><strong>업데이트 속도:</strong> 5fps로 조절되어 변화를 명확하게 관찰 가능</li>
            </ul>
          </div>
        </div>

        {/* 기술 정보 */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="bg-gray-100 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">기술 스택 및 블렌드셰이프 정보</h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <strong className="text-gray-900">프론트엔드:</strong>
                <ul className="mt-2 text-gray-600 space-y-1">
                  <li>• React 19</li>
                  <li>• Next.js 15</li>
                  <li>• TypeScript</li>
                  <li>• Tailwind CSS</li>
                </ul>
              </div>
              <div>
                <strong className="text-gray-900">AI/ML:</strong>
                <ul className="mt-2 text-gray-600 space-y-1">
                  <li>• MediaPipe Tasks Vision</li>
                  <li>• Face Landmarker</li>
                  <li>• WebAssembly</li>
                  <li>• GPU 가속</li>
                </ul>
              </div>
              <div>
                <strong className="text-gray-900">블렌드셰이프:</strong>
                <ul className="mt-2 text-gray-600 space-y-1">
                  <li>• 52개 표정 요소</li>
                  <li>• 실시간 강도 측정</li>
                  <li>• 시각적 피드백</li>
                  <li>• 서버 전송 지원</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 주요 블렌드셰이프 설명 */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">주요 블렌드셰이프 설명</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div className="p-3 bg-gray-50 rounded">
                <strong>Eye_Blink (눈 깜빡임)</strong>
                <p className="text-gray-600 mt-1">눈을 감는 정도를 측정합니다.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <strong>Mouth_Smile (미소)</strong>
                <p className="text-gray-600 mt-1">입꼬리가 올라가는 정도를 측정합니다.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <strong>Jaw_Open (입 벌리기)</strong>
                <p className="text-gray-600 mt-1">턱이 벌어지는 정도를 측정합니다.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <strong>Brow_Up (눈썹 올리기)</strong>
                <p className="text-gray-600 mt-1">눈썹이 올라가는 정도를 측정합니다.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <strong>Cheek_Puff (볼 부풀리기)</strong>
                <p className="text-gray-600 mt-1">볼이 부풀어 오르는 정도를 측정합니다.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <strong>Nose_Sneer (코 찡그리기)</strong>
                <p className="text-gray-600 mt-1">코 주변 근육의 움직임을 측정합니다.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 