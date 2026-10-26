
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export interface Booking {
  _id?: string;
  bookingId?: string;
  destinationId: string;
  destinationName: string;
  country?: string;
  imageUrl?: string;
  departureDate: string;
  bookingDate?: string;
  price: string | number;
  status?: string;
}

interface BookingCardProps {
  booking: Booking;
}

export default function BookingCard({ booking }: BookingCardProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const status = booking.status || "Confirmed";

  const formattedDate = booking.departureDate
    ? new Date(booking.departureDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Date not available";

  const handleCancelBooking = () => {
    if (!booking._id) {
      toast.error("Booking ID not found!");
      return;
    }

    if (loading) return;

    toast(
      ({ closeToast }) => (
        <div className="space-y-3">
          <p className="font-semibold text-gray-800">
            Cancel this booking?
          </p>

          <p className="text-sm text-gray-600">
            Are you sure you want to cancel this booking?
          </p>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                closeToast();
                void deleteBooking();
              }}
              className="rounded bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
            >
              Yes, Cancel
            </button>

            <button
              type="button"
              onClick={closeToast}
              className="rounded border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Keep Booking
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
      }
    );
  };

  const deleteBooking = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:8000/my-bookings/${booking._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to cancel booking");
      }

      if (data.deletedCount === 0) {
        toast.error("Booking not found!");
        return;
      }

      toast.success("Booking cancelled successfully!");
      router.refresh();
    } catch (error) {
      console.error("Cancel booking error:", error);

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
    <article className="flex flex-col gap-4 border border-gray-200 bg-white p-3 sm:flex-row sm:items-center">
      {/* Destination Image */}
      <Image
        src={booking.imageUrl || "/placeholder.png"}
        alt={booking.destinationName}
        width={500}
        height={300}
        className="h-40 w-full shrink-0 object-cover sm:h-[105px] sm:w-32"
      />

      {/* Booking Details */}
      <div className="min-w-0 flex-1">
        <span
          className={`inline-block rounded-full px-2 py-1 text-[10px] font-medium ${
            status.toLowerCase() === "confirmed"
              ? "bg-green-100 text-green-700"
              : "bg-orange-100 text-orange-700"
          }`}
        >
          {status}
        </span>

        <h2 className="mt-1 text-base font-semibold text-gray-900">
          {booking.destinationName}
        </h2>

        <p className="mt-1 text-xs text-gray-500">
          ▦ Departure: {formattedDate}
        </p>

        <p className="mt-1 text-xs text-gray-500">
          ▧ Booking ID: {booking.bookingId || booking._id || "N/A"}
        </p>

        <p className="mt-1 text-lg font-semibold text-cyan-600">
          ৳{booking.price}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex shrink-0 gap-2 sm:self-center">
        <button
          onClick={handleCancelBooking}
          type="button"
          disabled={loading}
          className="rounded border border-red-300 px-3 py-2 text-xs text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Cancelling..." : "Cancel"}
        </button>

        <Link
          href={`/destinations/${booking.destinationId}`}
          className="rounded bg-cyan-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-cyan-700"
        >
          View
        </Link>
      </div>
    </article>
  );
}
