"use client";
import { TProperty } from "@/types/properties.types";
import { Button } from "./ui/button";
import { FaBookmark } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { bookmarkProperty } from "@/app/actions/bookmarkProperty";
import { twMerge } from "tailwind-merge";
import { useTransition } from "react";
import { toast } from "sonner";

export default function BookmarkButton({ property, isBookmarked }: { property: TProperty; isBookmarked: boolean }) {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [isPending, startTransition] = useTransition();

  const handleClick = async () => {
    if (!userId) {
      toast.error("You must be logged in to bookmark a property");
    }

    startTransition(async () => {
      toast.promise(bookmarkProperty(property.id), {
        loading: "Loading...",
        success: (data) => {
          return data?.message;
        },
        error: () => "An error occurred",
      });
    });
  };

  return (
    <Button
      className={twMerge(
        isBookmarked ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600",
        "text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
      )}
      onClick={handleClick}
      disabled={isPending}
    >
      <FaBookmark className='mr-2' /> {isBookmarked ? "Remove" : "Bookmark"} Property
    </Button>
  );
}
