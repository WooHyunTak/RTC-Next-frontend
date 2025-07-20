"use client";

import Nav from "../components/nav";
import DefaultNav from "../components/sub_navs/default_nav";
import DirectMessages from "../components/sub_navs/direct_messages";
import { useState } from "react";
import Header from "../components/header";
import useAuth from "../context/authContext";
import DefaultMain from "../components/main_contents/default";
interface NavType {
  nav: "default" | "sub" | "none";
}

interface MainContents {
  main: "default" | "sub" | "none";
}

function Main() {
  const { user } = useAuth();
  const [subnav, setSubnav] = useState<NavType>({ nav: "default" });
  const [mainContents, setMainContents] = useState<MainContents>({ main: "default" });

  return (
    <>
      <Header />
      <div className="flex h-full w-full overflow-hidden">
        <Nav />
        {subnav.nav === "default" ? <DefaultNav /> : <DirectMessages />}
        {mainContents.main === "default" ? <DefaultMain /> : ""}
      </div>
    </>
  );
}

export default Main;
