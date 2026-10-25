import { Banner } from "@/components/HomePage/banner";
import { Cta } from "@/components/HomePage/cta";


import { Testimonials } from "@/components/HomePage/testimonials";
import { WhyChoose } from "@/components/HomePage/why-choose";

export default function Home() {
  return (
    <>
      
      <Banner />
      <WhyChoose />
      <Testimonials />
      <Cta />
      
    </>
  );
}
