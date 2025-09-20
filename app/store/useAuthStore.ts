'use client';

import { create } from "zustand";
import usersApi from "../api/users";

interface User {
    id: number;
    name: string;
    email: string;
}

type AuthState = {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    register: (email: string, password: string, nickname: string) => Promise<void>;
    getUser: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    login: async (email: string, password: string) => {
        try {
            const response = await usersApi.login({
                loginEmail: email,
                    loginPassword: password,
            });
            set({ user: response });
        } catch (error) {
            console.error(error);
        }
    },
    logout: async () => {
        await usersApi.logout();
        set({ user: null });
    },
    register: async (email: string, password: string, nickname: string) => {
        try {
            const response = await usersApi.signup({
                loginEmail: email,
                loginPassword: password,
                name: nickname,
            });
            set({ user: response.data });
        } catch (error) {
            console.error(error);
        }
    },
    getUser: async () => {
        try {
            const response = await usersApi.getUser();
            set({user: response});
        } catch (error) {
            console.error(error);
        }
    }
}));