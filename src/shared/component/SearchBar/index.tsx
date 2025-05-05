import React from "react";
import Image from "next/image";

export default function SearchBar() {
  return (
    <div className="w-full max-w-[clamp(300px,80vw,640px)] h-[clamp(40px,4.5vw,52px)] border-2 border-gray-400 rounded-full flex items-center px-4">
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        className="w-full text-[clamp(14px,2.5vw,16px)] placeholder-gray-400 border-none focus:outline-none bg-transparent"
      />
      <div className="ml-2">
        <Image
          className="dark:invert"
          src="/searchIcon.svg"
          alt="SearchIcon"
          width={20}
          height={20}
          priority
        />
      </div>
    </div>
  );
}
