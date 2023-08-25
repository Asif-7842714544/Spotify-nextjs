"use client";
import qs from "query-string";
import useDebounce from "@/hooks/useDeBounce";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function SearchInput() {
  const router = useRouter();
  const [value, setvalue] = useState<string>("");
  const debouncedValue = useDebounce<string>(value, 500);

  useEffect(() => {
    const query = { title: debouncedValue };
    const url = qs.stringifyUrl({ url: "/search", query: query });
    router.push(url);
  }, [debouncedValue, router]);

  return (
    <div>
      <input
        type="text"
        id="title"
        onChange={(e) => setvalue(e.target.value)}
        placeholder="what do you want to listen?.."
        className="focus:outline-none flex w-full rounded-md
           bg-neutral-700 border border-transparent p-3 text-sm file:border-0 
            placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 "
      />
    </div>
  );
}

export default SearchInput;
