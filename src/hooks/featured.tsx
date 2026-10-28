
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft, MapPin, CalendarDays, Star } from "lucide-react";

interface Destination {
  _id: string;
  name: string;
  country: string;
  price: string | number;
  duration: string;
  imageUrl: string;
  rating?: number;
}

const FeaturedDestinations = () => {
  const [data, setData] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/featured-destinations`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch destinations");
        }

        const result: Destination[] = await res.json();
        setData(result);
      } catch (err) {
        console.error("Featured destinations error:", err);
        setError("Destinations load kora jacche na.");
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const scrollCarousel = (direction: "left" | "right") => {
    if (!carouselRef.current) return;

    carouselRef.current.scrollBy({
      left:
        direction === "right"
          ? carouselRef.current.clientWidth * 0.8
          : -carouselRef.current.clientWidth * 0.8,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-white px-5 py-14 text-black sm:px-8 lg:px-14 lg:py-16">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">
              Featured Destinations
            </h2>

            <p className="mt-2 text-xs text-gray-500">
              Handpicked travel experiences for the adventure seekers
            </p>
          </div>

          <Link
            href="/destinations"
            className="hidden items-center gap-3 border border-sky-400 px-4 py-3 text-[10px] font-medium uppercase tracking-wider text-sky-600 transition hover:bg-sky-500 hover:text-white sm:flex"
          >
            All Destinations
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="animate-pulse">
                <div className="h-48 bg-gray-200 md:h-52" />
                <div className="mt-4 h-4 w-2/3 bg-gray-200" />
                <div className="mt-3 h-3 w-1/3 bg-gray-200" />
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <p className="py-10 text-center text-sm text-red-500">
            {error}
          </p>
        )}

        {/* Empty State */}
        {!loading && !error && data.length === 0 && (
          <p className="py-10 text-center text-sm text-gray-500">
            No featured destinations found.
          </p>
        )}

        {/* Carousel */}
        {!loading && data.length > 0 && (
          <div
            ref={carouselRef}
            className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {data.map((destination) => (
              <article
                key={destination._id}
                className="w-[85%] shrink-0 snap-start sm:w-[48%] lg:w-[32%]"
              >
                {/* Image */}
                <Link
                  href={`/destinations/${destination._id}`}
                  className="group relative block h-48 overflow-hidden bg-gray-100 md:h-52"
                >
                  <Image
                    src={destination.imageUrl || "/placeholder.png"}
                    alt={destination.name}
                    fill
                    sizes="(max-width: 640px) 85vw, (max-width: 1024px) 48vw, 32vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Rating */}
                  <div className="absolute right-2 top-2 flex items-center gap-1 bg-white/90 px-2 py-1 text-[10px]">
                    {destination.rating ?? 4.5}
                    <Star size={11} fill="currentColor" />
                  </div>
                </Link>

                {/* Details */}
                <div className="pt-3">
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <p className="flex items-center gap-1 text-[10px] text-gray-500">
                      <MapPin size={11} />
                      {destination.country}
                    </p>

                    <p className="shrink-0 text-sm font-medium">
                      ${destination.price}
                      <span className="text-[9px] font-normal text-gray-500">
                        /Person
                      </span>
                    </p>
                  </div>

                  <h3 className="truncate font-serif text-base">
                    {destination.name}
                  </h3>

                  <p className="mt-1 flex items-center gap-1 text-[10px] text-gray-500">
                    <CalendarDays size={11} />
                    {destination.duration}
                  </p>

                  <Link
                    href={`/destinations/${destination._id}`}
                    className="mt-3 inline-flex items-center gap-2 text-[10px] font-medium text-sky-600 underline underline-offset-2 transition hover:text-sky-800"
                  >
                    BOOK NOW
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Bottom Navigation */}
        {!loading && !error && data.length > 0 && (
          <div className="mt-5 flex items-center gap-4">
            <span className="shrink-0 text-sm text-gray-700">
              1/{data.length}
            </span>

            <div className="h-px flex-1 bg-gray-200" />

            <button
              type="button"
              onClick={() => scrollCarousel("left")}
              aria-label="Previous destinations"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-500 transition hover:border-black hover:text-black"
            >
              <ArrowLeft size={15} />
            </button>

            <button
              type="button"
              onClick={() => scrollCarousel("right")}
              aria-label="Next destinations"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-500 transition hover:border-black hover:text-black"
            >
              <ArrowRight size={15} />
            </button>
          </div>
        )}

        {/* Mobile All Destinations */}
        <Link
          href="/destinations"
          className="mt-6 inline-flex items-center gap-2 text-xs text-sky-600 sm:hidden"
        >
          All Destinations
          <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
};

export default FeaturedDestinations;
