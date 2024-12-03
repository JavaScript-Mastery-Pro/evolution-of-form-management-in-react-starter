import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Bug, Coffee, RotateCcw, Sparkles, Wand2 } from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const Weapons = [
  {
    title: "Coffee IV Drip",
    icon: Coffee,
  },
  {
    title: "Rubber Duck Army",
    icon: Bug,
  },
  {
    title: "Coding Magic Wand",
    icon: Wand2,
  },
  {
    title: "Ctrl+Z Time Machine",
    icon: RotateCcw,
  },
  {
    title: "Other Mystical Artifact",
    icon: Sparkles,
  },
];
