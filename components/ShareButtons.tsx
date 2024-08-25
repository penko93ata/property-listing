import { TProperty } from "@/types/properties.types";
import { Button } from "./ui/button";
import { FaShare } from "react-icons/fa";

export default function ShareButtons({ property }: { property: TProperty }) {
  return (
    <Button className='bg-orange-500 hover:bg-orange-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'>
      <FaShare className='mr-2'></FaShare> Share Property
    </Button>
  );
}
