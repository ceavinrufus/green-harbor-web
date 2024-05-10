import React from "react";
import ContainerInfo from "./ContainerInfo";
import Image from "next/image";

const containers = [
  { name: "Container 1" },
  { name: "Container 2" },
  { name: "Container 3" },
];

function ContainerCard({ container }) {
  return (
    <div className="flex flex-col items-center rounded-3xl bg-white p-5 min-w-[240px]">
      <h2 className="font-semibold w-full text-left">{container.name}</h2>
      <div className="h-4/5">
        <img src={"/container.png"} className=" h-full object-cover" />
      </div>
    </div>
  );
}
function ContainersPage() {
  return (
    <div className="w-full h-full">
      <div className="h-2/5 flex justify-center">
        <div className="max-w-[1640px]">
          <div className="h-1/5"></div>
          <div className="text-black h-4/5 w-full p-10">
            <div className="inline-flex h-full gap-2 overflow-x-auto w-[1520px]">
              {/* This mapping may make the div above overflow */}
              {containers.map((container) => (
                <>
                  <ContainerCard container={container} />
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#20965D] h-3/5 p-10 flex justify-center">
        <div className="max-w-[1640px] h-full w-full">
          <ContainerInfo container={containers[0]} />
        </div>
      </div>
    </div>
  );
}

export default ContainersPage;
