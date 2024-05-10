import MapComponent from "@/components/MapComponent";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";

export default function Dashboard() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="z-10 bg-white h-screen absolute left-0 text-black py-12 rounded-tr-[32px]">
        <Sidebar selected={"Dashboard"} />
      </div>
      <div className="flex justify-center items-center h-screen w-full">
        <MapComponent />
      </div>
    </main>
  );
}
