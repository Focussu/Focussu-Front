import React from "react";
import Image from "next/image";

export default function RightButton() {
  return (
    <div>
      <Image
        className="dark:invert"
        src="/RightButton.svg"
        alt="RightButton"
        width={30}
        height={40}
        priority
      />
    </div>
  );
}
