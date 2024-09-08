import Link from "next/link";

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
    <section className='container mx-auto flex justify-center items-center my-8'>
      {page > 1 && (
        <Link href={`/properties?page=${Number(page) - 1}`} className='mr-2 px-2 py-1 border border-gray-300 rounded-md'>
          Previous
        </Link>
      )}

      <span className='mx-2'>
        Page {page} of {totalPages}
      </span>

      {page < totalPages && (
        <Link href={`/properties?page=${Number(page) + 1}`} className='ml-2 px-2 py-1 border border-gray-300 rounded-md'>
          Next
        </Link>
      )}
    </section>
  );
}
