"use client";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { useAuthStore } from "./useAuthStore";

type WebsocketState = {
    socket: WebSocket | null;
    connect: () => boolean;
    disconnect: () => void;
    sendMessage: (msg: string) => void;
    onMessage: (callback: (e: MessageEvent) => void) => void;
    onClose: (callback: (e: CloseEvent) => void) => void;
    onError: (callback: (e: Event) => void) => void;
};

let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 5;
const RECONNECT_DELAY = 2000;

const reconnect = () => {
    if (useWebsocketStore.getState().socket?.readyState === WebSocket.OPEN) {
        return;
    }

    if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
        console.error("웹소켓 재연결에 실패했습니다.");
        reconnectAttempts = 0;
        return;
    }

    reconnectAttempts++;
    console.info(`${reconnectAttempts}번째 재연결 시도...`);

    setTimeout(() => {
        useWebsocketStore.getState().connect();
    }, RECONNECT_DELAY);
}

export const useWebsocketStore = create<WebsocketState>()(
  devtools(
    (set, get) => ({
      socket: null,
      connect: () => {
        if (get().socket?.readyState === WebSocket.OPEN || get().socket?.readyState === WebSocket.CONNECTING) {
            return true;
        }
        try {
            const ws = new WebSocket(
            `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}:${process.env.NEXT_PUBLIC_WEBSOCKET_PORT}/ws/users/`
            );

            ws.onopen = () => { 
                console.info("ws opened") 
                reconnectAttempts = 0;
            };
            ws.onmessage = (e) => { console.info("ws message:", e.data) };
            ws.onclose = () => { 
                console.info("ws closed"); 
                set({ socket: null });
                reconnect();
            };
                ws.onerror = (e) => console.error("ws error:", e);
            set({ socket: ws });
            return true;
        } catch (e) {
            console.error("ws error:", e);
            return false;
        }
      },
      sendMessage: (msg) => {
        get().socket?.send(msg);
      },
      onMessage: (callback: (e: MessageEvent) => void) => {
        get().socket?.addEventListener("message", callback);
      },
      onClose: (callback: (e: CloseEvent) => void) => {
        get().socket?.addEventListener("close", callback);
      },
      onError: (callback: (e: Event) => void) => {
        get().socket?.addEventListener("error", callback);
      },
      disconnect: () => {
        get().socket?.close();
        set({ socket: null });
        console.info("ws disconnected");
      },
    }),
    { name: "WebsocketStore" }
  )
);

useAuthStore.subscribe((state) => {
  if (state.user) {
    useWebsocketStore.getState().connect();
  } else {
    useWebsocketStore.getState().disconnect();
  }
});
