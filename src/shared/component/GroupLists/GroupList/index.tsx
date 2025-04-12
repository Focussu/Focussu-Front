import React from "react";
import ListImage from "@/shared/component/ListImage";

export default function GroupList() {
  return (
    <div className="flex flex-col ">
      <ListImage />
      <div className="mt-[24px] text-[24px] font-semibold">
        JavaScript 잡아라
      </div>
      <div className="text-[18px] text-gray-600">잡아라-----!</div>
      <div className="text-[18px]">총 인원 : 45/50</div>
    </div>
  );
}
