import { Suspense } from "react";
import { Models } from "node-appwrite";

import {
  filterConfessions,
  getConfessions,
  searchConfessions,
} from "@/lib/appwrite";

import Search from "./search";
import Filter from "./filter";
import { ConfessionItem } from "@/components/confessions";

interface SearchParams {
  [key: string]: string | undefined;
}

async function ConfessionsList({
  query,
  filter,
}: {
  query?: string;
  filter?: string;
}) {
  let results: Models.Document[] = [];

  if (query) {
    results = await searchConfessions(query);
  } else if (filter) {
    results = await filterConfessions(filter);
  } else {
    results = await getConfessions();
  }

  return (
    <>
      {results.length > 0 ? (
        results.map((confession) => (
          <ConfessionItem
            key={confession.$id}
            name={confession.name}
            weapon={confession.weapon}
            confession={confession.confession}
          />
        ))
      ) : (
        <p>No results found.</p>
      )}
    </>
  );
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { query, filter } = await searchParams;

  return (
    <div className="flex flex-col gap-4 mb-8">
      <Search />
      <Filter />

      <section className="my-10 flex gap-5 flex-col">
        <h3 className="text-2xl font-bold">
          {query
            ? `Search Results for "${query}"`
            : filter
            ? `Filtered by ${filter}`
            : "All Confessions"}
        </h3>
        <Suspense fallback={<p>Loading...</p>}>
          <ConfessionsList query={query} filter={filter} />
        </Suspense>
      </section>
    </div>
  );
}
