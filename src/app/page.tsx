import { Banner } from "@/components/HomePage/banner";
import { Cta } from "@/components/HomePage/cta";


import { Testimonials } from "@/components/HomePage/testimonials";
import { WhyChoose } from "@/components/HomePage/why-choose";
import FeaturedDestinations from "@/hooks/featured";

export default function Home() {
  return (
    <>
      
      <Banner />
     <FeaturedDestinations/>
      <WhyChoose />
      <Testimonials />
      <Cta />
      
    </>
  );
}
