import { useInfiniteQuery } from "@tanstack/react-query";
import usersApi from "@/app/api/users";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faMessage } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "../../Tooltip";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

interface FriendItem {
    id: number;
    name: string;
    email: string;
    profile?: string;
    isOnline: boolean;
}

function Friend(data: FriendItem) {
    const { name, profile, isOnline } = data;
    const defaultProfileImage = "/images/ic_profile.png";

    return (
        <div className="flex w-full p-2 gap-2 items-center justify-between hover:bg-blue-700 border-b border-gray-500 hover:rounded-[10px] ">
            <div className="flex relative">
                <Image
                    src={profile ?? defaultProfileImage}
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
            <div className="flex flex-col w-full h-full">
                <span className="text-white">{name}</span>
                <span className="text-white">{isOnline ? "온라인" : "오프라인"}</span>
            </div>
            <Tooltip text="메시지 보내기" position="top">
                <div className="flex w-[32px] h-[32px] bg-blue-800 rounded-full items-center justify-center">
                    <FontAwesomeIcon icon={faMessage} className="text-white" /> 
                </div>
            </Tooltip>
            <Tooltip text="더보기" position="top">
                <div className="flex w-[32px] h-[32px] bg-blue-800 rounded-full items-center justify-center">
                    <FontAwesomeIcon icon={faEllipsisVertical} className="text-white" />
                </div>
            </Tooltip>
        </div>
    );
}

function FriendList () {
    const {data: friendListData} = useInfiniteQuery({
        queryKey: ["friends"],
        queryFn: ({pageParam = {nextCursor: "", limit: 10}}) => usersApi.getFriendList(pageParam),
        getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
        initialPageParam: {nextCursor: "", limit: 10},
    });

    return (
        <div className="flex flex-col w-full h-full bg-blue-800">
            {friendListData?.pages &&
                friendListData?.pages?.map((item) => (
                    item.list.map((item: FriendItem) => (
                        <Friend key={item.id} {...item} />
                    ))
                ))
            }
        </div>  
    )
}

export default FriendList