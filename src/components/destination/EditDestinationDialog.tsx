
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { PencilIcon, SaveIcon, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const categories = [
  "Beach",
  "Mountain",
  "City",
  "Adventure",
  "Honeymoon",
  "Wildlife",
];

type Destination = {
  _id: string;
  name: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
};

type PackageForm = Omit<Destination, "_id">;

type EditDestinationDialogProps = {
  destination: Destination;
};

export default function EditDestinationDialog({
  destination,
}: EditDestinationDialogProps) {
  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const initialForm: PackageForm = {
    name: destination.name,
    country: destination.country,
    category: destination.category,
    price: String(destination.price),
    duration: destination.duration,
    departureDate: destination.departureDate,
    imageUrl: destination.imageUrl,
    description: destination.description,
  };

  const [form, setForm] =
    React.useState<PackageForm>(initialForm);

  function update(field: keyof PackageForm, value: string) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function reset() {
    setForm({
      name: destination.name,
      country: destination.country,
      category: destination.category,
      price: String(destination.price),
      duration: destination.duration,
      departureDate: destination.departureDate,
      imageUrl: destination.imageUrl,
      description: destination.description,
    });

    setError("");
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `http://localhost:8000/destination/${destination._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update destination");
      }

      setOpen(false);
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);

        if (value) {
          reset();
        }
      }}
    >
      <DialogTrigger className="inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
        <PencilIcon className="size-4" />
        Edit
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Destination</DialogTitle>
          <DialogDescription>
            Update the destination information below.
          </DialogDescription>
        </DialogHeader>

        <Card className="border-0 shadow-none">
          <CardContent className="p-0">
            <form
              className="space-y-5"
              onSubmit={handleSubmit}
            >
              <div className="space-y-1.5">
                <Label htmlFor="name">
                  Destination Name
                </Label>

                <Input
                  id="name"
                  placeholder="Bali Paradise"
                  value={form.name}
                  onChange={(event) =>
                    update("name", event.target.value)
                  }
                  required
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="country">Country</Label>

                  <Input
                    id="country"
                    placeholder="Indonesia"
                    value={form.country}
                    onChange={(event) =>
                      update("country", event.target.value)
                    }
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="category">Category</Label>

                  <Select
                    value={form.category}
                    onValueChange={(value) =>
                      update("category", value ?? "")
                    }
                    required
                  >
                    <SelectTrigger
                      id="category"
                      className="w-full"
                    >
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>

                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          key={category}
                          value={category}
                        >
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="price">Price (USD)</Label>

                  <Input
                    id="price"
                    type="number"
                    min="0"
                    placeholder="1299"
                    value={form.price}
                    onChange={(event) =>
                      update("price", event.target.value)
                    }
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="duration">Duration</Label>

                  <Input
                    id="duration"
                    placeholder="7 Days / 6 Nights"
                    value={form.duration}
                    onChange={(event) =>
                      update("duration", event.target.value)
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="departureDate">
                  Departure Date
                </Label>

                <Input
                  id="departureDate"
                  type="date"
                  value={form.departureDate}
                  onChange={(event) =>
                    update("departureDate", event.target.value)
                  }
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="imageUrl">Image URL</Label>

                <Input
                  id="imageUrl"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={form.imageUrl}
                  onChange={(event) =>
                    update("imageUrl", event.target.value)
                  }
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="description">
                  Description
                </Label>

                <Textarea
                  id="description"
                  placeholder="Describe the travel experience..."
                  className="min-h-32"
                  value={form.description}
                  onChange={(event) =>
                    update("description", event.target.value)
                  }
                  required
                />
              </div>

              {error && (
                <p className="text-sm text-red-500">
                  {error}
                </p>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="gap-2"
                  onClick={() => {
                    reset();
                    setOpen(false);
                  }}
                  disabled={loading}
                >
                  <XIcon className="size-4" />
                  Cancel
                </Button>

                <Button
                  type="submit"
                  className="gap-2 bg-cyan-600 text-white hover:bg-cyan-700"
                  disabled={loading}
                >
                  <SaveIcon className="size-4" />
                  {loading ? "Updating..." : "Update Destination"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
