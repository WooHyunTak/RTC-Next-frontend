"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "../../context/authContext";
import { InputSet } from "../../components/Input_set";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const { user, login } = useAuth();
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push("/main");
    } catch (error) {
      console.error(error);
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
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputSet
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
