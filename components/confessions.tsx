import React from "react";
import { Code } from "lucide-react";

import { Weapons } from "@/lib/utils";
import { getConfessions } from "@/lib/appwrite";

export function ConfessionItem({
  name,
  weapon,
  confession,
}: Partial<Confession>) {
  const WeaponIcon =
    Weapons.find((item) => item.title === weapon)?.icon || Code;

  return (
    <article>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden font-mono border border-gray-200">
        <div className="flex items-center justify-between px-4 py-2 bg-gray-100 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-gray-500 text-sm lowercase">
            {weapon?.replaceAll(" ", "")}
            .sh
          </div>
        </div>
        <div className="p-4 space-y-2">
          <div className="flex items-center text-green-600">
            <span className="mr-2">$</span>
            <span className="font-bold">{name}</span>
            <WeaponIcon className="h-4 w-4 ml-2" />
          </div>
          <div className="text-gray-700 whitespace-pre-wrap">
            <span className="mr-2">&gt;</span>
            {confession}
          </div>
        </div>
      </div>
    </article>
  );
}

async function Confessions() {
  const allConfessions = await getConfessions();

  return (
    <section className="my-10 flex gap-5 flex-col">
      <h3 className="text-2xl font-bold">All Confessions</h3>

      {allConfessions.map((confession) => (
        <ConfessionItem
          key={confession.$id}
          name={confession.name}
          weapon={confession.weapon}
          confession={confession.confession}
        />
      ))}
    </section>
  );
}

export default Confessions;
