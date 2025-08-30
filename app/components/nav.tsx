"use client";

import { useRouter } from "next/navigation";
import Icon from "./Icon_box";
import {
  faHouse,
  faMessage,
  faUser,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";

function Nav() {
  const router = useRouter();

  return (
    <div className="flex h-full flex-col bg-blue-500 text-white items-center p-2">
      <Icon name={faHouse} size="xl" label="Home" position="top" />
      <Icon name={faMessage} size="xl" label="DM" position="top" />
      <Icon name={faUser} size="xl" label="Profile" position="top" />
      <Icon name={faEllipsis} size="xl" label="more" position="top" />
    </div>
  );
}

export default Nav;
