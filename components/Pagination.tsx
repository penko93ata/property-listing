import { twMerge } from "tailwind-merge";
import {
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination as UIPagination,
} from "./ui/pagination";

type PaginationProps = {
  page: number;
  pageSize: number;
  totalItems: number;
};

function paginate({ currentPage, totalPages }: { currentPage: number; totalPages: number }) {
  if (!currentPage || !totalPages) return null;

  let prev = currentPage === 1 ? null : currentPage - 1,
    next = currentPage === totalPages ? null : currentPage + 1,
    items: (string | number)[] = [1];

  if (currentPage === 1 && totalPages === 1) return { currentPage, prev, next, items };
  if (currentPage > 4) items.push("…");

  let r = 2,
    r1 = currentPage - r,
    r2 = currentPage + r;

  for (let i = r1 > 2 ? r1 : 2; i <= Math.min(totalPages, r2); i++) items.push(i);

  if (r2 + 1 < totalPages) items.push("…");
  if (r2 < totalPages) items.push(totalPages);

  return { currentPage, prev, next, items };
}

export default function Pagination({ page, pageSize, totalItems }: PaginationProps) {
  const totalPages = Math.ceil(totalItems / pageSize);

  const showPagination = totalItems > pageSize;

  const pagination = paginate({ currentPage: Number(page), totalPages: totalPages });

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

        {pagination?.items.map((item, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              href={`/properties?page=${Number(item)}`}
              className={twMerge(
                "px-2 py-1 border border-gray-300 rounded-md",
                item === pagination?.currentPage && "bg-gray-300",
                item === "…" && "pointer-events-none opacity-50"
              )}
              isActive={item === pagination?.currentPage}
            >
              {item}
            </PaginationLink>
          </PaginationItem>
        ))}

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
