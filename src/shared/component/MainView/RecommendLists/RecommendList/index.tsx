import React from "react";
import { HitSuccessStudyRoomResponse } from "@/shared/type/forAPI/RoomType";

type Props = {
  room: HitSuccessStudyRoomResponse;
};

export default function RecommendList({ room }: Props) {
  return (
    <div className="flex flex-col w-[clamp(200px,25vw,405px)]">
      <div
        className="w-full aspect-square bg-zinc-400 rounded bg-cover bg-center"
        style={{
          backgroundImage: `url(${room.profileImageUrl})`,
        }}
      />
      <div className="text-[clamp(18px,2vw,24px)] font-bold mt-[clamp(16px,2vw,24px)] mb-[5px]">
        {room.name}
      </div>
      <div className="text-[clamp(14px,1.6vw,20px)] text-zinc-400">
        {room.description}
      </div>
      <div className="text-[clamp(14px,1.6vw,20px)] text-black">
        정원 : {room.maxCapacity}명
      </div>
    </div>
  );
}
