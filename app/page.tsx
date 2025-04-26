"use client";

import useAuth from "./context/authContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

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
    <div>
      <h1>dashboard</h1>
      <button className="btn btn-primary" onClick={handleLogin}>
        sing in
      </button>
    </div>
  );
}
