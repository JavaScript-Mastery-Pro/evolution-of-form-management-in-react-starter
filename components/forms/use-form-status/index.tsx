import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { Weapons } from "@/lib/utils";
import { createConfession } from "@/lib/appwrite";

async function formAction(formData: FormData) {
  "use server";

  const name = formData.get("name") as string;
  const weapon = formData.get("weapon") as string;
  const confession = formData.get("confession") as string;

  try {
    const result = await createConfession(name, weapon, confession);
    if (!result) throw new Error("Failed to create confession");
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";

    console.log(errorMessage);
  }
}

function UseFormStatusForm() {
  return (
    <form
      action={formAction}
      className="space-y-8 p-7 mb-7 bg-zinc-50 rounded-lg"
    >
      <h3 className="text-2xl font-bold">Share Your Confession</h3>

      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium text-gray-700">
          Secret Code Name
        </Label>
        <Input
          id="name"
          name="name"
          placeholder="e.g., Lord of the Pings, Darth Coder"
          className="border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="weapon" className="text-sm font-medium text-gray-700">
          Weapon of Choice for Debugging
        </Label>
        <Select name="weapon" required>
          <SelectTrigger className="border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
            <SelectValue placeholder="Select your debugging weapon" />
          </SelectTrigger>
          <SelectContent>
            {Weapons.map((weapon) => (
              <SelectItem key={weapon.title} value={weapon.title}>
                <span className="flex items-center">
                  <weapon.icon className="mr-2 h-4 w-4" />
                  {weapon.title}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label
          htmlFor="confession"
          className="text-sm font-medium text-gray-700"
        >
          Confession to the Rubber Duck
        </Label>
        <Textarea
          id="confession"
          name="confession"
          placeholder="Confess your most embarrassing bug or your weirdest coding habit"
          className="min-h-[100px] border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          required
        />
      </div>

      {/* TODO: Separate the form buttons to use useFormStatus */}
      <div className="flex justify-end space-x-4">
        <Button type="reset" variant="outline" className="px-8">
          Clear
        </Button>
        <Button
          type="submit"
          className="bg-black hover:bg-gray-800 text-white px-8"
        >
          Submit
        </Button>
      </div>
    </form>
  );
}

export default UseFormStatusForm;
