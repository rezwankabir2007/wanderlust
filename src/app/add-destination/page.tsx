"use client";

import * as React from "react"
import { useRouter } from "next/navigation"
import { PackagePlusIcon, Trash2Icon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { authClient } from "@/lib/auth-client";

const categories = [
  "Beach",
  "Mountain",
  "City",
  "Adventure",
  "Honeymoon",
  "Wildlife",
]

type PackageForm = {
  name: string
  country: string
  category: string
  price: string
  duration: string
  departureDate: string
  imageUrl: string
  description: string
}

const initialForm: PackageForm = {
  name: "",
  country: "", 
  category: "",
  price: "",
  duration: "",
  departureDate: "",
  imageUrl: "",
  description: "",
}

export default function AddDestinationPage(){
  const [form, setForm] = React.useState<PackageForm>(initialForm)
  const router = useRouter()

  function update(field: keyof PackageForm, value: string) {
    setForm((previous) => ({ ...previous, [field]: value }))
  }

  function reset() {
    setForm(initialForm)
  }

  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  try {
    // Better Auth ক্লায়েন্ট সেশন থেকে কুকি পাস করা
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-destination`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form)
    });

    // যদি ৪০১ আসে তবে ফ্রন্টএন্ড বুঝতে পারবে ইউজার লগইন নেই বা টোকেন ইস্যু
    if (!res.ok) {
      const errorText = await res.text();
      console.error("Backend response error:", errorText);
      alert("Failed to add destination. Status: " + res.status);
      return;
    }

    const result = await res.json();
    console.log("Success:", result);

    router.push("/");
  } catch (error) {
    console.error("Fetch error:", error);
  }
}


  return (
    <div className="px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="font-heading text-4xl text-gray-900 sm:text-5xl">
          Add New Travel Package
        </h1>
        <Card className="mx-auto mt-10 w-full max-w-2xl">
          <CardContent className="p-6 sm:p-10">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-1.5">
                <Label htmlFor="name">Destination Name</Label>
                <Input
                  id="name"
                  placeholder="Bali Paradise"
                  className="h-10"
                  value={form.name}
                  onChange={(event) => update("name", event.target.value)}
                  required
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    placeholder="Indonesia"
                    className="h-10"
                    value={form.country}
                    onChange={(event) => update("country", event.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={form.category ? form.category : undefined}
                    onValueChange={(value) =>
                      update("category", String(value ?? ""))
                    }
                  >
                    <SelectTrigger id="category" className="h-10 w-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
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
                    min={0}
                    placeholder="e.g., 1299"
                    className="h-10"
                    value={form.price}
                    onChange={(event) => update("price", event.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    placeholder="e.g., 7 Days/6 Nights"
                    className="h-10"
                    value={form.duration}
                    onChange={(event) => update("duration", event.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="departureDate">Departure Date</Label>
                <Input
                  id="departureDate"
                  type="date"
                  className="h-10"
                  value={form.departureDate}
                  onChange={(event) =>
                    update("departureDate", event.target.value)
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  className="h-10"
                  value={form.imageUrl}
                  onChange={(event) => update("imageUrl", event.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the travel experience..."
                  className="min-h-32"
                  value={form.description}
                  onChange={(event) => update("description", event.target.value)}
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="h-10 gap-2 border-red-200 text-red-600 hover:bg-red-50"
                  onClick={reset}
                >
                  <Trash2Icon className="size-4" /> Cancel
                </Button>
                <Button
                  type="submit"
                  className="h-10 gap-2 bg-cyan-600 text-white hover:bg-cyan-700"
                >
                  <PackagePlusIcon className="size-4" /> Add Travel Package
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}