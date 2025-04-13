import { zodiacSigns } from "@/data/zodiac-signs";
import { getZodiacDateRange } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

export function ZodiacSigns() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
      {zodiacSigns.map((sign) => (
        <Card 
          key={sign.name}
          className="bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-1 duration-300"
        >
          <CardContent className="p-4 text-center">
            <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center">
              <svg
                viewBox="0 0 100 100"
                className="w-12 h-12 text-primary"
                fill="currentColor"
                dangerouslySetInnerHTML={{ __html: sign.svgPath }}
              />
            </div>
            <h3 className="font-heading font-bold text-lg">{sign.name}</h3>
            <p className="text-sm text-gray-500">{getZodiacDateRange(sign.name)}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
