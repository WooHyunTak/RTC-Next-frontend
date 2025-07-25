"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import usersApi from "../api/users";

interface User {
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
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
  setUser: () => {},
  isPending: false,
  getUser: async () => {},
  logout: async () => {},
  login: async () => {},
  register: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isPending, setIsPending] = useState(false);

  const getUser = async () => {
    try {
      setIsPending(true);
      const response = await usersApi.getUser();
      setUser(response);
      connectWebSocket();
    } catch (error) {
      console.error(error);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const logout = async () => {
    await usersApi.logout();
    setUser(null);
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await usersApi.login({
        loginEmail: email,
        loginPassword: password,
      });

      connectWebSocket();
      setUser(response);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const connectWebSocket = () => {
    const websocket = new WebSocket(
      `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}:${process.env.NEXT_PUBLIC_WEBSOCKET_PORT}/ws/users/`
    );

    websocket.onopen = () => {
      console.log("WebSocket connected");
    };

    websocket.onmessage = (event) => {
      console.log(event.data);
    };

    websocket.onclose = () => {
      console.log("WebSocket disconnected");
    };
  };

  const register = async (
    email: string,
    password: string,
    nickname: string
  ) => {
    const response = await usersApi.signup({
      loginEmail: email,
      loginPassword: password,
      name: nickname,
    });
    setUser(response.data);
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, isPending, getUser, logout, login, register }}
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
