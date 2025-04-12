import React from "react";
import GroupList from "@/shared/component/GroupLists/GroupList";

interface GroupListsProps {
  handleOpen: () => void;
}

export default function GroupLists({ handleOpen }: GroupListsProps) {
  return (
    <div>
      <div className="flex flex-row gap-[81px]">
        <GroupList handleOpen={handleOpen} />
        <GroupList handleOpen={handleOpen} />
        <GroupList handleOpen={handleOpen} />
      </div>
      <div className="flex flex-row gap-[81px] mt-[32px]">
        <GroupList handleOpen={handleOpen} />
        <GroupList handleOpen={handleOpen} />
        <GroupList handleOpen={handleOpen} />
      </div>
    </div>
  );
}
