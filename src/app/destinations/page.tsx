import Image from "next/image";
import Link from "next/link";

type Destination = {
  _id: string;
  name: string;
  country:string;
  imageUrl: string; // 👈 ১. image এর জায়গায় imageUrl দেওয়া হয়েছে
  price: number;
  rating: number;
  duration: string;
};

const AllDestinationPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destinations`, {
    cache: "no-store", // 👈 ডেটা আপডেট সাথে সাথে পাওয়ার জন্য
  });
  const data: Destination[] = await res.json();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold">
        Explore All Destinations
      </h1>

      <p className="text-sm text-gray-500 mb-6">
        Find your perfect travel experience from our curated collection
      </p>

      <p className="text-sm mb-4">
        Showing {data.length} destinations
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((destination) => (
          <div key={destination._id} className="border p-2">
            {/* 👈 ২. width, height এবং imageUrl ব্যবহার করা হয়েছে */}
            <div className="relative w-full h-28">
              <Image
                src={destination.imageUrl} 
                alt={destination.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover "
              />
            </div>

            <p className="text-xs text-gray-500 mt-2">
              {destination.country}
            </p>

            <div className="flex justify-between">
              <h2 className="text-sm font-medium">
                {destination.name}
              </h2>

              <p className="text-xs">${destination.price}</p>
            </div>

            <p className="text-xs text-gray-500 mt-1">
              ⭐ {destination.rating} · {destination.duration}
            </p>

            <Link
              href={`/destinations/${destination._id}`}
              className="text-xs text-sky-600 underline mt-2 inline-block"
            >
              BOOK NOW ↗
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllDestinationPage;