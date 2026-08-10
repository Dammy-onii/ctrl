import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { Why } from "./components/Why";
import { Ladder } from "./components/Ladder";
import { Simulations } from "./components/Simulations";
import { WhoItsFor } from "./components/WhoItsFor";
import { Waitlist } from "./components/Waitlist";
import { Faq } from "./components/Faq";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <Why />
        <Ladder />
        <Simulations />
        <WhoItsFor />
        <Waitlist />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
