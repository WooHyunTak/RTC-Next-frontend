"use client";

import Image from "next/image";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faMessage, faFile, faPaperclip, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor"
import { Resizable } from "re-resizable";
import ButtonSet from "@/app/components/Button_set";

interface DirectMessageProps {
  friend: {
    id: number;
    name: string;
    isOnline: boolean;
    profileImage: string | null;
  }
}

function DirectMessage() {
  const { id, name, isOnline, profileImage } = {
    id: 1,
    name: "John Doe",
    isOnline: true,
    profileImage: null,
  };

  const [tabState, setTabState] = useState<string>("messages");

  const defaultProfileImage = "/images/ic_profile.png";

  return (
    <div className="flex justify-between flex-col w-full h-full bg-gray-800 p-2">
      <div>
        <div className="flex items-center gap-2 w-full p-2">
          <div className="flex relative">
            <Image
                src={profileImage ?? defaultProfileImage}
                alt={name}
                width={30}
                height={30}
            />
            {isOnline ? (
            <FontAwesomeIcon
                icon={faCircle}
                className="text-green-500 absolute bottom-0 right-0 w-[10px] h-[10px]"
            />
            ) : (
            <FontAwesomeIcon
                icon={faCircle}
                className="text-gray-500 absolute bottom-0 right-0 w-[10px] h-[10px]"
            />
            )}
          </div>
          <span className="text-white">{name}</span>
        </div>
        <div className="flex w-full gap-4 p-2 text-white">
          <div 
            className={`flex items-center justify-center gap-2 pl-2 pr-2 hover:cursor-pointer  relative ${tabState === "messages" ? "text-white" : "text-gray-400"}`}
            onClick={() => setTabState("messages")}
          >
            <FontAwesomeIcon icon={faMessage} />
            <span>메시지</span>
            {tabState === "messages" && <div className="absolute bottom-[-11px] w-full h-1 bg-blue-300"></div>}
          </div >
          <div 
            className={`flex items-center justify-center gap-2 pl-2 pr-2 hover:cursor-pointer text-white relative ${tabState === "files" ? "text-white" : "text-gray-400"}`}
            onClick={() => setTabState("files")}
          >
            <FontAwesomeIcon icon={faFile} />
            <span>파일</span>
            {tabState === "files" && <div className="absolute bottom-[-11px] w-full h-1 bg-blue-300"></div>}
          </div>
        </div>
      </div>      
      <div className="flex-1 w-full"></div>
      <div className="flex flex-col gap-2 rounded-lg border border-gray-500">
        <Resizable
          className="w-full"
          defaultSize={{
            // width: "100%",
            height: "100px",
          }}
          minHeight={100}
          maxHeight={400}
          enable={{
            top: true,
          }}
        >
          <SimpleEditor />
        </Resizable>
        <div className="flex justify-end items-center p-2">
            <ButtonSet icon={faPaperPlane } size="sm" label="전송" clicked={false} className="bg-gray-700 hover:bg-gray-900" />
        </div>
      </div>
    </div>
  );
}

export default DirectMessage;