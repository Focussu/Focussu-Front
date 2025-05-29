import React from "react";

interface ListImageProps {
  image: string;
}

export default function ListImage({ image }: ListImageProps) {
  return (
    <img
      src={image}
      alt="이미지가 없어용"
      className="w-full max-h-[250px] aspect-[3/2] object-cover object-center rounded-lg"
    />
  );
}
