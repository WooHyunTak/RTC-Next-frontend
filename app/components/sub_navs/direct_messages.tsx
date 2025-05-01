import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import friends from "@/app/data/friends";
import Image from "next/image";

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
    <div className="flex flex-col justify-center gap-2">
      {friends.map((friend) => (
        <FriendItem key={friend.id} friend={friend} />
      ))}
    </div>
  );
}

export default DirectMessages;
