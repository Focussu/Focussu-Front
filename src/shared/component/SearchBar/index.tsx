import React from "react";
import Image from "next/image";

export default function SearchBar() {
  return (
    <div className="w-[460px] h-[36px] border-[2px] border-gray-400 rounded-4xl flex justify-between ">
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        className="border-none text-[14px] w-[380px] ml-[25px] focus:outline-none focus:ring-0 focus:border-transparent"
      />
      <Image
        className="dark:invert mr-[17px]"
        src="/searchIcon.svg"
        alt="SearchIcon"
        width={20}
        height={20}
        priority
      />
    </div>
  );
}
