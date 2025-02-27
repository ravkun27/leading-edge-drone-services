import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import ProcessSteps from "./components/ProcessSteps";
import DroneAdvantages from "./components/DroneAdvantages";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import IntroductionSection from "./components/Introduction";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
     
     <Header />
      <Hero />
      <Services />
      <ProcessSteps />
      <DroneAdvantages />
      <Portfolio />
      <IntroductionSection />
      <Contact />
      <Footer />
    </main>
  );
}
