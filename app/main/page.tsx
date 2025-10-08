"use client";

import Nav from "../components/Nav";
import DefaultNav from "../components/sub_navs/DefaultNav";
import DirectMessages from "../components/sub_navs/DirectMessages";
import { useContentsStore } from "@/app/store/contents";
import Header from "../components/Header";
import useAuth from "../context/AuthContext";
import DefaultMain from "../components/main_contents/users/Default";
import { Resizable } from "re-resizable";
import DirectMessage from "../components/main_contents/messages/DirectMessage";

function Main() {
  const { user } = useAuth();
  const subnav = useContentsStore((s) => s.subnav);
  const main = useContentsStore((s) => s.main);
  const channel = useContentsStore((s) => s.channel);
  
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
        {main === "message" ? <DirectMessage channel={channel}/> : ""}
      </div>
    </>
  );
}

export default Main;
