"use client";

import useAuth from "./context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Nav from "./components/Nav";
import Header from "./components/Header";

export default function Home() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/main");
    }
  }, [user]);

  const handleLogin = () => {
    router.push("/users/login");
  };

  return (
    <>
      <Header />
      <div className="flex h-full w-full">
        <Nav />
      </div>
    </>
  );
}
