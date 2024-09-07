"use client";

import { getUnreadMessageCount } from "@/app/actions/getUnreadMessageCount";
import { useSession } from "next-auth/react";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

type TGlobalContext = {
  unreadCount: number;
  setUnreadCount: Dispatch<SetStateAction<number>>;
};

const GlobalContext = createContext<TGlobalContext | null>(null);

export function GlobalProvider({ children }: { children: React.ReactNode }) {
  const [unreadCount, setUnreadCount] = useState(0);
  const { data: session } = useSession();

  useEffect(() => {
    if (session && session.user) {
      getUnreadMessageCount().then((res) => setUnreadCount(res.count));
    }
  }, [session, getUnreadMessageCount]);

  return <GlobalContext.Provider value={{ unreadCount, setUnreadCount }}>{children}</GlobalContext.Provider>;
}

export function useGlobalContext() {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("useGlobalContext must be used within a <GlobalProvider.Provider>");
  }

  return context;
}
