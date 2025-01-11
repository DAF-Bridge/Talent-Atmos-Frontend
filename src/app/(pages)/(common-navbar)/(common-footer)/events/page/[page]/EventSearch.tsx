"use client";

import { SearchIcon, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";

export function EventSearch({ defaultValue = "" }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(defaultValue);

  const handleSearchRedirect = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    window.location.href = `/events/page/1?${params.toString()}`;
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
        className="flex-grow h-[48px] w-full px-4 py-2 placeholder:text-gray-inactive placeholder:font-light text-gray-700 bg-transparent outline-none"
      />
      {searchTerm && (
        <button
          onClick={handleClearInput}
          className="absolute top-1/2 transform -translate-y-1/2 right-[50px] h-[30px] w-[30px] flex items-center justify-center rounded-full bg-white"
        >
          <X className="h-[18px] w-[18px] text-gray-inactive" />
        </button>
      )}
      <div className="bg-white absolute top-0 rounded-r-full pr-1 right-0 h-[48px] w-[55px] flex items-center justify-end">
        <button
          onClick={() => handleSearchRedirect(searchTerm)}
          className="flex justify-center items-center h-[40px] w-[40px] rounded-full hover:bg-slate-200"
        >
          <SearchIcon className="h-[18px] w-[18px] text-gray-inactive" />
        </button>
      </div>
    </div>
  );
}
