"use client";

import Nav from "../components/nav";
import DefaultNav from "../components/sub_navs/default_nav";
import DirectMessages from "../components/sub_navs/direct_messages";
import { useState } from "react";
import Header from "../components/header";
import useAuth from "../context/authContext";
interface NavType {
  nav: "default" | "sub" | "none";
}

function Main() {
  const [subnav, setSubnav] = useState<NavType>({ nav: "default" });
  useAuth();

  return (
    <>
      <Header />
      <div className="flex h-full w-full">
        <Nav />
        {subnav.nav === "default" ? <DefaultNav /> : <DirectMessages />}
      </div>
    </>
  );
}

export default Main;
