"use client";

import { useState } from "react";

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
import { createConfession } from "@/lib/appwrite";
import { toast } from "@/hooks/use-toast";
import { Weapons } from "@/lib/utils";
import { RefreshCcw } from "lucide-react";

function BasicForm() {
  const [name, setName] = useState("");
  const [weapon, setWeapon] = useState("");
  const [confession, setConfession] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const result = await createConfession(name, weapon, confession);
      if (!result)
        toast({
          title: "Something went wrong.",
          description: "Please try again.",
          variant: "destructive",
        });
    } catch (error: unknown) {
      toast({
        title: "Something went wrong.",
        description: error instanceof Error ? error.message : "",
        variant: "destructive",
      });
    } finally {
      setLoading(false);

      setName("");
      setWeapon("");
      setConfession("");
    }
  };

  const handleClear = () => {
    setName("");
    setWeapon("");
    setConfession("");
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h3 className="heading">Share Your Confession</h3>

      <div className="space-y-2">
        <Label htmlFor="name" className="label">
          Code Name
        </Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Lord of the Pings, Darth Coder"
          className="input"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="Weapon" className="label">
          Weapon of Choice
        </Label>
        <Select value={weapon} onValueChange={setWeapon} required>
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
          Your Confession
        </Label>
        <Textarea
          id="confession"
          value={confession}
          onChange={(e) => setConfession(e.target.value)}
          placeholder="Confess your most embarrassing bug or your weirdest coding habit"
          className="textarea"
          required
        />
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          onClick={handleClear}
          variant="outline"
          className="btn-clear"
        >
          Clear
        </Button>
        <Button
          type="submit"
          disabled={loading || !name || !weapon || !confession}
          className="btn"
        >
          {loading && <RefreshCcw className="mr-1 h-4 w-4 animate-spin" />}
          Submit
        </Button>
      </div>
    </form>
  );
}

export default BasicForm;
