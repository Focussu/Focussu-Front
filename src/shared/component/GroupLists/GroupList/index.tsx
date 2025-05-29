import React from "react";
import ListImage from "@/shared/component/ListImage";

interface GroupListProps {
  room: {
    id: number;
    name: string;
    description: string;
    maxCapacity: number;
    profileImageUrl: string;
  };
  handleOpen: () => void;
}

export default function GroupList({ room, handleOpen }: GroupListProps) {
  return (
    <div
      className="flex flex-col w-full max-w-[320px] cursor-pointer mx-auto gap-5"
      onClick={handleOpen}
    >
      <ListImage image={room?.profileImageUrl} />
      <div className="flex flex-col gap-1">
        <div className="text-[clamp(16px,1.8vw,22px)] font-semibold truncate">
          {room?.name}
        </div>
        <div className="text-[clamp(13px,1.6vw,18px)] text-gray-600 truncate">
          {room?.description}
        </div>
        <div className="text-[clamp(13px,1.5vw,18px)] text-gray-500">
          정원 : {room?.maxCapacity}
        </div>
      </div>
    </div>
  );
}
