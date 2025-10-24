"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faMessage, faFile, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor"
import { Resizable } from "re-resizable";
import ButtonSet from "@/app/components/ButtonSet";
import { Editor } from "@tiptap/react";
import Messages from "./Messages";
import { useWebsocketStore } from "@/app/store/websocketStore";
import { useQuery } from "@tanstack/react-query";
import { getMessagesByChannel, MessageItem } from "@/app/api/messages";
import { ChannelState } from "@/app/store/contents";
import { useAuthStore } from "@/app/store/useAuthStore";

function DirectMessage({ channel }: { channel: ChannelState }) {
  const {sendMessage, onMessage} = useWebsocketStore();
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [tabState, setTabState] = useState<string>("messages");
  const { channelId, toUser } = channel;
  const authUser = useAuthStore((state) => state.user);
  const { id: toUserId,  name: toUserName, isOnline, profileImage } = toUser;

  const { data } = useQuery({
    queryKey: ["messages", channelId],
    queryFn: () => getMessagesByChannel(channelId),
  });
  
  const defaultProfileImage = "/images/ic_profile.png";
  const editorRef = useRef<Editor | null>(null)
  
  const handleSubmit = (editor: Editor) => {
    const htmlContent = editor.getHTML()
    const data = {
      content: htmlContent,
      toUserId: toUserId,
      sendChannelType: "channel"
    }
    sendMessage(JSON.stringify(data))
    // setMessages((prev) => [...prev, {
    //   id: Date.now(),
    //   fromUser: {
    //     id: authUser?.id ?? 0,
    //     name: authUser?.name ?? "",
    //     profileImage: authUser?.profileImage ?? defaultProfileImage
    //   },
    //   createdAt: new Date(),
    //   content: htmlContent,
    //   sendChannelType: "direct"
    // }]);
    editor.commands.setContent("");
    editor.commands.focus();
  }

  useEffect(() => {
    if (data) {
      setMessages(data);
    }

    onMessage((socketMessage) => {
      const data = JSON.parse(socketMessage.data);
      setMessages((prev) => [...prev, data]);
    });
  }, [data]);

  return (
    <div className="flex justify-between gap-2 flex-col w-full h-full bg-gray-800 p-2">
      <div>
        <div className="flex items-center gap-2 w-full p-2">
          <div className="flex relative">
            <Image
                src={profileImage ?? defaultProfileImage}
                alt={toUserName}
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
          <span className="text-white">{toUserName}</span>
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
            className={`flex items-center justify-center gap-2 pl-2 pr-2 hover:cursor-pointer relative ${tabState === "files" ? "text-white" : "text-gray-400"}`}
            onClick={() => setTabState("files")}
          >
            <FontAwesomeIcon icon={faFile} />
            <span>파일</span>
            {tabState === "files" && <div className="absolute bottom-[-11px] w-full h-1 bg-blue-300"></div>}
          </div>
        </div>
      </div>
      {messages && <Messages messages={messages} />}
      <div className="flex flex-col rounded-lg border border-gray-500">
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
          <SimpleEditor handleSubmit={handleSubmit} onReady={(editor) => {
            if (editorRef.current === null) {
              editorRef.current = editor;
            }
          }} />
        </Resizable>
        <div className="flex justify-end items-center p-2">
            <ButtonSet 
              icon={faPaperPlane}
              size="sm" label="전송" 
              clicked={false} 
              className="bg-gray-700 hover:bg-gray-900" 
              handleClick={() => {
                if (editorRef.current) {
                  handleSubmit(editorRef.current)
                }
            }}/>
        </div>
      </div>
    </div>
  );
}

export default DirectMessage;