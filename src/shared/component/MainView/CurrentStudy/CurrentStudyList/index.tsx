import React from "react";
import { HitSuccessStudyRoomResponse } from "@/shared/type/forAPI/RoomType";

type Props = {
  room: HitSuccessStudyRoomResponse;
};

export default function CurrentStudyList({ room }: Props) {
  const truncateDescription = (desc: string) => {
    return desc.length > 20 ? desc.slice(0, 20) + "..." : desc;
  };

  return (
    <div className="w-full max-w-[clamp(320px,50vw,740px)] flex flex-col text-[clamp(16px,1.5vw,24px)] gap-[clamp(4px,1vw,10px)]">
      <div className="text-black font-semibold">{room.name}</div>
      <div className="text-gray-400 truncate">
        {truncateDescription(room.description)}
      </div>
      <div className="text-gray-500 mb-[clamp(24px,4vw,48px)]">
        정원 : {room.maxCapacity}
      </div>
    </div>
  );
}
