"use client";

import IconBox from "./Icon_box";
import {
  faHouse,
  faMessage,
  faUser,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import { useContentsStore } from "@/app/store/contents";

function Nav() {
  const setSubnav = useContentsStore((s) => s.setSubnav);
  const setMain = useContentsStore((s) => s.setMain);

  const handleHome = () => {
    setSubnav("default");
    setMain("default");
  };

  const handleDM = () => {
    setSubnav("sub");
    setMain("default");
  };

  const handleProfile = () => {
    setSubnav("default");
    setMain("sub");
  };

  const handleMore = () => {
    setSubnav("default");
    setMain("none");
  };

  return (
    <div className="flex h-full flex-col bg-blue-700 text-white items-center p-2">
      <IconBox name={faHouse} size="xl" label="Home" position="top" onClick={handleHome} />
      <IconBox name={faMessage} size="xl" label="DM" position="top" onClick={handleDM} />
      <IconBox name={faUser} size="xl" label="Profile" position="top" onClick={handleProfile} />
      <IconBox name={faEllipsis} size="xl" label="more" position="top" onClick={handleMore} />
    </div>
  );
}

export default Nav;
