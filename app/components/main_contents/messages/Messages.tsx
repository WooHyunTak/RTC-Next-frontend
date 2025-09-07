'use client';

import Image from "next/image";
import formatDate from "@/app/utils/formatDate";

interface MessageItem {
  id: number;
  from_user: {
    id: number;
    name: string;
    profileImage?: string;
  };
  message: string;
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
        const prevDate = messages[index - 1]?.createdAt.getDate();
        const currentDate = message.createdAt.getDate();
        const prevUser = messages[index - 1]?.from_user.id;
        return (
          <>
            {prevDate !== currentDate && (
              <div className="flex justify-center items-center gap-2 p-2">
                <div className="flex-1 h-[1px] bg-primary-500"></div>
                <span className="text-white text-sm text-primary-500">{formatDate.YYYYMMDD(new Date(message.createdAt))}</span>
                <div className="flex-1 h-[1px] bg-primary-500"></div>
              </div>
            )}
            <div key={message.id} className="flex items-center gap-2 p-2">
              {prevUser !== message.from_user.id && (
                <Image
                  src={message.from_user.profileImage ?? defaultProfileImage}
                  alt={message.from_user.name}
                  width={30}
                  height={30}
                />
              )}
              <div className="flex flex-col">
                {prevUser !== message.from_user.id && (
                  <div className="flex gap-2 items-end">
                    <span className="text-white font-bold">{message.from_user.name}</span>
                    <span className="text-white text-sm text-primary-500">{formatDate.AM_PM_HHMM(new Date(message.createdAt))}</span>
                  </div>
                )}
                <span className={`text-white text-sm ${prevUser == message.from_user.id && "pl-9"}`}>{message.message}</span>
              </div>
            </div>
          </>
        )
      })}
    </div>
  )
}

export default Messages;