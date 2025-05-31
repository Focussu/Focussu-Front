"use client";

import MyRoom from "@/shared/component/RoomMembers/MyRoom";
import RoomMember from "@/shared/component/RoomMembers/RoomMember";

import { useWebRTC } from "@/shared/context/webRTCContext";

export default function RoomMembers() {
  const { localStream, remoteStreams } = useWebRTC();

  const allMembers = [
    ...(localStream ? [{ id: "me", stream: localStream }] : []),
    ...remoteStreams,
  ];

  return (
    <div className="w-full h-full overflow-x-hidden px-4 py-6">
      <div
        className="grid gap-6 sm:gap-8 lg:gap-10 justify-center"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(22rem, 1fr))" }}
      >
        {allMembers.map((member) =>
          member.id === "me" ? (
            <MyRoom key="me" stream={member.stream} />
          ) : (
            <RoomMember key={member.id} stream={member.stream} />
          )
        )}
      </div>
    </div>
  );
}
