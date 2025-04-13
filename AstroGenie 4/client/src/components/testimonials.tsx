import { Card, CardContent } from "@/components/ui/card";
import { Star, StarHalf } from "lucide-react";

const testimonials = [
  {
    name: "Priya S.",
    location: "Hyderabad",
    rating: 5,
    text: "The marriage predictions were so accurate! AstroGenie helped me understand the timing and compatibility factors that would affect my relationships."
  },
  {
    name: "Raj K.",
    location: "Bangalore",
    rating: 4.5,
    text: "The career predictions gave me confidence to make a job change that I was hesitating about. Six months later, it turned out exactly as predicted!"
  },
  {
    name: "Anand M.",
    location: "Vizag",
    rating: 5,
    text: "I love how I can get my jathakam in both Telugu and English. The predictions about my health helped me take preventative measures at the right time."
  }
];

export function Testimonials() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {testimonials.map((testimonial, index) => (
        <Card
          key={index}
          className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl border border-white border-opacity-20"
        >
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <div className="text-yellow-300 flex mr-1">
                {Array.from({ length: Math.floor(testimonial.rating) }).map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
                {testimonial.rating % 1 !== 0 && (
                  <StarHalf size={16} fill="currentColor" />
                )}
              </div>
              <span className="text-sm opacity-90 ml-2">{testimonial.rating.toFixed(1)}</span>
            </div>
            <p className="italic mb-4 text-white">{testimonial.text}</p>
            <div className="flex items-center">
              <span className="font-medium text-white">{testimonial.name}</span>
              <span className="mx-2 opacity-60 text-white">•</span>
              <span className="text-sm opacity-80 text-white">{testimonial.location}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
