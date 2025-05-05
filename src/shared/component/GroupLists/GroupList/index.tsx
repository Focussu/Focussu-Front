import React from "react";
import ListImage from "@/shared/component/ListImage";

interface GroupListProps {
  handleOpen: () => void;
}

export default function GroupList({ handleOpen }: GroupListProps) {
  return (
    <div
      className="flex flex-col w-full min-w-[clamp(300px,25vw,400px)] cursor-pointer"
      onClick={handleOpen}
    >
      <ListImage />
      <div className="mt-[clamp(12px,1.5vw,20px)] text-[clamp(16px,1.8vw,22px)] font-semibold">
        JavaScript 공부해요
      </div>
      <div className="text-[clamp(13px,1.6vw,18px)] text-gray-600 truncate">
        아무것도 몰라도 괜찮습니다!
      </div>
      <div className="text-[clamp(13px,1.5vw,18px)] text-gray-500">
        총 인원 : 45 / 50
      </div>
    </div>
  );
}
