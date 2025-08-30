"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function QueryProvider({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient(
    {
      defaultOptions: {
        queries: {
          // 5분 동안 캐시 유지
          staleTime: 5 * 60 * 1000,
          // 네트워크 에러 시 3번 재시도
          retry: 3,
          // 백그라운드에서 자동 리프레시 비활성화
          refetchOnWindowFocus: false,
        },
        mutations: {
          // 뮤테이션 에러 시 1번 재시도
          retry: 1,
        },
      },
    }
  ));
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default QueryProvider;