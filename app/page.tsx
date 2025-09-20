"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import InputSet from "./components/Input_set";
import Link from "next/link";
import MessageModal from "./components/Message_modal";
import useAuth from "./context/AuthContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { user, login } = useAuth();

  const handleSubmit = async () => {
    try {
      await login(email, password);
      router.push("/main");
    } catch (error: any) {
      openMessageModal(error.response.data.message);
    }
  };

  const openMessageModal = (message: string) => {
    setMessage(message);
    setIsOpen(true);
  };

  const closeMessageModal = () => {
    setMessage("");
    setIsOpen(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/main");
    }
  }, [user]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md">
        <div className="flex flex-col bg-white rounded-lg shadow-md p-8 gap-4">
          <h1 className="text-2xl font-bold text-center mb-6">Chat Login</h1>
          <InputSet
            label="Email"
            type="email"
            id="email"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <InputSet
            label="Password"
            type="password"
            id="password"
            value={password}
            onKeyPress={handleKeyPress}
            handleChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Login
          </button>

          <div className="flex justify-center items-center gap-2">
            <p>you don't have an account?</p>
            <Link href="/users/signup">Sign up</Link>
          </div>
        </div>
      </div>
        {isOpen && <MessageModal title="Login Failed" message={message} handleClose={closeMessageModal}/>}
    </div>
  );
}

export default LoginPage;
