import Image from "next/image";
import Hero from "./Components/Home/Hero";
import Categories from "./Components/Home/Categories";
import Features from "./Components/Home/Features";
import Testimonials from "./Components/Home/Testimonials";
import CTA from "./Components/Home/CTA";

export default function Home() {
  return (
    <>
     <Hero/>
     <Categories/>
     <Features/>
     <Testimonials/>
     <CTA/>
    </>
  );
}
