"use client";

import { create } from "zustand";

export type NavType = "default" | "sub" | "none";
export type MainType = "default" | "sub" | "message" | "none";

interface ContentsState {
  subnav: NavType;
  main: MainType;
  setSubnav: (next: NavType) => void;
  setMain: (next: MainType) => void;
}

export const useContentsStore = create<ContentsState>((set) => ({
  subnav: "default",
  main: "default",
  setSubnav: (next) => set({ subnav: next }),
  setMain: (next) => set({ main: next }),
}));


