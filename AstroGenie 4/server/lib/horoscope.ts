import { HoroscopeFormData, HoroscopeResult } from "@shared/schema";
import { getSunSign } from "@/lib/utils";
import { getBilingualPredictions } from "./translations";

// Function to generate random positions for chart symbols
const generateChartSymbols = () => {
  const symbols = [
    { label: "Su", name: "Sun" },
    { label: "Mo", name: "Moon" },
    { label: "Me", name: "Mercury" },
    { label: "Ve", name: "Venus" },
    { label: "Ma", name: "Mars" },
    { label: "Ju", name: "Jupiter" },
    { label: "Sa", name: "Saturn" },
    { label: "Ra", name: "Rahu" },
    { label: "Ke", name: "Ketu" }
  ];

  // Generate positions within the chart
  return symbols.map(symbol => {
    // Random position based on angle and distance from center
    const angle = Math.random() * Math.PI * 2;
    const distance = 50 + Math.random() * 60; // Distance from center (50-110)
    
    return {
      label: symbol.label,
      x: 150 + Math.cos(angle) * distance, // Center x is 150
      y: 150 + Math.sin(angle) * distance, // Center y is 150
    };
  });
};

// Generate moon sign based on birth date and time
const getMoonSign = (dateStr: string, timeStr: string): string => {
  const date = new Date(`${dateStr}T${timeStr}`);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  
  // This is a simplified algorithm - a real implementation would use actual astronomical calculations
  const offset = (date.getHours() + (date.getMinutes() / 60)) / 24;
  const value = ((month + day / 31) + offset) % 12;
  
  const moonSigns = [
    "Aries", "Taurus", "Gemini", "Cancer", 
    "Leo", "Virgo", "Libra", "Scorpio", 
    "Sagittarius", "Capricorn", "Aquarius", "Pisces"
  ];
  
  return moonSigns[Math.floor(value)];
};

// Generate rising sign based on birth time
const getRisingSign = (timeStr: string): string => {
  const [hours, minutes] = timeStr.split(":").map(Number);
  const totalMinutes = hours * 60 + minutes;
  
  // Each sign rises for approximately 2 hours
  const index = Math.floor((totalMinutes % (24 * 60)) / 120);
  
  const risingSigns = [
    "Aries", "Taurus", "Gemini", "Cancer", 
    "Leo", "Virgo", "Libra", "Scorpio", 
    "Sagittarius", "Capricorn", "Aquarius", "Pisces"
  ];
  
  return risingSigns[index];
};

export async function generateHoroscope(formData: HoroscopeFormData): Promise<HoroscopeResult> {
  // Parse the form data
  const birthDate = new Date(formData.birthDate);
  const month = birthDate.getMonth() + 1; // getMonth() returns 0-11
  const day = birthDate.getDate();
  
  // Calculate astrological signs
  const sunSign = getSunSign(month, day);
  const moonSign = getMoonSign(formData.birthDate, formData.birthTime);
  const risingSign = getRisingSign(formData.birthTime);
  
  // Get bilingual predictions based on the signs
  const predictions = getBilingualPredictions(sunSign, moonSign, risingSign);
  
  // Generate chart symbols for visualization
  const chartSymbols = generateChartSymbols();
  
  // Create and return the horoscope result
  return {
    fullName: formData.fullName,
    birthDetails: {
      date: formData.birthDate,
      time: formData.birthTime,
      place: formData.birthPlace
    },
    signs: {
      sunSign,
      moonSign,
      risingSign
    },
    predictions: predictions.predictions,
    keyPeriods: predictions.keyPeriods,
    chartSymbols,
    createdAt: new Date().toISOString()
  };
}
