"use client";

import Nav from "../components/Nav";
import DefaultNav from "../components/sub_navs/Default_nav";
import DirectMessages from "../components/sub_navs/Direct_messages";
import { useContentsStore } from "@/app/store/contents";
import Header from "../components/Header";
import useAuth from "../context/AuthContext";
import DefaultMain from "../components/main_contents/users/Default";
function Main() {
  const { user } = useAuth();
  const subnav = useContentsStore((s) => s.subnav);
  const main = useContentsStore((s) => s.main);

  return (
    <>
      <Header />
      <div className="flex h-full w-full overflow-hidden">
        <Nav />
        {subnav === "default" ? <DefaultNav /> : <DirectMessages />}
        {main === "default" ? <DefaultMain /> : ""}
      </div>
    </>
  );
}

export default Main;
