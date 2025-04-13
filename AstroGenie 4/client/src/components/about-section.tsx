import { Card, CardContent } from "@/components/ui/card";
import { History, Laptop, Languages } from "lucide-react";

export function AboutSection() {
  return (
    <div>
      <div className="md:flex items-center justify-between">
        <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-primary">About AstroGenie</h2>
          <p className="text-gray-800 mb-4">
            AstroGenie combines ancient astrological wisdom with modern technology to provide accurate and insightful predictions about your life path.
          </p>
          <p className="text-gray-800 mb-4">
            Our system analyzes planetary positions at your birth time to generate a comprehensive jathakam that provides guidance about various aspects of your life.
          </p>
          <p className="text-gray-800">
            We embrace both traditional Vedic astrology principles and contemporary interpretative techniques to give you the most accurate readings possible.
          </p>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className="relative w-full h-[350px] rounded-lg shadow-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-primary/10"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2/3 h-2/3 relative">
                <div className="absolute inset-0 bg-black/25 backdrop-blur-sm rounded-full"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
                    <svg viewBox="0 0 200 200" width="60" height="60" className="text-white">
                      <path
                        d="M100,15 A85,85 0 1,1 99,15"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="2" />
                      <circle cx="100" cy="60" r="5" fill="currentColor" />
                      <circle cx="140" cy="100" r="5" fill="currentColor" />
                      <circle cx="100" cy="140" r="5" fill="currentColor" />
                      <circle cx="60" cy="100" r="5" fill="currentColor" />
                      <line x1="100" y1="15" x2="100" y2="30" stroke="currentColor" strokeWidth="2" />
                      <line x1="185" y1="100" x2="170" y2="100" stroke="currentColor" strokeWidth="2" />
                      <line x1="100" y1="185" x2="100" y2="170" stroke="currentColor" strokeWidth="2" />
                      <line x1="15" y1="100" x2="30" y2="100" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1013&q=80')] bg-cover bg-center opacity-30"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
        <Card className="bg-white p-6 rounded-xl shadow-md">
          <CardContent className="p-0">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <History className="text-primary text-xl" />
            </div>
            <h3 className="font-heading text-xl font-bold mb-2">Ancient Wisdom</h3>
            <p className="text-gray-500">Based on traditional Vedic astrology principles that have been refined over thousands of years.</p>
          </CardContent>
        </Card>

        <Card className="bg-white p-6 rounded-xl shadow-md">
          <CardContent className="p-0">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <Laptop className="text-primary text-xl" />
            </div>
            <h3 className="font-heading text-xl font-bold mb-2">Modern Technology</h3>
            <p className="text-gray-500">Advanced algorithms and celestial calculations provide precise and personalized predictions.</p>
          </CardContent>
        </Card>

        <Card className="bg-white p-6 rounded-xl shadow-md">
          <CardContent className="p-0">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <Languages className="text-primary text-xl" />
            </div>
            <h3 className="font-heading text-xl font-bold mb-2">Bilingual Support</h3>
            <p className="text-gray-500">Access your jathakam in both Telugu and English, making astrological insights accessible to everyone.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
