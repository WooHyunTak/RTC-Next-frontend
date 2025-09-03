'use client';
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useQueryClient } from "@tanstack/react-query";
import usersApi from "@/app/api/users";
interface ReceivedFriendItem { 
    from_user: {
        id: number;
        name: string;
        email: string;
        profile?: string;
    };
    status: string;
}

interface ListResponse {
    message: string;
    list: ReceivedFriendItem[];
}

function ReceivedFriendItem(data: ReceivedFriendItem) {
    const { from_user } = data;
    const defaultProfileImage = "/images/ic_profile.png";
    const queryClient = useQueryClient();

    const handleAcceptFriendRequest = async () => {
        await usersApi.acceptFriendRequest({RequestUserId: from_user.id});
        queryClient.invalidateQueries({queryKey: ["receivedFriend"]});
        queryClient.refetchQueries({queryKey: ["receivedFriend"]});
    }

    const handleRejectFriendRequest = async () => {
        await usersApi.rejectFriendRequest({RequestUserId: from_user.id});
        queryClient.invalidateQueries({queryKey: ["receivedFriend"]});
        queryClient.refetchQueries({queryKey: ["receivedFriend"]});
    }

    return (
        <div className="flex w-full p-2 gap-2 items-center justify-between hover:bg-gray-700 border-b border-gray-500 hover:rounded-[10px] ">
            <Image
                src={from_user?.profile ?? defaultProfileImage}
                alt={from_user?.name}
                width={30}
                height={30}
            />
            <span className="flex-1 text-white">{from_user?.name}</span>
            <div className="flex w-[32px] h-[32px] bg-gray-800 rounded-full items-center justify-center hover:cursor-pointer" onClick={handleAcceptFriendRequest}>
                <FontAwesomeIcon icon={faCheck} className="text-white" />
            </div>
            <div className="flex w-[32px] h-[32px] bg-gray-800 rounded-full items-center justify-center hover:cursor-pointer" onClick={handleRejectFriendRequest}>
                <FontAwesomeIcon icon={faXmark} className="text-white" />
            </div>
        </div>
    );
}

function ReceivedFriendRequests() {
    const queryClient = useQueryClient();

    const requestFriendData: ListResponse | undefined = queryClient.getQueryData(["receivedFriend"]);

    if (!requestFriendData) {
        return null;
    }

    return (
        <div className="flex flex-col w-full h-full bg-gray-800">
            {requestFriendData?.list?.length > 0 &&
                requestFriendData?.list?.map((item) => (
                    <ReceivedFriendItem key={item.from_user.id} {...item} />
                ))
            }
        </div>  
    );
}

export default ReceivedFriendRequests;