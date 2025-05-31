"use client";

import MyRoom from "@/shared/component/RoomMembers/MyRoom";
import RoomMember from "@/shared/component/RoomMembers/RoomMember";

import { useWebRTC } from "@/shared/context/webRTCContext";

export default function RoomMembers() {
  const { localStream, remoteStreams } = useWebRTC();

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
