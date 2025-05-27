import React from "react";
import StudyInputForm from "@/shared/component/StudyInputForm";

export default function createStudy() {
  return (
    <>
      <div className="min-h-[calc(100vh-121px)] w-full flex items-center justify-center bg-[#E6E6E6] px-4">
        <div className="w-full max-w-[600px] bg-white rounded-xl shadow-md p-8">
          <StudyInputForm />
        </div>
      </div>
    </>
  );
}
