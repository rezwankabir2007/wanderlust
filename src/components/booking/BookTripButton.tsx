
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

interface Destination {
  _id: string;
  name: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
}

interface BookTripButtonProps {
  destination: Destination;
}

export default function BookTripButton({
  destination,
}: BookTripButtonProps) {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [selectedDate, setSelectedDate] = useState(
    destination.departureDate?.slice(0, 10) || ""
  );

  const handleBooking = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!user?.email) {
      toast.error("Please login before booking!");
      return;
    }

    try {
      setLoading(true);

      const data = {
        username: user.name,
        email: user.email,
        image: user.image,
        destinationId: destination._id,
        destinationName: destination.name,
        country: destination.country,
        category: destination.category,
        price: destination.price,
        duration: destination.duration,
        imageUrl: destination.imageUrl,
        departureDate: selectedDate,
        bookingDate: new Date().toISOString(),
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const bookingRes = await res.json();

      if (!res.ok) {
        throw new Error(
          bookingRes.message || "Booking failed. Please try again."
        );
      }

      toast.success("🎉 Booking successful!");

      setTimeout(() => {
        router.push("/");
      }, 1200);
    } catch (error) {
      console.error("Booking error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleBooking} className="mt-5 space-y-4">
      {/* Departure Date Picker */}
      <div>
        <label
          htmlFor="departureDate"
          className="mb-2 block text-sm font-medium text-gray-600"
        >
          Departure Date
        </label>

        <input
          id="departureDate"
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          min={new Date().toISOString().slice(0, 10)}
          className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
          required
        />
      </div>

      {/* Book Now Button */}
      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 px-5 py-3.5 text-sm font-semibold text-white shadow-md shadow-cyan-600/20 transition hover:-translate-y-0.5 hover:bg-cyan-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Booking..." : "Book Now"}
        {!loading && <ArrowRight className="size-4" />}
      </button>
    </form>
  );
}
