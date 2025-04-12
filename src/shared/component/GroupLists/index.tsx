import React from "react";
import GroupList from "@/shared/component/GroupLists/GroupList";

export default function GroupLists() {
  return (
    <div>
      <div className="flex flex-row gap-[81px]">
        <GroupList />
        <GroupList />
        <GroupList />
      </div>
      <div className="flex flex-row gap-[81px] mt-[32px]">
        <GroupList />
        <GroupList />
        <GroupList />
      </div>
    </div>
  );
}
