/** @format */
"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

import SearchIcon from "./svgs/SearchIcon";

interface ISearchInput {
  placeholder: string;
  size?: "sm" | "md";
  filter?: boolean;
  handleFilter?: (term: string) => void;
}

const SearchInput = ({
  placeholder,
  size = "md",
  filter = false,
  handleFilter,
}: ISearchInput) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  let inputClassName;
  let searchIconClassName;

  if (size === "sm") {
    inputClassName = "h-[30px] rounded-[4px] pl-[26px] placeholder:font-normal";
    searchIconClassName = "top-2 left-2";
  } else {
    inputClassName = "h-12 rounded-lg pl-[50px] placeholder:font-medium";
    searchIconClassName = "top-3 left-5";
  }

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(`${searchParams}`);
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative">
      <SearchIcon
        className={`absolute ${searchIconClassName}`}
        stroke="#667085"
        size={size}
      />
      <input
        className={`${inputClassName} border-grey-4 border-[1px] placeholder:text-grey-5 focus:outline-primary-light-1 w-full`}
        type="text"
        placeholder={placeholder}
        onChange={(e) => {
          filter
            ? handleFilter?.(e.target.value)
            : handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
      />
    </div>
  );
};

export default SearchInput;
