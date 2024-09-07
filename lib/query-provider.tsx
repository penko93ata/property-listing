"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import { GlobalProvider } from "@/context/GlobalContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            staleTime: 4 * 1000,
            refetchInterval: 4 * 1000,
          },
        },
      })
  );
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <GlobalProvider>
          {/* <ReactQueryDevtools /> */}
          {children}
        </GlobalProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
