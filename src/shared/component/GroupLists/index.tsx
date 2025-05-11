import React from "react";
import GroupList from "@/shared/component/GroupLists/GroupList";

interface GroupListsProps {
  handleOpen: () => void;
}

export default function GroupLists({ handleOpen }: GroupListsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[clamp(20px,4vw,48px)] px-[clamp(16px,5vw,80px)]">
      {Array.from({ length: 6 }).map((_, idx) => (
        <GroupList key={idx} handleOpen={handleOpen} />
      ))}
    </div>
  );
}
