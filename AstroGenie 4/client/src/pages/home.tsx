import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HoroscopeForm } from "@/components/horoscope-form";
import { HoroscopeResults } from "@/components/horoscope-results";
import { HoroscopeResult } from "@shared/schema";
import horoscopeImagePath from "@assets/horoscope-2015_1024x1024.webp";

export default function Home() {
  const [horoscopeResult, setHoroscopeResult] = useState<HoroscopeResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleGenerateHoroscope = (data: HoroscopeResult) => {
    setHoroscopeResult(data);
    setIsLoading(false);
  };

  const scrollToHoroscope = () => {
    document.getElementById("horoscope")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-orange-700 py-20 text-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="md:flex items-center justify-between">
            <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0">
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Discover Your Cosmic Path with AstroGenie
              </h1>
              <p className="text-lg mb-8 opacity-90">
                Uncover the secrets of your future through the ancient wisdom of astrology. 
                Get detailed predictions about your life, career, and relationships.
              </p>
              <Button 
                onClick={scrollToHoroscope}
                className="bg-white text-primary hover:bg-gray-100 font-medium px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
              >
                Get My Jathakam
              </Button>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="rounded-full shadow-xl overflow-hidden w-full max-w-md">
                <img 
                  src={horoscopeImagePath} 
                  alt="Zodiac Wheel" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Horoscope Generation Section */}
      <section id="horoscope" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-primary">Generate Your Jathakam</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Enter your birth details to discover what the stars have in store for you. 
              Get detailed predictions about your marriage, career, and life path.
            </p>
          </div>
          
          {!horoscopeResult ? (
            <HoroscopeForm 
              onSuccess={(data) => {
                setIsLoading(true);
                setTimeout(() => handleGenerateHoroscope(data), 1500);
              }}
            />
          ) : (
            <HoroscopeResults result={horoscopeResult} isLoading={isLoading} />
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
