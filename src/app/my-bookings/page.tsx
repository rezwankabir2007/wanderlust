import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import BookingCard, {
  type Booking,
} from "@/components/BookingCard";

const MyBookingPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user?.email) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="mx-auto max-w-5xl rounded-xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-semibold text-gray-900">
            My Bookings
          </h1>
          <p className="mt-3 text-sm text-gray-500">
            Please log in to view your bookings.
          </p>
        </div>
      </main>
    );
  }

  let bookings: Booking[] = [];

  try {
    const res = await fetch(
      `http://localhost:8000/my-bookings/${encodeURIComponent(user.email)}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch bookings: ${res.status}`);
    }

    const result = await res.json();

    bookings = Array.isArray(result)
      ? result
      : Array.isArray(result.bookings)
        ? result.bookings
        : [];
  } catch (error) {
    console.error("Failed to load bookings:", error);
  }

 const handleCancleBooking = async (booking: Booking) => {
   const res = await fetch(`http://localhost:8000/my-bookings/${booking._id}`)
 }

  return (
    <main className="min-h-screen bg-white px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-5xl">
        {/* Page Header */}
        <div className="mb-5">
          <h1 className="text-2xl font-medium tracking-tight text-gray-900">
            My Bookings
          </h1>
          <p className="mt-1 text-xs text-gray-500">
            Manage and view your upcoming travel plans
          </p>
        </div>

        {/* Booking List */}
        {bookings.length > 0 ? (
          <div className="space-y-3">
            {bookings.map((booking, index) => (
              <BookingCard
                key={booking._id || booking.bookingId || index}
                booking={booking}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-gray-200 px-5 py-12 text-center">
            <h2 className="text-lg font-semibold text-gray-800">
              No bookings found
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Your bookings will appear here after you book a trip.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default MyBookingPage;