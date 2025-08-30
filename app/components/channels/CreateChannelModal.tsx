'use client'

import ModalTemplate from "../ModalTemplate";
import Button from "../Button";
import { InputSet } from "../Input_set";

interface CreateChannelModalProps {
    openState: (value: boolean) => void;
}

function CreateChannelModal({ openState }: CreateChannelModalProps) {

    const handleClose = () => {
        openState(false);
    };  

    const handleSaveChannel = () => {
        console.log("Save Channel");
    };

    return (
        <ModalTemplate>
            <div className="flex flex-col bg-white rounded-lg p-4 gap-4">
                <header className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Create Channel</h1>
                </header>
                <div className="flex flex-col gap-2 w-[500px]">
                    <InputSet label="Name" id="channelName" placeholder="Channel Name" />
                    <InputSet label="Description" type="textarea" id="channelDescription" placeholder="Channel Description" />
                    <InputSet label="Category" id="channelCategory" placeholder="Channel Category" />
                    <InputSet label="Private channel" type="checkbox" id="privateChannel" placeholder="Private Channel" />

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