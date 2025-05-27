import React from "react";

type InputWrapperProps = {
  children: React.ReactNode;
};

export default function InputWrapper({ children }: InputWrapperProps) {
  return <div className="flex flex-col gap-[10px]">{children}</div>;
}
