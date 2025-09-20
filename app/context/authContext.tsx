"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/useAuthStore";

interface User {
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isPending: boolean;
  getUser: () => Promise<void>;
  logout: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    nickname: string
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isPending: false,
  getUser: async () => {},
  logout: async () => {},
  login: async () => {},
  register: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, login, logout, register, getUser: storeGetUser } = useAuthStore();
  const [isPending, setIsPending] = useState(true);

  const getUser = async () => {
    try {
      setIsPending(true);
      await storeGetUser();
    } catch (error) {
      console.error(error);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isPending, getUser, logout, login, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth(redirect: boolean = true) {
  const router = useRouter();
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  useEffect(() => {
    if (!context.user && redirect && !context.isPending) {
      router.push("/users/login");
    }
  }, [context.user, context.isPending, redirect]);

  return context;
}
