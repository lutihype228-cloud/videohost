import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import ScrollToTop from "@/components/ScrollToTop";
import AnimatedPage from "@/components/AnimatedPage";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0e1520]">
      <Header />
      <main className="flex-1">
        <AnimatedPage>
          <Hero />
        </AnimatedPage>
      </main>
      <Footer />
      <CookieBanner />
      <ScrollToTop />
    </div>
  );
}
