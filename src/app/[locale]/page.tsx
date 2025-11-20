import { Hero } from "@/components/hero";
import { TrustedBy } from "@/components/trusted-by";
import { ServicesGrid } from "@/components/home/services-grid";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <ServicesGrid />
      <About />
    </>
  );
}
