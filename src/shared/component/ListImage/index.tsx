import React from "react";

interface ListImageProps {
  image: string;
}

export default function ListImage({ image }: ListImageProps) {
  return (
    <>
      <img
        src={image}
        alt="이미지가 없어용"
        width={48}
        height={48}
        className="w-full aspect-[3/2] rounded-lg object-cover object-center"
      />
    </>
  );
}
