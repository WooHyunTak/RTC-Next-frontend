import ButtonSet from "../button_set";
import { faUser, faUsers, faSearch, faEllipsisVertical, faMessage, faCircle } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import friends from '@/app/data/friends'
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface FriendItemProps { 
  item: {
    id: number;
    name: string;
    isOnline: boolean;
    profileImage: string | null;
  };
}
function FriendItem({item}: FriendItemProps) {
  const defaultProfileImage = "/images/ic_profile.png";
  return (
    <div className="flex w-full p-2 gap-2 items-center justify-between hover:bg-blue-700 border-b border-gray-500 hover:rounded-[10px] ">
      <div className="flex relative">
        <Image
          src={item.profileImage ?? defaultProfileImage}
          alt={item.name}
          width={30}
          height={30}
        />
        {item.isOnline ? (
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
      <div className="flex flex-col w-full h-full">
        <span className="text-white">{item.name}</span>
        <span className="text-white">{item.isOnline ? "온라인" : "오프라인"}</span>
      </div>
      <div className="flex w-[32px] h-[32px] bg-blue-800 rounded-full items-center justify-center">
        <FontAwesomeIcon icon={faMessage} className="text-white" />
      </div>
      <div className="flex w-[32px] h-[32px] bg-blue-800 rounded-full items-center justify-center">
        <FontAwesomeIcon icon={faEllipsisVertical} className="text-white" />
      </div>
    </div>
  );
}

function DefaultMain() {
  const [itemState, setItemState] = useState("friend")

  return (
    <div className="flex flex-col w-full h-full pl-4 pr-4 bg-blue-800">
      <div className="flex w-full justify-between bg-blue-800 pt-4 pb-2">
          <div className="flex w-ful gap-2">
              <ButtonSet icon={faUser} size="sm" label="친구" />
              <ButtonSet icon={faUsers} size="sm" label="모두" />
              <ButtonSet icon={faSearch} size="sm" label="친구찾기" />
          </div>
      </div>
      <div className="flex flex-col w-full h-full bg-blue-800">
        <div className="flex w-full justify-between bg-blue-800 pt-4 pb-4">
          <span className="text-white">모든 친구 - {friends.length}명</span>
        </div>
        {itemState == "friend" && 
          friends.map((item) => (
            <FriendItem key={item.id} item={item} />
          ))
        }
      </div>  
    </div>
  );
}

export default DefaultMain;