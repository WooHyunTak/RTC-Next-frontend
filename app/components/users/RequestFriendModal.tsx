"use client";
import ModalTemplate from "../ModalTemplate";
import InputSet from "../Input_set";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import usersApi from "@/app/api/users";

interface RequestFriendModalProps {
  openState: (value: boolean) => void;
}

function RequestFriendModal({ openState }: RequestFriendModalProps) {
  const [userName, setUserName] = useState("");

  const handleSubmit = async () => {
    try {
      if (!validateForm()) return; // 요청 유효성 검사
      await usersApi.requestFriend({ userName: userName });
      openState(false);
    } catch (error) {
      console.error(error);
    }
  };

  const validateForm = () => {
    if (userName.length === 0) {
      alert("사용자명을 입력해 주세요.");
      return false;
    }
    return true;
  };

  return (
    <ModalTemplate>
      <div className="flex flex-col bg-white rounded-lg p-4 gap-4">
        <header className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">친구 추가하기</h1>
          <FontAwesomeIcon icon={faXmark} className="text-2xl hover:cursor-pointer" onClick={() => {openState(false)}} />
        </header>
        <div className="flex flex-col gap-2 w-[500px]">
          <InputSet label="사용자명을 사용해서 친구를 추가할 수 있습니다." id="name" placeholder="사용자명을 입력해 주세요." handleChange={(e) => {setUserName(e.target.value)}} />
          <Button variant="primary" size="md" onClick={() => {handleSubmit()}}>친구 요청 보내기</Button>
        </div>
      </div>
    </ModalTemplate>
  );
}

export default RequestFriendModal;