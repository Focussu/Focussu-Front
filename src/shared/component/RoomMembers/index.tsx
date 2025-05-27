"use client";

import React, { useRef, useMemo } from "react";
import MyRoom from "@/shared/component/RoomMembers/MyRoom";
import RoomMember from "@/shared/component/RoomMembers/RoomMember";
import { useWebRTCManager } from "@/shared/hook/function/adminRTC/useWebRTCManager";

export default function RoomMembers() {
  const userIdRef = useRef("user_" + Math.random().toString(36).slice(2, 8));
  console.log("userId : ", userIdRef);

  const userId = userIdRef.current;
  const SIGNAL_URL = process.env.NEXT_PUBLIC_SIGNAL_SERVER_URL!;

  const { localStream, remoteStreams } = useWebRTCManager(
    "1",
    userId,
    SIGNAL_URL
  );

  console.log("localStream : ", localStream);
  console.log("remoteStreams : ", remoteStreams);

  return (
    <div className="w-full h-full overflow-x-hidden px-4 py-6">
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(22rem,_1fr))] gap-6 sm:gap-8 lg:gap-10 w-full h-fit overflow-y-auto">
        {localStream && <MyRoom stream={localStream} />}

        {remoteStreams.map((member) => (
          <RoomMember key={member.id} stream={member.stream} />
        ))}
      </div>
    </div>
  );
}
