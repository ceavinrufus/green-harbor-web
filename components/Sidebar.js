import React from "react";

function SidebarMenu({ name, to, selected = false }) {
  return (
    <a
      className={`hover:bg-[#BAD4C7] text-left pl-10 py-2 ${
        selected == name && "font-bold text-[#20965D]"
      }`}
      href={to}
    >
      {name}
    </a>
  );
}

function Sidebar({ selected }) {
  return (
    <>
      <h1 className="font-bold text-2xl pl-10 pr-20">
        <span className="text-[#20965D]">Green</span>Harbor
      </h1>
      <div className="flex flex-col mt-16">
        <SidebarMenu name={"Dashboard"} to={"/dashboard"} selected={selected} />
        <SidebarMenu
          name={"Containers"}
          to={"/containers"}
          selected={selected}
        />
      </div>
    </>
  );
}

export default Sidebar;
