import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faSearch } from "@fortawesome/free-solid-svg-icons";
import friends from "@/app/data/friends";
import Image from "next/image";
import {Resizable} from "re-resizable";
interface Friend {
  id: number;
  name: string;
  isOnline: boolean;
  profileImage: string | null;
}

function FriendItem({ friend }: { friend: Friend }) {
  const { name, isOnline, profileImage } = friend;

  const defaultProfileImage = "/images/ic_profile.png";
  return (
    <div className="flex items-center gap-4 hover:bg-blue-600 p-2 rounded-md">
      <div className="flex items-center justify-center w-8 h-8 relative">
        <Image
          src={profileImage ?? defaultProfileImage}
          alt={name}
          width={20}
          height={20}
          className="flex items-center justify-center rounded-full"
        />
        {friend.isOnline ? (
          <FontAwesomeIcon
            icon={faCircle}
            className="text-green-500 absolute bottom-0 right-0"
          />
        ) : (
          <FontAwesomeIcon
            icon={faCircle}
            className="text-gray-500 absolute bottom-0 right-0"
          />
        )}
      </div>
      <div>{friend.name}</div>
    </div>
  );
}
function DirectMessages() {
  return (
    <Resizable 
      className="flex w-[300px] h-full flex-col gap-2 bg-blue-800 text-white p-2 overflow-y-auto"
      defaultSize={{
        width: 300,
        height: "100%",
      }}
      minWidth={250}
      maxWidth={400}
      enable={{
        right: true,
      }}
    >
      <div className="flex w-full flex-col">
        <div className="flex items-start w-full flex-col gap-2 text-lg rounded-md p-2">
          <span>Direct messages</span>
          <div className="flex items-center gap-2 w-full bg-blue-900 rounded-md p-2">
            <FontAwesomeIcon icon={faSearch} />
            <input type="text" placeholder="DM Search" className="bg-transparent text-white pl-2 rounded-md w-full" />
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col overflow-y-auto">
          {friends.map((friend) => (
            <FriendItem key={friend.id} friend={friend} />
          ))}
      </div>
    </Resizable>
  );
}

export default DirectMessages;
