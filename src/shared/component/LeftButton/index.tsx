import React from "react";

export default function LeftButton({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`text-xl px-3 py-1 rounded ${
        disabled ? "opacity-30 cursor-not-allowed" : "hover:bg-gray-200"
      }`}
    >
      ◀
    </button>
  );
}
