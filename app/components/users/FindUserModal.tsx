"use client";
import ModalTemplate from "../ModalTemplate";
import InputSet from "../Input_set";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface RequestFriendModalProps {
  openState: (value: boolean) => void;
}

function RequestFriendModal({ openState }: RequestFriendModalProps) {
  return (
    <ModalTemplate>
      <div className="flex flex-col bg-white rounded-lg p-4 gap-4">
        <header className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">친구 추가하기</h1>
          <FontAwesomeIcon icon={faXmark} className="text-2xl hover:cursor-pointer" onClick={() => {openState(false)}} />
        </header>
        <div className="flex flex-col gap-2 w-[500px]">
          <InputSet label="사용자명을 사용해서 친구를 추가할 수 있습니다." id="name" placeholder="사용자명을 입력해 주세요." handleChange={() => {}} />
          <Button variant="primary" size="md" onClick={() => {}}>친구 요청 보내기</Button>
        </div>
      </div>
    </ModalTemplate>
  );
}

export default RequestFriendModal;