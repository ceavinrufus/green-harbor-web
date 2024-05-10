import React from "react";

function BentoBox({ className, children }) {
  return (
    <div className={`bg-white ${className} rounded-3xl px-4 py-3`}>
      {children}
    </div>
  );
}
export default function ContainerInfo({ container }) {
  return (
    <>
      <div className="h-[10%] flex justify-between items-center">
        <h1 className="text-2xl font-bold ">{container.name}</h1>
      </div>
      <div className="flex gap-6 text-black h-[90%]">
        <div className="flex flex-col w-2/3 gap-6">
          <div className="flex gap-6 h-1/2">
            <BentoBox className="w-2/3">Info penting</BentoBox>
            <BentoBox className="w-1/3">Map</BentoBox>
          </div>
          <BentoBox className="h-1/2">
            <h2 className="text-[#20965D] font-bold text-xl">
              Latest complaints
            </h2>
          </BentoBox>
        </div>
        <BentoBox className="w-1/3">
          <h2 className="text-[#20965D] font-bold text-xl">Activities</h2>
        </BentoBox>
      </div>
    </>
  );
}
