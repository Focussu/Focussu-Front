"use client";

import React, { useMemo } from "react";

interface BlendshapeCategory {
  categoryName: string;
  score: number;
}

interface BlendshapeVisualizerProps {
  blendshapes: BlendshapeCategory[];
  className?: string;
}

export default function BlendshapeVisualizer({ 
  blendshapes, 
  className = "" 
}: BlendshapeVisualizerProps) {
  // 성능 최적화를 위한 메모이제이션
  const processedData = useMemo(() => {
    // 블렌드셰이프를 점수로 정렬 (높은 순)
    const sortedBlendshapes = [...blendshapes].sort((a, b) => b.score - a.score);
    
    // 상위 12개만 표시
    const topBlendshapes = sortedBlendshapes.slice(0, 12);
    
    // 전체 블렌드셰이프를 6x9 그리드로 표시
    const gridBlendshapes = blendshapes.slice(0, 54);

    // 통계 계산
    const activeCount = blendshapes.filter(b => b.score > 0.3).length;
    const averageScore = blendshapes.length > 0 
      ? (blendshapes.reduce((sum, b) => sum + b.score, 0) / blendshapes.length * 100).toFixed(1)
      : 0;
    const maxScore = blendshapes.length > 0 
      ? (Math.max(...blendshapes.map(b => b.score)) * 100).toFixed(1)
      : 0;

    return {
      topBlendshapes,
      gridBlendshapes,
      activeCount,
      averageScore,
      maxScore
    };
  }, [blendshapes]);

  const getBarColor = (score: number) => {
    if (score > 0.7) return "bg-red-500";
    if (score > 0.4) return "bg-yellow-500";
    if (score > 0.2) return "bg-blue-500";
    return "bg-gray-400";
  };

  const getIntensityColor = (score: number) => {
    const intensity = Math.floor(score * 255);
    return `rgb(${intensity}, ${Math.floor(intensity * 0.8)}, ${Math.floor(intensity * 0.3)})`;
  };

  const formatBlendshapeName = (name: string) => {
    return name.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className={`blendshape-visualizer ${className}`}>
      {/* 상위 블렌드셰이프 막대 그래프 */}
      <div className="top-blendshapes mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          상위 블렌드셰이프 (점수순)
        </h3>
        <div className="space-y-3">
          {processedData.topBlendshapes.map((blendshape, index) => (
            <div key={`${blendshape.categoryName}-${index}`} className="flex items-center space-x-3">
              <div className="w-32 text-xs font-medium text-right truncate">
                {formatBlendshapeName(blendshape.categoryName)}
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-5 relative overflow-hidden shadow-inner">
                <div
                  className={`h-full rounded-full transition-all duration-700 ease-in-out ${getBarColor(blendshape.score)}`}
                  style={{ 
                    width: `${blendshape.score * 100}%`,
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold text-white drop-shadow-lg transition-all duration-500">
                    {(blendshape.score * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="w-16 text-xs font-mono text-gray-600 text-center">
                {blendshape.score.toFixed(3)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 전체 블렌드셰이프 그리드 */}
      <div className="grid-blendshapes">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          전체 블렌드셰이프 히트맵
        </h3>
        <div className="grid grid-cols-6 md:grid-cols-9 lg:grid-cols-12 gap-1 mb-4">
          {processedData.gridBlendshapes.map((blendshape, index) => (
            <div
              key={`${blendshape.categoryName}-grid-${index}`}
              className="aspect-square relative border border-gray-300 rounded-md flex items-center justify-center text-xs font-bold text-white transition-all duration-500 hover:scale-105 cursor-pointer"
              style={{
                backgroundColor: getIntensityColor(blendshape.score),
                minHeight: '50px',
                transform: blendshape.score > 0.5 ? 'scale(1.05)' : 'scale(1)',
                boxShadow: blendshape.score > 0.5 ? '0 4px 8px rgba(0,0,0,0.3)' : '0 1px 3px rgba(0,0,0,0.1)',
                transition: 'all 0.6s ease-in-out'
              }}
              title={`${formatBlendshapeName(blendshape.categoryName)}: ${(blendshape.score * 100).toFixed(1)}%`}
            >
              <div className="text-center p-1">
                <div className="text-xs leading-tight mb-1" style={{
                  textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                  fontSize: '9px'
                }}>
                  {blendshape.categoryName.split('_').slice(0, 2).join('_')}
                </div>
                <div className="text-xs font-bold" style={{
                  textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
                }}>
                  {(blendshape.score * 100).toFixed(0)}%
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* 범례 */}
        <div className="legend flex flex-wrap items-center justify-center gap-4 text-xs text-gray-600 mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-400 rounded shadow-sm"></div>
            <span>낮음 (0-20%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded shadow-sm"></div>
            <span>보통 (20-40%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-500 rounded shadow-sm"></div>
            <span>높음 (40-70%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded shadow-sm"></div>
            <span>매우 높음 (70%+)</span>
          </div>
        </div>
      </div>

      {/* 실시간 통계 */}
      <div className="statistics mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="stat-card bg-blue-50 p-4 rounded-lg text-center border border-blue-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-3xl font-bold text-blue-600 mb-1 transition-all duration-500">
            {blendshapes.length}
          </div>
          <div className="text-sm text-blue-800 font-medium">총 블렌드셰이프</div>
        </div>
        
        <div className="stat-card bg-green-50 p-4 rounded-lg text-center border border-green-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-3xl font-bold text-green-600 mb-1 transition-all duration-500">
            {processedData.activeCount}
          </div>
          <div className="text-sm text-green-800 font-medium">활성 (30%+)</div>
        </div>
        
        <div className="stat-card bg-orange-50 p-4 rounded-lg text-center border border-orange-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-3xl font-bold text-orange-600 mb-1 transition-all duration-500">
            {processedData.averageScore}%
          </div>
          <div className="text-sm text-orange-800 font-medium">평균 강도</div>
        </div>
        
        <div className="stat-card bg-purple-50 p-4 rounded-lg text-center border border-purple-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-3xl font-bold text-purple-600 mb-1 transition-all duration-500">
            {processedData.maxScore}%
          </div>
          <div className="text-sm text-purple-800 font-medium">최대 강도</div>
        </div>
      </div>
    </div>
  );
} 