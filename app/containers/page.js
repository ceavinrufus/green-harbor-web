import ContainersPage from "@/components/ContainersPage";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";

export default function Containers() {
  return (
    <main className="flex min-h-screen h-screen items-center justify-between bg-[#BAD4C7] min-w-[1024px]">
      <div className="z-10 bg-white h-full text-black py-12 rounded-tr-[32px]">
        <Sidebar selected={"Containers"} />
      </div>
      <ContainersPage />
    </main>
  );
}
