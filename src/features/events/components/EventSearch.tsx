"use client";

import LoadingCover from "@/components/common/LoadingCover";
import { useRouter } from "@/i18n/routing";
import { SearchIcon, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRef, useState, useTransition } from "react";

export function EventSearch({ defaultValue = "" }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(defaultValue);
  const [isPending, startTransition] = useTransition();

  const handleSearchRedirect = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }

    startTransition(() => {
      router.push(`/events/page/1?${params.toString()}`);
      router.refresh();
    });
  };

  const handleInputChange = (term: string) => {
    setSearchTerm(term);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchRedirect(searchTerm); // Perform search on Enter key
    }
  };

  const handleClearInput = () => {
    setSearchTerm(""); // Clear the input
    inputRef.current?.focus();
  };

  return (
    <div className="flex-grow bg-white relative max-w-[455px] border border-gray-300 rounded-full">
      <input
        ref={inputRef}
        type="text"
        value={searchTerm}
        onChange={(e) => handleInputChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="ค้นหาคีย์เวิร์ด"
        disabled={isPending}
        className="flex-grow h-[40px] md:h-[46px] w-full px-4 placeholder:text-gray-inactive placeholder:font-light text-gray-700 bg-transparent outline-none"
      />
      {searchTerm && (
        <button
          onClick={handleClearInput}
          disabled={isPending}
          className="absolute top-1/2 transform -translate-y-1/2 right-[50px] h-[30px] w-[30px] flex items-center justify-center rounded-full bg-white"
        >
          <X className="h-[18px] w-[18px] text-gray-inactive" />
        </button>
      )}
      <div className="bg-white absolute top-0 rounded-r-full md:pr-1 right-0 h-[40px] md:h-[46px] w-[55px] flex items-center justify-end">
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
