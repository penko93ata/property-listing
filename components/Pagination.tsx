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
        {page > 1 && (
          <PaginationItem>
            <PaginationPrevious
              href={`/properties?page=${Number(page) - 1}`}
              className='mr-2 px-2 py-1 border border-gray-300 rounded-md'
            />
          </PaginationItem>
        )}

        <span className='mx-2'>
          Page {page} of {totalPages}
        </span>

        {page < totalPages && (
          <PaginationItem>
            <PaginationNext href={`/properties?page=${Number(page) + 1}`} className='ml-2 px-2 py-1 border border-gray-300 rounded-md' />
          </PaginationItem>
        )}
      </PaginationContent>
    </UIPagination>
  );
}
