"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  totalPages: number;
  isLoading: boolean;
}

export default function ListPagination({
  totalPages,
  isLoading,
}: Readonly<PaginationProps>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const handlePageChange = (page: number) => {
    // Only navigate if not currently loading events
    if (!isLoading) {
      router.push(`?page=${page}`);
    }
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1 && !isLoading)
                handlePageChange(currentPage - 1);
            }}
            className={
              currentPage === 1 || isLoading
                ? "pointer-events-none opacity-50"
                : ""
            }
          />
        </PaginationItem>
        {[...Array(totalPages)].slice(0, 5).map((_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              isActive={currentPage === i + 1}
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(i + 1);
              }}
              className={isLoading ? "opacity-50 pointer-events-none" : ""}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        {totalPages > 5 && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(totalPages);
                }}
                className={isLoading ? "opacity-50 pointer-events-none" : ""}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages && !isLoading)
                handlePageChange(currentPage + 1);
            }}
            className={
              currentPage === totalPages || isLoading
                ? "pointer-events-none opacity-50"
                : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
