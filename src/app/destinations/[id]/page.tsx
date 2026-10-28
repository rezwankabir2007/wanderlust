import DeleteDestinationDialog from "@/components/destination/DeleteDestinationDialog";
import EditDestinationDialog from "@/components/destination/EditDestinationDialog";
import BookTripButton from "@/components/booking/BookTripButton";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

export const dynamic = "force-dynamic";

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

const DestinationDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;


  // Fetch token securely

  const tokenString = await getTokenFromServer()

  // Send request with Bearer authorization header
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/destination/${id}`,
    {
      headers: {
        authorization: tokenString ? `Bearer ${tokenString}` : "",
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Backend Error Status:", res.status);
    console.error("Backend Error Message:", errorText);
    throw new Error(`Failed to fetch destination: ${res.status} ${errorText}`);
  }

  const destination: Destination = await res.json();

  return (
    <main className="min-h-screen bg-[#f7f9fc] px-4 py-6 text-gray-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-5 flex items-center justify-between gap-3">
          <Link
            href="/destinations"
            className="group flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-cyan-700"
          >
            <span className="transition group-hover:-translate-x-1">
              ←
            </span>
            Back to Destinations
          </Link>

          <div className="flex shrink-0 items-center gap-2">
            <EditDestinationDialog destination={destination} />
            <DeleteDestinationDialog id={id} />
          </div>
        </div>

        <section className="relative h-[280px] overflow-hidden rounded-2xl bg-gray-200 shadow-sm sm:h-[380px] lg:h-[440px]">
          <Image
            src={destination.imageUrl}
            alt={destination.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1152px"
            className="object-cover transition duration-700 hover:scale-[1.02]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              {destination.category}
            </span>

            <h1 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {destination.name}
            </h1>

            <p className="mt-3 flex items-center gap-2 text-sm text-white/90 sm:text-base">
              <span>📍</span>
              {destination.country}
            </p>
          </div>
        </section>

        <div className="mt-7 grid items-start gap-7 lg:grid-cols-3">
          <div className="space-y-7 lg:col-span-2">
            <section className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-lg">
                  🌍
                </div>
                <p className="text-xs text-gray-500">Destination</p>
                <p className="mt-1 font-semibold">
                  {destination.country}
                </p>
              </div>

              <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-lg">
                  🗓️
                </div>
                <p className="text-xs text-gray-500">Trip Duration</p>
                <p className="mt-1 font-semibold">
                  {destination.duration}
                </p>
              </div>

              <div className="col-span-2 rounded-xl border border-gray-100 bg-white p-4 shadow-sm sm:col-span-1">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-lg">
                  ✈️
                </div>
                <p className="text-xs text-gray-500">Departure Date</p>
                <p className="mt-1 font-semibold">
                  {destination.departureDate}
                </p>
              </div>
            </section>

            <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
              <div className="mb-5 flex items-center gap-3">
                <div className="h-8 w-1 rounded-full bg-cyan-500" />
                <h2 className="text-xl font-bold">Overview</h2>
              </div>

              <p className="text-sm leading-7 text-gray-600 sm:text-base">
                {destination.description}
              </p>
            </section>

            <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
              <h2 className="mb-5 text-xl font-bold">
                Trip Information
              </h2>

              <div className="divide-y divide-gray-100">
                <div className="flex items-center justify-between gap-4 py-4">
                  <span className="text-sm text-gray-500">Country</span>
                  <span className="text-right text-sm font-semibold">
                    {destination.country}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 py-4">
                  <span className="text-sm text-gray-500">Category</span>
                  <span className="text-right text-sm font-semibold">
                    {destination.category}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 py-4">
                  <span className="text-sm text-gray-500">Duration</span>
                  <span className="text-right text-sm font-semibold">
                    {destination.duration}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 py-4">
                  <span className="text-sm text-gray-500">Departure</span>
                  <span className="text-right text-sm font-semibold">
                    {destination.departureDate}
                  </span>
                </div>
              </div>
            </section>
          </div>

          <aside className="lg:sticky lg:top-6">
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg shadow-gray-200/50">
              <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-5 text-white">
                <p className="text-sm text-white/80">
                  Your next adventure starts here
                </p>

                <div className="mt-3 flex items-end gap-2">
                  <h2 className="text-3xl font-bold tracking-tight">
                    ৳{Number(destination.price).toLocaleString("en-BD")}
                  </h2>
                </div>

                <p className="mt-1 text-xs text-white/80">
                  Price per person
                </p>
              </div>

              <div className="p-5 sm:p-6">
                <h3 className="text-lg font-bold">Trip Summary</h3>

                <div className="mt-5 space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-50">
                      📍
                    </span>
                    <div>
                      <p className="text-xs text-gray-500">Destination</p>
                      <p className="mt-1 text-sm font-semibold">
                        {destination.country}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-50">
                      🗓️
                    </span>
                    <div>
                      <p className="text-xs text-gray-500">Departure Date</p>
                      <p className="mt-1 text-sm font-semibold">
                        {destination.departureDate}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50">
                      ⏱️
                    </span>
                    <div>
                      <p className="text-xs text-gray-500">Duration</p>
                      <p className="mt-1 text-sm font-semibold">
                        {destination.duration}
                      </p>
                    </div>
                  </div>
                </div>

                <BookTripButton destination={destination} />

                <p className="mt-4 text-center text-xs leading-5 text-gray-400">
                  Explore new places and make unforgettable memories.
                </p>

                <div className="my-5 border-t border-gray-100" />

                <div className="space-y-3 text-sm text-gray-600">
                  <p className="flex items-center gap-2">
                    <span className="text-emerald-500">✓</span>
                    Explore unique destinations
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-emerald-500">✓</span>
                    Discover local experiences
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-emerald-500">✓</span>
                    Plan your next adventure
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-8 border-t border-gray-200 py-6">
          <Link
            href="/destinations"
            className="text-sm font-medium text-cyan-700 transition hover:text-cyan-900"
          >
            ← Explore more destinations
          </Link>
        </div>
      </div>
    </main>
  );
};

export default DestinationDetailsPage;