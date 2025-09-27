import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faSearch } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import channelsApi from "@/app/api/channels";
import { useQuery } from "@tanstack/react-query";
import { DMChannelResponse } from "@/app/api/channels";
import { useContentsStore } from "@/app/store/contents";



function FriendItem({ friend }: { friend: DMChannelResponse }) {
  const { name, isOnline = false, profileImage } = friend.toUser;

  const defaultProfileImage = "/images/ic_profile.png";

  const { setChannel } = useContentsStore();

  const handleClick = () => {
    setChannel({
      channelId: friend.id,
      toUser: friend.toUser,
    });
  };

  return (
    <div className="flex items-center gap-4 hover:bg-blue-600 p-2 rounded-md" onClick={handleClick}>
      <div className="flex items-center justify-center w-8 h-8 relative">
        <Image
          src={profileImage ?? defaultProfileImage}
          alt={name}
          width={20}
          height={20}
          className="flex items-center justify-center rounded-full"
        />
        {isOnline ? (
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
      <div>{name}</div>
    </div>
  );
}
function DirectMessages() {

  const { data: dmChannels } = useQuery({
    queryKey: ["dm-channels"],
    queryFn: channelsApi.getDMChannels,
  });

  const { setChannel } = useContentsStore();

  return (
    <>
      <div className="flex w-full flex-col">
        <div className="flex items-start w-full flex-col gap-2 text-lg rounded-md p-2">
          <span>Direct messages</span>
          <div className="flex items-center gap-2 w-full bg-blue-900 rounded-md p-2">
            <FontAwesomeIcon icon={faSearch} />
            <input type="text" placeholder="DM Search" className="bg-transparent text-white pl-2 rounded-md w-full" />
          </div>
        </div>
      </div>
      {dmChannels && dmChannels.length > 0 ? (
      <div className="flex w-full flex-col overflow-y-auto">
          {dmChannels?.map((item: DMChannelResponse) => (
            <FriendItem key={item.id} friend={item}/>
          ))}
      </div>
      ) : (
        <div className="flex w-full flex-col overflow-y-auto">
          <span>No DM channels</span>
        </div>
      )}
    </>
  );
}

export default DirectMessages;
