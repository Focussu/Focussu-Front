"use client";

import WelcomeMessage from "@/shared/component/MainView/WelcomeMessage";
import TodayFocusTime from "@/shared/component/MainView/TodayFocusTime";
import RecommendLists from "@/shared/component/MainView/RecommendLists";
import NewStudyRecommend from "@/shared/component/MainView/NewStudy";
import CurrentStudy from "@/shared/component/MainView/CurrentStudy";
import Footer from "@/shared/component/Footer";

import { useUserStore } from "@/shared/store/setUserStore";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Home() {
  const [current, setCurrent] = useState(0);
  const { user } = useUserStore();

  const slides = [
    {
      id: 1,
      content: (
        <div className="w-full flex flex-col md:flex-row gap-[clamp(24px,4vw,64px)] items-center justify-center">
          <WelcomeMessage />
          <TodayFocusTime />
        </div>
      ),
    },
    {
      id: 2,
      content: (
        <div className="w-full text-center flex flex-col items-center justify-center">
          <div className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span>{user?.name}</span> 님을 위한 추천 스터디
          </div>
          <div className="flex justify-center">
            <RecommendLists />
          </div>
        </div>
      ),
    },
    {
      id: 3,
      content: (
        <div className="w-full flex gap-4 justify-between items-between">
          <NewStudyRecommend />
          <CurrentStudy />
        </div>
      ),
    },
  ];

  const prev = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="h-[calc(100vh-180px)] flex flex-col">
      <div className="flex-grow flex justify-center items-center relative px-4 md:px-12 xl:px-24">
        <div className="w-full h-full flex items-center justify-center overflow-hidden">
          <div className="max-h-full scale-[0.95] transition-all duration-500 ease-in-out w-full">
            {slides[current].content}
          </div>
        </div>

        <button
          onClick={prev}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 p-2 bg-gray-200 rounded-full"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={next}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 p-2 bg-gray-200 rounded-full"
        >
          <ChevronRight />
        </button>
      </div>

      <footer className="h-[40px] shrink-0">
        <Footer />
      </footer>
    </div>
  );
}
