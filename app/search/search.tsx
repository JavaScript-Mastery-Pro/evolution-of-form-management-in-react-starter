"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";

export default function Search() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("query") || ""
  );

  // TODO: Implement useTransition hook
  const isPending = false;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Implement transition
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <Input
        type="search"
        placeholder="Search confessions..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-grow"
      />
      <Button type="submit" disabled={isPending}>
        {isPending ? (
          "Searching..."
        ) : (
          <>
            <SearchIcon className="mr-2 h-4 w-4" />
            Search
          </>
        )}
      </Button>
    </form>
  );
}
