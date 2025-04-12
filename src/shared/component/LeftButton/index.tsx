import React from "react";
import Image from "next/image";

export default function LeftButton() {
  return (
    <div>
      <Image
        className="dark:invert"
        src="/LeftButton.svg"
        alt="LeftButton"
        width={30}
        height={40}
        priority
      />
    </div>
  );
}
