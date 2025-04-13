import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const getSunSign = (month: number, day: number): string => {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius";
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn";
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius";
  return "Pisces";
};

export const getZodiacDateRange = (zodiacSign: string): string => {
  switch (zodiacSign) {
    case "Aries": return "Mar 21 - Apr 19";
    case "Taurus": return "Apr 20 - May 20";
    case "Gemini": return "May 21 - Jun 20";
    case "Cancer": return "Jun 21 - Jul 22";
    case "Leo": return "Jul 23 - Aug 22";
    case "Virgo": return "Aug 23 - Sep 22";
    case "Libra": return "Sep 23 - Oct 22";
    case "Scorpio": return "Oct 23 - Nov 21";
    case "Sagittarius": return "Nov 22 - Dec 21";
    case "Capricorn": return "Dec 22 - Jan 19";
    case "Aquarius": return "Jan 20 - Feb 18";
    case "Pisces": return "Feb 19 - Mar 20";
    default: return "";
  }
};
