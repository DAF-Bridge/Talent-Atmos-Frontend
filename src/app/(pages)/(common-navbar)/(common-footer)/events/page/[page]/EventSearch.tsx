"use client";

import { Search as SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { debounce } from "lodash";

export function EventSearch({ defaultValue = "" }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(defaultValue);

  const debouncedSearch = useCallback(
    debounce((term: string) => {
      const params = new URLSearchParams(searchParams);
      if (term) {
        params.set("search", term);
      } else {
        params.delete("search");
      }
      router.push(`/events/page/1?${params.toString()}`);
    }, 300),
    [searchParams]
  );

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    debouncedSearch(term);
  };

  return (
    <div className="flex-grow bg-white relative max-w-[455px] border border-gray-300 rounded-full">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="ค้นหาคีย์เวิร์ด"
        className="flex-grow h-[48px] w-full px-4 py-2 placeholder:text-gray-inactive placeholder:font-light text-gray-700 bg-transparent outline-none"
      />
      <div className="bg-white absolute top-0 rounded-r-full pr-1 right-0 h-[48px] w-[55px] flex items-center justify-end">
        <div className="flex justify-center items-center h-[40px] w-[40px] rounded-full">
          <SearchIcon className="h-[18px] w-[18px] text-gray-inactive" />
        </div>
      </div>
    </div>
  );
}
