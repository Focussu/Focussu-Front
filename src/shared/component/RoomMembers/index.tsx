"use client";

import MyRoom from "@/shared/component/RoomMembers/MyRoom";
import RoomMember from "@/shared/component/RoomMembers/RoomMember";
import { useWebRTC } from "@/shared/context/webRTCContext";
import { ElapsedTimeProvider } from "@/shared/context/ElapsedContext";

export default function RoomMembers() {
  const { localStream, remoteStreams } = useWebRTC();

  const allMembers = [
    ...(localStream ? [{ id: "me", stream: localStream }] : []),
    ...remoteStreams,
  ];

  return (
    <div className="w-full h-full overflow-x-hidden px-6 py-6">
      <div
        className="grid justify-center gap-6 sm:gap-8 md:gap-10"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        }}
      >
        {allMembers.map((member) => (
          <ElapsedTimeProvider key={member.id}>
            {member.id === "me" ? (
              <MyRoom stream={member.stream} />
            ) : (
              <RoomMember stream={member.stream} id={member.id} />
            )}
          </ElapsedTimeProvider>
        ))}
      </div>
    </div>
  );
}
