import { twMerge } from "tailwind-merge";
import { PaginationContent, PaginationItem, PaginationNext, PaginationPrevious, Pagination as UIPagination } from "./ui/pagination";

type PaginationProps = {
  page: number;
  pageSize: number;
  totalItems: number;
};

export default function Pagination({ page, pageSize, totalItems }: PaginationProps) {
  const totalPages = Math.ceil(totalItems / pageSize);

  const showPagination = totalItems > pageSize;

  if (!showPagination) return null;

  return (
    <UIPagination>
      <PaginationContent className='container mx-auto flex justify-center items-center my-8'>
        <PaginationItem>
          <PaginationPrevious
            aria-disabled={page <= 1}
            tabIndex={page <= 1 ? -1 : undefined}
            href={`/properties?page=${Number(page) - 1}`}
            className={twMerge("mr-2 px-2 py-1 border border-gray-300 rounded-md", page <= 1 && "pointer-events-none opacity-50")}
          />
        </PaginationItem>

        <span className='mx-2'>
          Page {page} of {totalPages}
        </span>

        <PaginationItem>
          <PaginationNext
            aria-disabled={page >= totalPages}
            tabIndex={page >= totalPages ? -1 : undefined}
            href={`/properties?page=${Number(page) + 1}`}
            className={twMerge("ml-2 px-2 py-1 border border-gray-300 rounded-md", page >= totalPages && "pointer-events-none opacity-50")}
          />
        </PaginationItem>
      </PaginationContent>
    </UIPagination>
  );
}
