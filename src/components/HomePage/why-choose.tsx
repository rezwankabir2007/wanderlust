import Image from "next/image"

const features = [
  {
    icon: "/image/ShieldCheck.png",
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: "/image/MapTrifold.png",
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: "/image/Headset.png",
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
]

export function WhyChoose() {
  return (
    <section className="bg-cyan-50 py-16">
      <div className="mx-auto max-w-5xl border border-dotted border-gray-400 px-6 py-12 text-center sm:px-10">
        <h2 className="font-heading text-4xl text-gray-900 sm:text-5xl">
          Why Choose Wanderlust
        </h2>
        <p className="mt-3 text-sm text-gray-500">
          Your trusted partner for exceptional travel experiences
        </p>
        <div className="mt-10 grid gap-5 text-left md:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="bg-white p-6">
              <Image
                src={feature.icon}
                alt=""
                width={48}
                height={48}
                className="size-9 w-auto"
              />
              <h3 className="mt-5 font-heading text-2xl text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
