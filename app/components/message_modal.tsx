"use client";

import  Button  from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface MessageModalProps {
    title: string;
    message: string;
    handleClose: () => void;
}

function MessageModal({ title, message, handleClose }: MessageModalProps) {
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-4 rounded-lg w-[500px] h-[200px] flex flex-col justify-between items-center">
                <div className="flex justify-between items-center w-full">
                    <h1 className="text-2xl font-bold">{title}</h1>
                    <FontAwesomeIcon icon={faXmark} className="text-2xl" onClick={handleClose} />
                </div>
                <div className="flex flex-col justify-center items-center w-full">
                    <p className="text-center text-lg">{message}</p>
                </div>
                <div className="flex flex-col items-end w-full">
                    <Button onClick={handleClose}>
                        Close
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default MessageModal;