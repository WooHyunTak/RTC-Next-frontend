import channels from "@/app/data/channels";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";

interface ChannelProps {
  channel: {
    id: number;
    name: string;
    description: string;
    isPrivate: boolean;
    type: string;
    createdAt: string;
    updatedAt: string;
  };
}

function ChannelItem({ channel }: ChannelProps) {
  const { name, isPrivate, type } = channel;

  return (
    <div className="flex items-center gap-4 hover:bg-blue-600 p-2 rounded-md">
      <div className="flex items-center justify-center w-8 h-8 relative">
        {isPrivate ? (
          <FontAwesomeIcon icon={faLock} />
        ) : (
          <FontAwesomeIcon icon={faLockOpen} />
        )}
      </div>
      <div className="gap-2">
        [{type}] {name}
      </div>
    </div>
  );
}

function Channels() {
  return (
    <div className="flex flex-col gap-2">
      {channels.map((channel) => (
        <ChannelItem key={channel.id} channel={channel} />
      ))}
    </div>
  );
}

export default Channels;
