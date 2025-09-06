"use client";

import Nav from "../components/Nav";
import DefaultNav from "../components/sub_navs/Default_nav";
import DirectMessages from "../components/sub_navs/Direct_messages";
import { useContentsStore } from "@/app/store/contents";
import Header from "../components/Header";
import useAuth from "../context/AuthContext";
import DefaultMain from "../components/main_contents/users/Default";
import { Resizable } from "re-resizable";
function Main() {
  const { user } = useAuth();
  const subnav = useContentsStore((s) => s.subnav);
  const main = useContentsStore((s) => s.main);

  return (
    <>
      <Header />
      <div className="flex h-full w-full overflow-hidden bg-blue-700">
        <Nav />
        <Resizable
          className="flex w-[300px] h-full flex-col gap-2 bg-blue-800 text-white p-2 rounded-l-md overflow-y-auto border border-blue-900"
          defaultSize={{
            width: 300,
            height: "100%",
          }}
          minWidth={250}
          maxWidth={400}
          enable={{
            right: true,
          }}
        >
          {subnav === "default" ? <DefaultNav /> : <DirectMessages />}
        </Resizable>
        {main === "default" ? <DefaultMain /> : ""}
      </div>
    </>
  );
}

export default Main;
