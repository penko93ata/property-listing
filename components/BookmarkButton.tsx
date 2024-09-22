"use client";
import { TProperty } from "@/types/properties.types";
import { Button } from "./ui/button";
import { FaBookmark } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useToast } from "./ui/use-toast";
import { bookmarkProperty } from "@/app/actions/bookmarkProperty";
import { twMerge } from "tailwind-merge";
import { useTransition } from "react";

export default function BookmarkButton({ property, isBookmarked }: { property: TProperty; isBookmarked: boolean }) {
  const { data: session } = useSession();
  const { toast } = useToast();
  const userId = session?.user?.id;

  const [isPending, startTransition] = useTransition();

  const handleClick = async () => {
    if (!userId) {
      return toast({
        description: "You must be logged in to bookmark a property",
        variant: "destructive",
      });
    }
    try {
      startTransition(async () => {
        const res = await bookmarkProperty(property.id);
        toast({
          variant: res?.isBookmarked ? "success" : "destructive",
          description: res?.message ?? "Unknown",
        });
      });
    } catch (error) {
      toast({
        description: "An error occurred",
        variant: "destructive",
      });
    }
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
