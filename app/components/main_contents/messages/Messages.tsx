'use client';

import Image from "next/image";
import formatDate from "@/app/utils/formatDate";

interface MessageItem {
  id: number;
  fromUser: {
    id: number;
    name: string;
    profileImage?: string;
  };
  content: string;
  createdAt: Date;
}

interface MessageProps {
  messages: MessageItem[];
}

function Messages({ messages }: MessageProps) {
  const defaultProfileImage = "/images/ic_profile.png";
  
  return (
    <div className="flex flex-1 min-h-0 flex-col overflow-y-auto overflow-x-hidden">
      {messages.map((message, index) => {
        const prevDateTime = new Date(messages[index - 1]?.createdAt);
        const currentDateTime = new Date(message.createdAt);
        const prevUser = messages[index - 1]?.fromUser.id;
        const isRenderDivider = prevDateTime.getDate() !== currentDateTime.getDate();
        const isRenderUser = prevUser !== message.fromUser.id || prevDateTime.getMinutes() !== currentDateTime.getMinutes();
        return (
          <div key={message.id}>
            {isRenderDivider && (
              <div className="flex justify-center items-center gap-2 p-2">
                <div className="flex-1 h-[1px] bg-primary-500"></div>
                <span className="text-white text-sm text-primary-500">{formatDate.YYYYMMDD(new Date(message.createdAt))}</span>
                <div className="flex-1 h-[1px] bg-primary-500"></div>
              </div>
            )}
            <div className="flex items-center gap-2 p-2">
              {isRenderUser && (
                <Image
                  src={message.fromUser.profileImage ?? defaultProfileImage}
                  alt={message.fromUser.name}
                  width={30}
                  height={30}
                />
              )}
              <div className="flex flex-col">
                {isRenderUser && (
                  <div className="flex gap-2 items-end">
                    <span className="text-white font-bold">{message.fromUser.name}</span>
                    <span className="text-white text-sm text-primary-500">{formatDate.AM_PM_HHMM(new Date(message.createdAt))}</span>
                  </div>
                )}
                <div className={`text-white text-sm ${prevUser == message.fromUser.id && prevDateTime.getMinutes() == currentDateTime.getMinutes() && "pl-9"}`} dangerouslySetInnerHTML={{ __html: message.content }} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Messages;