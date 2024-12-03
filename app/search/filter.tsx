"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Weapons } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function Filter() {
  const searchParams = useSearchParams();
  const [selectedFilter, setSelectedFilter] = useState<string | null>(
    searchParams.get("filter")
  );

  // TODO: Implement useDeferredValue

  const handleFilterClick = (weapon: string) => {
    setSelectedFilter((prevFilter) => (prevFilter === weapon ? null : weapon));
  };

  return (
    <div className="flex flex-wrap gap-2">
      {Weapons.map((weapon) => (
        <Button
          size="sm"
          key={weapon.title}
          variant={selectedFilter === weapon.title ? "secondary" : "default"}
          onClick={() => handleFilterClick(weapon.title)}
        >
          <weapon.icon className="mr-0.5" size={16} />
          {weapon.title}
        </Button>
      ))}
    </div>
  );
}
