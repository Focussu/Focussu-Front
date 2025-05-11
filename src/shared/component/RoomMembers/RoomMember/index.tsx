import React from "react";
import Link from "next/link";

export default function RoomMember() {
  return (
    <Link
      href="/studyroom/1/1"
      className="w-full aspect-[415/225] rounded-lg bg-white flex flex-col justify-center items-center shadow-sm"
    >
      <div className="w-[65%] h-[70%] bg-gray-500 mt-4 rounded-md" />
      <div className="w-[65%] flex justify-between mt-3 mb-4 text-sm">
        <div className="flex gap-3 items-center">
          <div className="font-semibold">오승민</div>
          <div className="text-xs text-gray-600">2h 30m 20s</div>
        </div>
        <div className="px-2 py-1 text-[10px] rounded border border-gray-400">
          ✅ 현재 활동 중
        </div>
      </div>
    </Link>
  );
}
