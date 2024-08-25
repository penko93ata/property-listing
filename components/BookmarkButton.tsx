import { TProperty } from "@/types/properties.types";
import { Button } from "./ui/button";
import { FaBookmark } from "react-icons/fa";

export default function BookmarkButton({ property }: { property: TProperty }) {
  return (
    <Button className='bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'>
      <FaBookmark className='mr-2' /> Bookmark Property
    </Button>
  );
}
