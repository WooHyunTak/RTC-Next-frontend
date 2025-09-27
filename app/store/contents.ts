"use client";

import { create } from "zustand";
import { Friend } from "../api/channels";

export type NavType = "default" | "sub" | "none";
export type MainType = "default" | "sub" | "message" | "none";

interface ContentsState {
  subnav: NavType;
  main: MainType;
  channel: ChannelState;
  setSubnav: (next: NavType) => void;
  setMain: (next: MainType) => void;
  setChannel: (next: ChannelState) => void;
}

export interface ChannelState {
  channelId: number;
  toUser: Friend;
}

export const useContentsStore = create<ContentsState>((set) => ({
  subnav: "default",
  main: "default",
  channel: {
    channelId: 0,
    toUser: {
      id: 0,
      name: "",
      isOnline: false,
      profileImage: null,
    },
  },
  setSubnav: (next) => set({ subnav: next }),
  setMain: (next) => set({ main: next }),
  setChannel: (next) => {
    set({ channel: next });
    set({ main: "message" });
  },
}));


