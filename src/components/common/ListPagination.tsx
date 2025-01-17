"use client";

import { useParams, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";
import { useRouter } from "@/i18n/routing";

interface PaginationProps {
  type: "events" | "jobs" | "orgs";
  totalPages: number;
}

export default function ListPagination({
  type,
  totalPages,
}: Readonly<PaginationProps>) {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const { page } = params; // Extract 'page' from the dynamic route
  const [currentPage, setCurrentPage] = useState<number>(Number(page) || 1);

  // Update currentPage when page changes in the URL
  useEffect(() => {
    if (page) {
      setCurrentPage(Number(page));
    }
  }, [page]);

  const handlePageChange = (page: number) => {
    // Create URLSearchParams object from current search params
    const newSearchParams = new URLSearchParams(searchParams.toString());

    // Construct the base URL based on type
    const basePath = `/${type}/page/`;

    // Combine the path with the search parameters
    const newPath = `${basePath}${page}${
      newSearchParams.toString() ? `?${newSearchParams.toString()}` : ""
    }`;

    router.push(newPath);
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) handlePageChange(currentPage - 1);
            }}
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
              if (currentPage < totalPages) handlePageChange(currentPage + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
