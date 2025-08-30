'use client'

import ModalTemplate from "../ModalTemplate";
import Button from "../Button";
import InputSet from "../Input_set";
import TextareaSet from "../Textarea_set";
import ToggleSet from "../Toggle_set";
import { useState } from "react";

interface CreateChannelModalProps {
    openState: (value: boolean) => void;
}

interface ChannelParams {
    name: string;
    description: string;
    category: string;
    isPrivate: boolean;
}

const defaultChannelParams: ChannelParams = {
    name: "",
    description: "",
    category: "",
    isPrivate: false,
}


function CreateChannelModal({ openState }: CreateChannelModalProps) {
    const [channelParams, setChannelParams] = useState<ChannelParams>({
        ...defaultChannelParams,
    });

    const handleChangeChannelParams = (key: keyof ChannelParams, value: string | boolean) => {
        setChannelParams({ ...channelParams, [key]: value });
    };

    const handleClose = () => {
        openState(false);
    };  

    const handleSaveChannel = () => {
        console.log(channelParams);
    };

    return (
        <ModalTemplate>
            <div className="flex flex-col bg-white rounded-lg p-4 gap-4">
                <header className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Create Channel</h1>
                </header>
                <div className="flex flex-col gap-2 w-[500px]">
                    <InputSet label="Name" id="channelName" placeholder="Channel Name" handleChange={
                        (e) => {
                            handleChangeChannelParams("name", e.target.value);
                        }
                    } />
                    <TextareaSet label="Description" id="channelDescription" placeholder="Channel Description" maxLength={1000} handleChange={(e) => handleChangeChannelParams("description", e.target.value)} />
                    <InputSet label="Category" id="channelCategory" placeholder="Channel Category" handleChange={
                        (e) => {
                            handleChangeChannelParams("category", e.target.value);
                        }
                    } />
                    <ToggleSet label="Private channel" size="sm" id="privateChannel" placeholder="Private Channel" handleChange={
                        (e) => {
                            handleChangeChannelParams("isPrivate", e.target.checked);
                        }
                    } />
                </div>
                <footer className="flex justify-end gap-2">
                    <Button variant="danger" size="md" onClick={handleClose}>Cancel</Button>
                    <Button variant="primary" size="md" onClick={handleSaveChannel}>Create</Button>                    
                </footer>
            </div>            
        </ModalTemplate>
    );
}

export default CreateChannelModal;