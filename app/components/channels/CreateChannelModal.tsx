'use client'

import ModalTemplate from "../ModalTemplate";
import Button from "../Button";
import InputSet from "../Input_set";
import TextareaSet from "../Textarea_set";
import ToggleSet from "../Toggle_set";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import channelsApi from "../../api/channels";
import { ChannelResponse, UpdateChannelRequest } from "../../api/channels";


interface CreateChannelModalProps {
    openState: (value: boolean) => void;
    modalType: "create" | "update";
    channelItem?: ChannelResponse | null;
}

interface ChannelParams {
    name: string;
    description: string;
    category: string;
    is_private: boolean;
}

const defaultChannelParams: ChannelParams = {
    name: "",
    description: "",
    category: "",
    is_private: false,
}


function CreateChannelModal({ openState, modalType, channelItem }: CreateChannelModalProps) {
    const queryClient = useQueryClient();
    const [channelParams, setChannelParams] = useState<ChannelParams>({
        ...defaultChannelParams,
    });

    

    const handleChangeChannelParams = (key: keyof ChannelParams, value: string | boolean) => {
        setChannelParams({ ...channelParams, [key]: value });
    };

    const handleClose = () => {
        openState(false);
    };  

    const createChannelMutation = useMutation({
        mutationFn: (params: ChannelParams) => channelsApi.createChannel(params),
        onSuccess: () => {
            // queryClient.invalidateQueries({ queryKey: ["my-channels"] });
            queryClient.refetchQueries({ queryKey: ["my-channels"] });
            handleClose();
        },
        onError: (error) => {
            console.error(error);
        }
    });

    const updateChannelMutation = useMutation({
        mutationFn: (params: UpdateChannelRequest) => channelsApi.updateChannel(params),
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: ["my-channels"] });
            handleClose();
        },
        onError: (error) => {
            console.error(error);
        }
    });

    const handleSaveChannel = () => {
        if (modalType === "create") {
            createChannelMutation.mutate(channelParams);
        } else {
            updateChannelMutation.mutate({
                id: channelItem?.id || 0,
                ...channelParams,
            });
        }
    };

    useEffect(() => {
        if (modalType === "update") {
            setChannelParams({
                name: channelItem?.name || "",
                description: channelItem?.description || "",
                category: channelItem?.type || "",
                is_private: channelItem?.is_private || false,
            });
        }
    }, [modalType, channelItem]);

    return (
        <ModalTemplate>
            <div className="flex flex-col bg-white rounded-lg p-4 gap-4">
                <header className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Create Channel</h1>
                </header>
                <div className="flex flex-col gap-2 w-[500px]">
                    <InputSet label="Name" id="channelName" placeholder="Channel Name" value={channelParams.name} handleChange={
                        (e) => {
                            handleChangeChannelParams("name", e.target.value);
                        }
                    } />
                    <TextareaSet label="Description" id="channelDescription" placeholder="Channel Description" maxLength={1000} value={channelParams.description} handleChange={(e) => handleChangeChannelParams("description", e.target.value)} />
                    <InputSet label="Category" id="channelCategory" placeholder="Channel Category" value={channelParams.category} handleChange={
                        (e) => {
                            handleChangeChannelParams("category", e.target.value);
                        }
                    } />
                    <ToggleSet label="Private channel" size="sm" id="privateChannel" placeholder="Private Channel" checked={channelParams.is_private} handleChange={
                        (e) => {
                            handleChangeChannelParams("is_private", e.target.checked);
                        }
                    } />
                </div>
                <footer className="flex justify-end gap-2">
                    <Button variant="danger" size="md" onClick={handleClose}>Cancel</Button>
                    <Button variant="primary" size="md" onClick={handleSaveChannel}>{modalType === "create" ? "Create" : "Update"}</Button>                    
                </footer>
            </div>            
        </ModalTemplate>
    );
}

export default CreateChannelModal;