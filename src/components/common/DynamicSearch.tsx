"use client";

import { useRouter } from "@/i18n/routing";
import { SearchIcon, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import LoadingCover from "./LoadingCover";

interface DynamicSearchBarProps {
  type: "events" | "jobs" | "orgs";
  defaultValue: string;
}

export function DynamicSearchBar({
  defaultValue = "",
  type,
}: Readonly<DynamicSearchBarProps>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(defaultValue);
  const [isPending, startTransition] = useTransition();
  const activeSearchTerm = searchParams.get("search");

  const handleSearchRedirect = (term: string) => {
    if (searchTerm === "" && activeSearchTerm === "") return;

    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }

    startTransition(() => {
      router.push(`/${type}/page/1?${params.toString()}`);
      router.refresh();
    });
  };

  // Set the search term on input change
  const handleInputChange = (term: string) => {
    setSearchTerm(term);
  };

  // Perform search on Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchRedirect(searchTerm); // Perform search on Enter key
    }
  };

  // Clear the search input only when search term is active
  const handleClearInput = () => {
    setSearchTerm("");
    if (defaultValue) {
      handleSearchRedirect("");
    }
  };

  return (
    <div className="flex-grow bg-white relative w-full max-w-[455px] border border-gray-300 rounded-full">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => handleInputChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="ค้นหาคีย์เวิร์ด"
        disabled={isPending}
        className="flex-grow h-[40px] md:h-[46px] w-full px-4 placeholder:text-gray-inactive 
        placeholder:font-light text-gray-700 bg-transparent outline-none"
      />
      {searchTerm && (
        <button
          onClick={handleClearInput}
          disabled={isPending}
          className="absolute top-1/2 transform -translate-y-1/2 right-[50px] h-[30px] w-[30px] 
          flex items-center justify-center rounded-full bg-white"
        >
          <X className="h-[18px] w-[18px] text-gray-inactive" />
        </button>
      )}
      <div
        className="bg-white absolute top-0 rounded-r-full md:pr-1 right-0 h-[40px] md:h-[46px] 
      w-[55px] flex items-center justify-end"
      >
        <button
          onClick={() => handleSearchRedirect(searchTerm)}
          disabled={isPending}
          className={`flex justify-center items-center h-[40px] w-[40px] rounded-full hover:bg-slate-200 ${
            isPending ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <SearchIcon className="h-[18px] w-[18px] text-gray-inactive" />
        </button>
      </div>
      {
        // Loading cover
        isPending && <LoadingCover />
      }
    </div>
  );
}
