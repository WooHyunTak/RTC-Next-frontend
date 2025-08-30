'use client'

import { useEffect, useRef } from "react";

interface ModalTemplateProps {
    children: React.ReactNode;
}

function ModalTemplate({ children }: ModalTemplateProps) {
    const ref = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        ref.current?.showModal();
        return () => {
            ref.current?.close();
        };
    }, [ref]);

    return (
        <dialog ref={ref} className="flex flex-col fixed m-auto border-2 border-gray-300 rounded-lg">
            {children}
        </dialog>
    );
}

export default ModalTemplate;