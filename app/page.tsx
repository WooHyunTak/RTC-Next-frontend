"use client";

import useAuth from "./context/authContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Nav from "./components/nav";
import Header from "./components/header";

export default function Home() {
  const { user, logout } = useAuth(false);
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
