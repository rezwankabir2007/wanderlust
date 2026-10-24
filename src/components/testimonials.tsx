"use client";

import Image from "next/image"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@/components/ui/carousel"

const testimonials = [
  {
    quote:
      '"The Bali Trip Was Absolutely Magical: Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable."',
    name: "Michael Chen",
    location: "Singapore",
    photo: "/image/person2.png",
  },
  {
    quote:
      '"Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!"',
    name: "Sarah Johnson",
    location: "New York, USA",
    photo: "/image/person1.png",
  },
]

function TestimonialArrows() {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel()
  const arrowClass =
    "flex size-10 items-center justify-center rounded-full border border-gray-300 text-gray-500 transition-colors hover:border-cyan-600 hover:text-cyan-600 disabled:pointer-events-none disabled:opacity-40"

  return (
    <div className="flex shrink-0 gap-2">
      <button
        type="button"
        aria-label="Previous testimonials"
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        className={arrowClass}
      >
        <ArrowLeftIcon className="size-4" />
      </button>
      <button
        type="button"
        aria-label="Next testimonials"
        onClick={scrollNext}
        disabled={!canScrollNext}
        className={arrowClass}
      >
        <ArrowRightIcon className="size-4" />
      </button>
    </div>
  )
}

export function Testimonials() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-5xl border border-dotted border-gray-400 px-6 py-10 sm:px-10">
        <Carousel opts={{ align: "start" }}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-heading text-4xl text-gray-900">
                What Travelers Say
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Real experiences from our happy travelers
              </p>
            </div>
            <TestimonialArrows />
          </div>
          <CarouselContent className="mt-8">
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.name} className="md:basis-1/2">
                <div className="flex border border-gray-200">
                  <div className="flex w-3/5 flex-col p-6">
                    <blockquote className="text-[15px] font-semibold leading-7 text-gray-800">
                      {testimonial.quote}
                    </blockquote>
                    <div className="mt-auto pt-6">
                      <p className="text-sm font-medium text-cyan-700">
                        &mdash; {testimonial.name}
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                  <div className="relative w-2/5">
                    <Image
                      src={testimonial.photo}
                      alt={testimonial.name}
                      fill
                      sizes="(min-width: 768px) 20vw, 40vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  )
}
