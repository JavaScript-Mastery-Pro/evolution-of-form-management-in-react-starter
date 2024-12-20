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
    <form action={formAction} className="form">
      <h3 className="heading">Share Your Confession</h3>

      <div className="space-y-2">
        <Label htmlFor="name" className="label">
          Secret Code Name
        </Label>
        <Input
          id="name"
          name="name"
          placeholder="e.g., Lord of the Pings, Darth Coder"
          className="input"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="weapon" className="label">
          Weapon of Choice for Debugging
        </Label>
        <Select name="weapon" required>
          <SelectTrigger className="select">
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
        <Label htmlFor="confession" className="label">
          Confession to the Rubber Duck
        </Label>
        <Textarea
          id="confession"
          name="confession"
          placeholder="Confess your most embarrassing bug or your weirdest coding habit"
          className="textarea"
          required
        />
      </div>

      {/* TODO: Separate the form buttons to use useFormStatus */}
      <div className="flex justify-end space-x-4">
        <Button type="reset" variant="outline" className="btn-clear">
          Clear
        </Button>
        <Button type="submit" className="btn">
          Submit
        </Button>
      </div>
    </form>
  );
}

export default UseFormStatusForm;
