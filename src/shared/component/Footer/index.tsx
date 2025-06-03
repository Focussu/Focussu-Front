import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="pl-[80px] pr-[80px] pt-[25px] pb-[25px] flex justify-between border-t-1">
      <div className="text-[24px] text-gray-400">FOCUSSU</div>
      <div className="flex flex-row gap-[24px]">
        <Image
          className="dark:invert"
          src="/FacebookIcon.svg"
          alt="Facebook"
          width={24}
          height={24}
          priority
        />
        <Image
          className="dark:invert"
          src="/LinkedInIcon.svg"
          alt="LinkedIn"
          width={24}
          height={24}
          priority
        />
        <Image
          className="dark:invert"
          src="/YoutubeIcon.svg"
          alt="Youtube"
          width={24}
          height={24}
          priority
        />
        <Image
          className="dark:invert"
          src="/InstagramIcon.svg"
          alt="Instagram"
          width={24}
          height={24}
          priority
        />
      </div>
    </div>
  );
}
